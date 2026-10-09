/**
 * contact.model.js
 * ------------------------------------------------------------------
 * STEP 2 (db logic) - the MongoDB schema for one contact-form entry.
 * Collection: "contacts"
 * ------------------------------------------------------------------
 */

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // Visitor's name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },

    // Visitor's email (stored lowercase so duplicates are comparable)
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [120, "Email must be at most 120 characters"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },

    // The actual message
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters"],
      maxlength: [2000, "Message must be at most 2000 characters"],
    },

    // --- Meta information (useful to spot spam) ---
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },

    // Did the notification email go out successfully?
    emailSent: { type: Boolean, default: false },

    // Simple workflow flag so you can track what you already answered
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
    versionKey: false,
  }
);

// Newest messages first - speeds up the admin listing query
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Contact", contactSchema);
