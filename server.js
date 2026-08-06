import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
dotenv.config({ path: "./.env.local" });

// Import your API route handler
import sendBookingEmailHandler from "./api/send-booking-email.js";
import sendContactEmailHandler from "./api/send-contact-email.js";
import sendClaimEmailHandler from "./api/send-claim-email.js";

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port than Vite's dev server (3000)

// Middleware to parse JSON request bodies
app.use(express.json());

// API route for sending booking emails
app.post("/api/send-booking-email", sendBookingEmailHandler);

// API route for sending contact form emails
app.post("/api/send-contact-email", sendContactEmailHandler);

// API route for sending offer claim emails
app.post("/api/send-claim-email", sendClaimEmailHandler);

// --- Production-specific setup (serving Vite build) ---
if (process.env.NODE_ENV === "production") {
  // Get __dirname equivalent in ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the Vite build output directory
  app.use(express.static(path.resolve(__dirname, "dist")));

  // All other GET requests not handled by API routes should serve the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV === "development") {
    console.log(`API routes available at http://localhost:${PORT}/api/...`);
    console.log(
      `Ensure your Vite dev server is configured to proxy to this port.`,
    );
  }
});
