const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const app = express();
const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.post("/save/single", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully" });
});

app.post("/save/multiple", upload.array("files", 100), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const filePaths = req.files.map((file) => file.path);
  res.send(`Files uploaded successfully: ${filePaths.join(", ")}`);
});

app.get("/fetch/single", (req, res) => {
  let files_array = fs.readdirSync(path.join(__dirname, "uploads"));
  if (files_array.length == 0) {
    return res.status(503).send({ message: "No images" });
  }
  let filename = _.sample(files_array);
  res.sendFile(path.join(__dirname, "uploads", filename));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
