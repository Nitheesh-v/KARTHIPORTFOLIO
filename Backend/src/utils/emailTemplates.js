/**
 * emailTemplates.js
 * ------------------------------------------------------------------
 * HTML + plain-text bodies for the mails we send.
 * Kept separate so the mail service stays readable.
 * ------------------------------------------------------------------
 */

/** Escape user input so a message can never inject HTML into the mail. */
function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Mail that YOU receive whenever somebody submits the form.
 * @param {{name:string,email:string,message:string,createdAt?:Date}} contact
 */
function buildOwnerNotification(contact) {
  const name = escapeHtml(contact.name);
  const email = escapeHtml(contact.email);
  const message = escapeHtml(contact.message).replace(/\n/g, "<br/>");
  const date = new Date(contact.createdAt || Date.now()).toLocaleString(
    "en-IN",
    { timeZone: "Asia/Kolkata" }
  );

  const html = `
  <div style="font-family:Segoe UI,Roboto,Arial,sans-serif;background:#f5f6fa;padding:24px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;
                box-shadow:0 4px 18px rgba(0,0,0,.07)">
      <div style="background:#695aa6;color:#fff;padding:20px 28px">
        <h2 style="margin:0;font-size:18px">New Portfolio Contact Message</h2>
        <p style="margin:4px 0 0;font-size:12px;opacity:.85">${date}</p>
      </div>
      <div style="padding:24px 28px;color:#333;font-size:14px;line-height:1.6">
        <p style="margin:0 0 6px"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 6px"><strong>Email:</strong>
          <a href="mailto:${email}" style="color:#695aa6">${email}</a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>
        <p style="margin:0 0 8px"><strong>Message</strong></p>
        <div style="background:#faf9ff;border-left:3px solid #695aa6;padding:12px 14px;border-radius:4px">
          ${message}
        </div>
        <p style="margin:22px 0 0">
          <a href="mailto:${email}?subject=Re:%20Your%20message"
             style="display:inline-block;background:#695aa6;color:#fff;text-decoration:none;
                    padding:10px 18px;border-radius:6px;font-size:13px">Reply to ${name}</a>
        </p>
      </div>
      <div style="background:#fafafa;padding:14px 28px;font-size:11px;color:#999">
        Sent automatically from your portfolio contact form.
      </div>
    </div>
  </div>`;

  const text =
    `New portfolio contact message (${date})\n\n` +
    `Name: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}\n`;

  return { subject: `Portfolio Contact - ${contact.name}`, html, text };
}

/**
 * Optional auto-reply sent to the visitor so they know it arrived.
 * @param {{name:string,message:string}} contact
 */
function buildVisitorAutoReply(contact) {
  const name = escapeHtml(contact.name);
  const message = escapeHtml(contact.message).replace(/\n/g, "<br/>");

  const html = `
  <div style="font-family:Segoe UI,Roboto,Arial,sans-serif;background:#f5f6fa;padding:24px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:28px;
                box-shadow:0 4px 18px rgba(0,0,0,.07);color:#333;font-size:14px;line-height:1.6">
      <h2 style="margin:0 0 12px;color:#695aa6;font-size:18px">Thanks for reaching out, ${name}!</h2>
      <p style="margin:0 0 12px">
        I received your message and will get back to you as soon as possible.
      </p>
      <div style="background:#faf9ff;border-left:3px solid #695aa6;padding:12px 14px;border-radius:4px">
        ${message}
      </div>
      <p style="margin:20px 0 0">Best regards,<br/><strong>Karthickraja K</strong></p>
    </div>
  </div>`;

  const text =
    `Hi ${contact.name},\n\nThanks for reaching out! I received your message ` +
    `and will get back to you soon.\n\nYour message:\n${contact.message}\n\n` +
    `Best regards,\nKarthickraja K`;

  return { subject: "Thanks for contacting me!", html, text };
}

module.exports = { buildOwnerNotification, buildVisitorAutoReply, escapeHtml };
