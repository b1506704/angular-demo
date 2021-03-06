import express from 'express';

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.static("./client/dist/angular-demo"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "./client/dist/angular-demo" });
});

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));
