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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});