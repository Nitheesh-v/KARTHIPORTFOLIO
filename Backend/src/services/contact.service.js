/**
 * contact.service.js
 * ------------------------------------------------------------------
 * STEP 2 (db logic) - ALL database access for contacts lives here.
 * Controllers never call Mongoose directly; they call this service.
 * ------------------------------------------------------------------
 */

const Contact = require("../models/contact.model");

/**
 * Insert a new contact message.
 * @param {{name:string,email:string,message:string,ipAddress?:string,userAgent?:string}} payload
 * @returns {Promise<import("mongoose").Document>} the saved document
 */
async function createContact(payload) {
  const contact = new Contact({
    name: payload.name,
    email: payload.email,
    message: payload.message,
    ipAddress: payload.ipAddress || null,
    userAgent: payload.userAgent || null,
  });

  return contact.save(); // runs schema validators, then INSERTs
}

/**
 * Flag a stored message as "notification email delivered".
 * Called after Nodemailer succeeds.
 * @param {string} id Mongo _id
 */
async function markEmailSent(id) {
  return Contact.findByIdAndUpdate(id, { emailSent: true }, { new: true });
}

/**
 * Paginated listing - handy for an admin page / checking data quickly.
 * @param {{page?:number, limit?:number, status?:string}} options
 */
async function listContacts({ page = 1, limit = 20, status } = {}) {
  const filter = status ? { status } : {};
  const skip = (Math.max(page, 1) - 1) * limit;

  // Run query + count in parallel for speed
  const [items, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

/**
 * Fetch one message by id.
 * @param {string} id
 */
async function getContactById(id) {
  return Contact.findById(id).lean();
}

module.exports = {
  createContact,
  markEmailSent,
  listContacts,
  getContactById,
};
