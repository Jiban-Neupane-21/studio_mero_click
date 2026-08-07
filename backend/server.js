import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import sendBookingEmailHandler from "./api/send-booking-email.js";
import sendClaimEmailHandler from "./api/send-claim-email.js";
import sendContactEmailHandler from "./api/send-contact-email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env.local for dev, or standard env for production)
dotenv.config({ path: path.join(__dirname, "../.env.local") });
dotenv.config({ path: path.join(__dirname, "../.env") });

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
const distPath = process.env.NODE_ENV === "production" 
  ? path.join(__dirname, "dist") // In production (cPanel), dist is side-by-side with server.js
  : path.join(__dirname, "../frontend/dist"); // In local dev, dist is in frontend/dist

app.use(express.static(distPath));

// --- 4. SPA FALLBACK ROUTE ---
// Send index.html for any request that doesn't match an API route above
// NEW (Express v5 compatible syntax)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 3001);

// Listen on all network interfaces (no IP string parameter) so cPanel/Passenger works smoothly
app.listen(PORT, () => {
  console.log(`Server successfully listening on port ${PORT}`);
});
