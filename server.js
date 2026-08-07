import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import sendBookingEmailHandler from "./api/send-booking-email.js";
import sendClaimEmailHandler from "./api/send-claim-email.js";
import sendContactEmailHandler from "./api/send-contact-email.js";

// Load environment variables (.env.local for dev, or standard env for production)
dotenv.config({ path: "./.env.local" });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== SERVER INITIALIZING ===");
console.log("NODE_ENV =", process.env.NODE_ENV || "production");
console.log("PORT =", process.env.PORT);

const app = express();

// Body parser middleware
app.use(express.json());

// --- 1. HEALTH & UTILITY ENDPOINTS ---
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// --- 2. RESEND EMAIL API ENDPOINTS ---
app.post("/api/send-booking-email", sendBookingEmailHandler);
app.post("/api/send-claim-email", sendClaimEmailHandler);
app.post("/api/send-contact-email", sendContactEmailHandler);

// --- 3. SERVE REACT FRONTEND (STATIC ASSETS) ---
// Serve built assets from dist directory
app.use(express.static(path.join(__dirname, "dist")));

// --- 4. SPA FALLBACK ROUTE ---
// Send index.html for any request that doesn't match an API route above
// NEW (Express v5 compatible syntax)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 3000;

// Listen on all network interfaces (no IP string parameter) so cPanel/Passenger works smoothly
app.listen(PORT, () => {
  console.log(`Server successfully listening on port ${PORT}`);
});
