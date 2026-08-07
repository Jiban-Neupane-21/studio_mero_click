import express from "express";

const app = express();

console.log("=================================");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("=================================");

app.get("/", (req, res) => {
    console.log("GET /");
    res.send("Application is working.");
});

app.get("/health", (req, res) => {
    console.log("GET /health");
    res.json({
        status: "OK",
    });
});

app.use((req, res) => {
    console.log("404:", req.url);
    res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on ${PORT}`);
});