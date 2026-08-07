import express from "express";

const app = express();

console.log("PORT =", process.env.PORT);

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});