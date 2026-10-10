/**
 * mailService.js
 * ------------------------------------------------------------------
 * Sends the emails triggered by the contact form:
 *   1. notification -> YOUR inbox (MAIL_TO)
 *   2. auto-reply   -> the visitor (optional, failure is ignored)
 * ------------------------------------------------------------------
 */

const env = require("../config/env");
const { getTransporter } = require("../config/mailer");
const logger = require("../utils/logger");
const {
  buildOwnerNotification,
  buildVisitorAutoReply,
} = require("../utils/emailTemplates");

/**
 * Send the "you got a new message" mail to the portfolio owner.
 * @param {{name:string,email:string,message:string,createdAt?:Date}} contact
 * @returns {Promise<boolean>} true when the SMTP server accepted the mail
 */
async function sendOwnerNotification(contact) {
  const { subject, html, text } = buildOwnerNotification(contact);

  const info = await getTransporter().sendMail({
    from: `"${env.MAIL_FROM_NAME}" <${env.SMTP_USER}>`, // must match the SMTP user
    to: env.MAIL_TO,                                    // your inbox
    replyTo: `"${contact.name}" <${contact.email}>`,    // hitting "Reply" answers the visitor
    subject,
    text,
    html,
  });

  logger.success(`Notification mail sent -> ${env.MAIL_TO} (${info.messageId})`);
  return true;
}

/**
 * Send a friendly acknowledgement to the visitor.
 * Never throws: a failed auto-reply must not fail the request.
 * @param {{name:string,email:string,message:string}} contact
 */
async function sendVisitorAutoReply(contact) {
  try {
    const { subject, html, text } = buildVisitorAutoReply(contact);

    await getTransporter().sendMail({
      from: `"Karthickraja K" <${env.SMTP_USER}>`,
      to: contact.email,
      subject,
      text,
      html,
    });

    logger.info(`Auto-reply sent -> ${contact.email}`);
    return true;
  } catch (error) {
    logger.warn("Auto-reply could not be sent:", error.message);
    return false;
  }
}

module.exports = { sendOwnerNotification, sendVisitorAutoReply };
