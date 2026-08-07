import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log startup dynamically without hardcoding home directory paths
try {
  const logPath = path.join(__dirname, "startup.log");
  fs.appendFileSync(
    logPath,
    `Started at ${new Date().toISOString()}\n`
  );
  console.log("APP STARTED: Logged to startup.log");
} catch (err) {
  console.error("Failed to write to startup.log:", err);
}

// Dynamically import server.js after logging
import("./server.js");