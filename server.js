import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Application is running.");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});