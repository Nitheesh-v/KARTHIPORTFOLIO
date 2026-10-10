/**
 * contact.controller.js
 * ------------------------------------------------------------------
 * The glue layer. For every request it:
 *   STEP 1 - takes the validated data coming FROM THE FRONTEND
 *   STEP 2 - calls the DB service (MongoDB) and the mail service
 *   STEP 3 - returns a normalised JSON response TO THE FRONTEND
 * No Mongoose / Nodemailer code lives here on purpose.
 * ------------------------------------------------------------------
 */

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const { sendSuccess } = require("../utils/apiResponse");
const contactService = require("../services/contact.service");
const mailService = require("../services/mail.service");

/**
 * @route   POST /api/contact
 * @desc    Store a contact-form submission and email it to the owner
 * @access  Public (rate limited)
 */
const submitContact = asyncHandler(async (req, res) => {
  // ---------------------------------------------------------------
  // STEP 1 : DATA FROM FRONTEND
  // `req.validated` was produced by validateContact middleware, so the
  // name / email / message here are already trimmed and checked.
  // ---------------------------------------------------------------
  const { name, email, message } = req.validated;

  // ---------------------------------------------------------------
  // STEP 2a : DB LOGIC - persist the message first.
  // Saving before mailing guarantees we never lose a submission even
  // if the SMTP server is down.
  // ---------------------------------------------------------------
  const saved = await contactService.createContact({
    name,
    email,
    message,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
  });

  logger.info(`Contact stored in MongoDB (_id: ${saved._id})`);

  // ---------------------------------------------------------------
  // STEP 2b : send the notification email to the portfolio owner.
  // ---------------------------------------------------------------
  let emailSent = false;
  try {
    await mailService.sendOwnerNotification({
      name: saved.name,
      email: saved.email,
      message: saved.message,
      createdAt: saved.createdAt,
    });
    emailSent = true;

    // Remember in the DB that the notification went out
    await contactService.markEmailSent(saved._id);

    // Fire-and-forget acknowledgement for the visitor
    mailService.sendVisitorAutoReply({
      name: saved.name,
      email: saved.email,
      message: saved.message,
    });
  } catch (error) {
    // Mail failed but the data IS stored -> don't fail the user request
    logger.error("Notification email failed:", error.message);
  }

  // ---------------------------------------------------------------
  // STEP 3 : DATA BACK TO FRONTEND
  // ---------------------------------------------------------------
  return sendSuccess(
    res,
    201,
    emailSent
      ? "Thank you! Your message has been sent successfully."
      : "Thank you! Your message was received, I will get back to you soon.",
    {
      id: saved._id,
      name: saved.name,
      email: saved.email,
      createdAt: saved.createdAt,
      emailSent,
    }
  );
});

/**
 * @route   GET /api/contact?page=1&limit=20&status=new
 * @desc    List stored messages (simple admin / debugging helper)
 * @access  Protected by the x-admin-key header (see admin route guard)
 */
const getContacts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  // STEP 2 : DB LOGIC
  const result = await contactService.listContacts({
    page: Number(page),
    limit: Math.min(Number(limit) || 20, 100), // hard cap to protect the DB
    status,
  });

  // STEP 3 : DATA TO FRONTEND
  return sendSuccess(res, 200, "Contacts fetched successfully", result);
});

/**
 * @route   GET /api/contact/:id
 * @desc    Fetch a single message
 * @access  Protected by the x-admin-key header
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  if (!contact) throw ApiError.notFound("Contact message not found");

  return sendSuccess(res, 200, "Contact fetched successfully", contact);
});

module.exports = { submitContact, getContacts, getContact };
