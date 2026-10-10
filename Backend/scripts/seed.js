/**
 * scripts/seed.js
 * ------------------------------------------------------------------
 * Fills the MongoDB "contacts" collection with realistic mock data so
 * you can develop / demo the admin endpoints without waiting for real
 * visitors to submit the form.
 *
 *   npm run seed           insert the mock messages (skips duplicates)
 *   npm run seed -- --fresh   DELETE every contact first, then insert
 *   npm run seed -- --clear   only delete the mock messages
 *
 * Mock emails all use the @example.com domain, which is reserved by
 * RFC 2606 - so nothing can ever be sent to a real person, and the
 * --clear flag can safely identify "mock" rows.
 * ------------------------------------------------------------------
 */

const mockContacts = require("../src/data/mock-contacts.json");
const Contact = require("../src/models/contactModel");
const logger = require("../src/utils/logger");
const { connectDB, disconnectDB } = require("../src/config/database");

const FRESH = process.argv.includes("--fresh");
const CLEAR_ONLY = process.argv.includes("--clear");

// Every mock row is recognisable by its email domain
const MOCK_FILTER = { email: /@example\.com$/i };

/**
 * Turn a mock entry into a real document.
 * `daysAgo` becomes a proper createdAt date so the list looks natural.
 */
function toDocument(mock) {
  const createdAt = new Date(Date.now() - mock.daysAgo * 24 * 60 * 60 * 1000);

  return {
    name: mock.name,
    email: mock.email,
    message: mock.message,
    status: mock.status,
    emailSent: mock.emailSent,
    ipAddress: "127.0.0.1",
    userAgent: "seed-script/1.0 (mock data)",
    createdAt,
    updatedAt: createdAt,
  };
}

(async () => {
  let exitCode = 0;

  try {
    await connectDB();

    // --- delete modes -------------------------------------------
    if (CLEAR_ONLY) {
      const { deletedCount } = await Contact.deleteMany(MOCK_FILTER);
      logger.success(`Removed ${deletedCount} mock contact(s)`);
      return;
    }

    if (FRESH) {
      const { deletedCount } = await Contact.deleteMany({});
      logger.warn(`--fresh: deleted ALL ${deletedCount} contact(s)`);
    }

    // --- insert --------------------------------------------------
    let inserted = 0;
    let skipped = 0;

    for (const mock of mockContacts) {
      // Don't duplicate a mock row that is already there
      const exists = await Contact.exists({
        email: mock.email,
        name: mock.name,
      });

      if (exists) {
        skipped += 1;
        continue;
      }

      // timestamps:true would overwrite createdAt, so bypass it
      await Contact.collection.insertOne(toDocument(mock));
      inserted += 1;
    }

    const total = await Contact.countDocuments();
    logger.success(
      `Seed done -> inserted ${inserted}, skipped ${skipped} (already present)`
    );
    logger.info(`"contacts" collection now holds ${total} document(s)`);
    logger.info(
      "View them: npm run dev, then " +
        'curl -H "x-admin-key: YOUR_KEY" http://localhost:5000/api/contact'
    );
  } catch (error) {
    logger.error("Seed failed:", error.message);
    exitCode = 1;
  } finally {
    await disconnectDB().catch(() => {});
    process.exit(exitCode);
  }
})();
