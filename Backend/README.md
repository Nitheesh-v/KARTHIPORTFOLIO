# Portfolio Backend (Express + MongoDB + Nodemailer)

REST API for the portfolio contact form.
Flow: **1. data from frontend → 2. DB logic (MongoDB) → 3. data back to frontend** (plus an email to your inbox).

---

## Folder structure

```
Backend/                              # classic MERN backend, plain .js files
├── server.js                 # entry point: env check → DB → SMTP → listen → graceful shutdown
├── app.js                    # express app: security, CORS, parsers, routes, error handler
├── .env                      # YOUR secrets (git-ignored)
├── .env.example              # template, copy it to .env
├── config/
│   ├── env.js                # loads .env once, exports typed config
│   ├── database.js           # MongoDB (mongoose) connect / disconnect
│   └── mailer.js             # Nodemailer SMTP transporter (cached + verify)
├── models/
│   └── contact.model.js      # STEP 2: Mongoose schema for "contacts"
├── validators/
│   └── contact.validator.js  # STEP 1: sanitise + validate the payload
├── middleware/
│   ├── validateContact.middleware.js  # runs the validator → 422 on bad input
│   ├── rateLimiter.middleware.js      # 5 submissions / 15 min / IP
│   ├── adminAuth.middleware.js        # x-admin-key guard for read routes
│   ├── notFound.middleware.js         # unmatched route → 404
│   └── error.middleware.js            # single place errors become JSON
├── controllers/
│   └── contact.controller.js # glue: validated data → services → response
├── services/
│   ├── contact.service.js    # STEP 2: all MongoDB queries live here
│   └── mail.service.js       # owner notification + visitor auto-reply
├── routes/
│   ├── index.js              # mounts every router under /api
│   ├── contact.routes.js     # /api/contact
│   └── health.routes.js      # /api/health
├── data/
│   └── mock-contacts.json    # seed fixtures (npm run seed)
├── scripts/
│   ├── checkSetup.js         # npm run check  - env + DB + SMTP diagnostic
│   └── seed.js               # npm run seed   - insert mock contacts
└── utils/
    ├── apiResponse.js        # one JSON envelope for every response
    ├── ApiError.js           # error with an HTTP status code
    ├── asyncHandler.js       # async controllers without try/catch
    ├── emailTemplates.js     # HTML / text mail bodies
    └── logger.js             # timestamped console logger
```

**Layer rule:** `route → middleware → controller → service → model`.
A controller never touches Mongoose or Nodemailer directly; a service never touches `req`/`res`.

---

## Setup

```bash
cd Backend
npm install
cp .env.example .env     # then fill in the values
npm run dev              # nodemon on http://localhost:5000
```

### .env values

| Key | What to put |
|---|---|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster0.xxxx.mongodb.net` (Atlas) or `mongodb://127.0.0.1:27017` |
| `DB_NAME` | `portfolio` |
| `SMTP_USER` | the Gmail address that sends the mail |
| `SMTP_PASS` | Gmail **App Password** (16 chars, from <https://myaccount.google.com/apppasswords>) — not your login password |
| `MAIL_TO` | the inbox that should receive the messages |
| `CLIENT_ORIGINS` | comma separated frontend URLs allowed by CORS |
| `ADMIN_API_KEY` | any long random string, needed to read stored messages |

Gmail requires 2-Step Verification to be ON before App Passwords can be created.

### Verify the setup (before trusting the form)

```bash
npm run check            # .env + MongoDB read/write + SMTP login
npm run check -- --send  # same, and delivers a REAL test email to MAIL_TO
```

Typical results:

| Output | Meaning |
|---|---|
| `.env -> SMTP_USER is still the example placeholder` | you have not filled `.env` yet |
| `SMTP verification failed: Invalid login` | wrong App Password, or 2-Step Verification is off |
| `querySrv ENOTFOUND` / `ETIMEDOUT` on connect | bad `MONGO_URI`, or your IP is not whitelisted in Atlas (Network Access → add your IP or `0.0.0.0/0`) |
| `All checks passed` | the contact form will store the message **and** email you |

---

## Mock data (seed the database)

Ten realistic contact messages live in `data/mock-contacts.json`
(job offers, student questions, feedback, spread over the last 45 days with
mixed `status` and `emailSent` values).

```bash
npm run seed             # insert them (skips rows already present)
npm run seed -- --fresh  # delete ALL contacts first, then insert
npm run seed -- --clear  # remove only the mock rows
```

Every mock address uses the reserved `@example.com` domain, so no mail can
ever reach a real person and `--clear` can always tell mock rows apart from
genuine submissions. The `daysAgo` field is converted into a real `createdAt`
date, so the list looks natural when paginated.

---

## API

Every response uses the same envelope:

```json
{ "success": true, "message": "...", "data": {...}, "errors": null }
```

### `POST /api/contact` — public (rate limited: 5 / 15 min / IP)

Request
```json
{ "name": "John Doe", "email": "john@example.com", "message": "Hi Karthick!" }
```

`201` response
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully.",
  "data": { "id": "66f1...", "name": "John Doe", "email": "john@example.com",
            "createdAt": "2026-10-09T09:00:00.000Z", "emailSent": true },
  "errors": null
}
```

`422` response (validation)
```json
{
  "success": false,
  "message": "Please correct the highlighted fields",
  "data": null,
  "errors": { "email": "Please enter a valid email address" }
}
```

Other codes: `429` too many requests, `500` server error.
The message is **saved to MongoDB first**, so a failing SMTP server never loses a submission (`emailSent: false` marks those).

### `GET /api/health` — public
Returns uptime and the MongoDB connection state.

### `GET /api/contact?page=1&limit=20&status=new` — admin
Header: `x-admin-key: <ADMIN_API_KEY>`. Paginated list of stored messages.

### `GET /api/contact/:id` — admin
Single message.

```bash
curl -H "x-admin-key: YOUR_KEY" http://localhost:5000/api/contact
```

---

## Where the data lives

Database `portfolio`, collection `contacts`:

| field | type | note |
|---|---|---|
| `name`, `email`, `message` | String | validated + trimmed |
| `ipAddress`, `userAgent` | String | spam forensics |
| `emailSent` | Boolean | was the notification delivered |
| `status` | enum `new / read / replied / archived` | your workflow |
| `createdAt`, `updatedAt` | Date | automatic |

You can browse it with MongoDB Compass or Atlas → Browse Collections.
