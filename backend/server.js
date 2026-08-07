import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import sendBookingEmailHandler from "./api/send-booking-email.js";
import sendContactEmailHandler from "./api/send-contact-email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("=== SERVER INITIALIZING ===");
console.log("NODE_ENV =", process.env.NODE_ENV || "production");
console.log("PORT =", process.env.PORT);

const app = express();

app.use(express.json());

// --- 1. HEALTH & UTILITY ENDPOINTS ---
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// --- 2. RESEND EMAIL API ENDPOINTS ---
app.post("/api/send-booking-email", sendBookingEmailHandler);
app.post("/api/send-contact-email", sendContactEmailHandler);

// --- 3. SERVE REACT FRONTEND (STATIC ASSETS) ---
const distPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "dist")
    : path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

// --- 4. SPA FALLBACK ROUTE ---
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// --- 5. START SERVER (only once, only here) ---
const PORT =
  process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

app.listen(PORT, () => {
  console.log(`Server successfully listening on port ${PORT}`);
});
