import express from "express";

const app: express.Application = express();
const port = process.env.PORT || 3001;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Sentinel server started at port ${port}`);
});
