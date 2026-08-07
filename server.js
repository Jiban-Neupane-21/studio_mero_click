import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config({ path: "./.env.local" });

const app = express();

// Passenger provides the port automatically.
const PORT = process.env.PORT || 3001;

// Create __dirname for ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------
// Middleware
// ------------------------------------------------

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ------------------------------------------------
// API routes
// ------------------------------------------------

// import sendBookingEmailHandler from "./api/send-booking-email.js";
// import sendContactEmailHandler from "./api/send-contact-email.js";
// import sendClaimEmailHandler from "./api/send-claim-email.js";

// app.post("/api/send-booking-email", sendBookingEmailHandler);
// app.post("/api/send-contact-email", sendContactEmailHandler);
// app.post("/api/send-claim-email", sendClaimEmailHandler);

// ------------------------------------------------
// React build paths
// ------------------------------------------------

const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");

console.log("Dist path:", distPath);
console.log("Index path:", indexPath);

// Verify that the build exists.

if (!fs.existsSync(distPath)) {
  console.error("ERROR: dist folder not found.");
}

if (!fs.existsSync(indexPath)) {
  console.error("ERROR: index.html not found.");
} else {
  console.log("index.html found.");
}

// ------------------------------------------------
// Serve static files
// ------------------------------------------------

app.use(express.static(distPath));

// ------------------------------------------------
// Health check
// ------------------------------------------------

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

// ------------------------------------------------
// React SPA fallback
// ------------------------------------------------

app.get("*", (req, res, next) => {
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("sendFile error:", err);
      next(err);
    }
  });
});

// ------------------------------------------------
// Error handler
// ------------------------------------------------

app.use((err, req, res, next) => {
  console.error("======== EXPRESS ERROR ========");
  console.error(err.stack || err);
  console.error("================================");

  res.status(500).send("Internal Server Error");
});

// ------------------------------------------------
// Start server
// ------------------------------------------------

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
