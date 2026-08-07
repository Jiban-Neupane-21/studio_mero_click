import express from "express";

console.log("=== server.js LOADED ===");
console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("PORT =", process.env.PORT);

const app = express();

app.get("/", (req, res) => {
  res.send("Application is working");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening on ${PORT}`);
});
