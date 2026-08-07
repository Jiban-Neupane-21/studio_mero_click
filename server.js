import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Home page is working.");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION");
  console.error(reason);
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

server.on("error", (err) => {
  console.error("SERVER ERROR");
  console.error(err);
});

server.on("close", () => {
  console.log("SERVER CLOSED");
});

process.on("exit", (code) => {
  console.log(`PROCESS EXITED WITH CODE ${code}`);
});