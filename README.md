# Karthickraja K — Portfolio

Full-stack portfolio: React (Vite) frontend + Express/MongoDB backend with a working contact form
that stores every message in MongoDB and emails it to the owner's inbox.

```
KARTHIPORTFOLIO/
├── Frontend/   # React 19 + Vite  (UI)
└── Backend/    # Express + Mongoose + Nodemailer  (API)   -> see Backend/README.md
```

## Contact form data flow

```
 React Contact.jsx
        │  1. data from frontend  (POST /api/contact  { name, email, message })
        ▼
 services/contact.service.js  ->  httpClient.js  ->  Vite proxy  ->  Express
        │
        │  validateContact middleware  (sanitise + validate, 422 on bad input)
        ▼
 contact.controller.js
        ├── 2. db logic  : contact.service.js  -> MongoDB "contacts" collection
        └──    mail      : mail.service.js     -> your inbox + visitor auto-reply
        │
        ▼  3. data back to frontend
 { success, message, data, errors }  ->  success / error alert in the form
```

## Run it locally

**1. Backend**

```bash
cd Backend
npm install
cp .env.example .env    # fill MONGO_URI, SMTP_USER, SMTP_PASS, MAIL_TO, ADMIN_API_KEY
npm run dev             # http://localhost:5000
```

**2. Frontend** (new terminal)

```bash
cd Frontend
npm install
npm run dev             # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`, so there is nothing else to configure
while developing. For production set `VITE_API_BASE_URL` in `Frontend/.env` to your deployed API URL.

## Mock data / offline mode

**Backend** — seed MongoDB with 10 realistic messages:

```bash
cd Backend && npm run seed          # --fresh to wipe first, --clear to remove them
```

**Frontend** — run the form with no backend at all (`Frontend/.env`):

```
VITE_USE_MOCK_API=true
```

The mock replies with the same `{ success, message, data, errors }` envelope and
repeats the server's validation rules, so loading, success, field-error and
network-error states can all be demoed offline. Submitting the message `fail`
triggers the error alert on purpose.

## Frontend structure (new files)

```
Frontend/src/
├── config/api.config.js       # API base URL + endpoint paths
├── services/
│   ├── httpClient.js          # fetch wrapper: JSON, timeout, uniform result
│   └── contact.service.js     # submitContactForm(), checkApiHealth()
├── mocks/contact.mock.js      # offline mock API (VITE_USE_MOCK_API=true)
└── components/Contact.jsx     # form state, loading, field errors, feedback alert
```

Full API documentation: [`Backend/README.md`](Backend/README.md).
