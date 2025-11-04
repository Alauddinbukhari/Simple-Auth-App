
// MongoDB connection helper
import mongoose from "mongoose";

// Prefer a descriptive env var name but fall back to the project's existing `URL`
const uri = process.env.MONGODB_URI;

// Optional: control strictQuery to silence deprecation warnings in some mongoose versions.
// Adjust to your app's requirements.
mongoose.set("strictQuery", false);

/**
 * Connect to MongoDB.
 * Exported as a function so calling code controls when the connection is established
 * (for example, from `server.js` after config/env are loaded).
 *
 * Throws an error if the connection string is not present or the connection fails.
 */
export async function connectDB() {
  if (!uri) {
    throw new Error(
      "Missing MongoDB connection string. Set MONGODB_URI (or URL) environment variable."
    );
  }

  try {
    // Mongoose v6+ uses sensible defaults; no need for useNewUrlParser/useUnifiedTopology options.
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// Export mongoose in case other modules need it (models, etc.)
export default mongoose;