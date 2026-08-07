import fs from "fs";

fs.appendFileSync(
  "/home/tarpainf/studiomeroclick.com.np/startup.log",
  `Started at ${new Date().toISOString()}\n`,
);

console.log("APP STARTED");

import "./server.js";
