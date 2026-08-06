import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config({ path: "./.env.local" });

// API Routes
// import sendBookingEmailHandler from "./api/send-booking-email.js";
// import sendContactEmailHandler from "./api/send-contact-email.js";
// import sendClaimEmailHandler from "./api/send-claim-email.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// ---------------------------
// API Routes
// ---------------------------
// app.post("/api/send-booking-email", sendBookingEmailHandler);
// app.post("/api/send-contact-email", sendContactEmailHandler);
// app.post("/api/send-claim-email", sendClaimEmailHandler);

// ---------------------------
// Static React Build
// ---------------------------
const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");

console.log("Dist Path:", distPath);
console.log("Index Path:", indexPath);

app.use(express.static(distPath));

// React SPA fallback
app.use((req, res, next) => {
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("sendFile Error:", err);
      next(err);
    }
  });
});

// ---------------------------
// Global Error Handler
// ---------------------------
app.use((err, req, res, next) => {
  console.error("======== EXPRESS ERROR ========");
  console.error(err.stack || err);
  console.error("===============================");

  res.status(500).send(err.stack || err.message || "Internal Server Error");
});

// ---------------------------
// Start Server
// ---------------------------
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});