const express = require("express");
const app = express();
app.use(express.json());

app.post("/save", (req, res) => {
  console.log("Received image");
  res.json({ msg: "Saved!" });
});

app.listen(5000, () => console.log("Server running"));
