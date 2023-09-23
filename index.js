const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/uploads");
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
   },
});
const upload = multer({ storage });

app.use('/', express.static(path.join(__dirname, 'public')))

app.get("/upload", (req, res) => {
   res.render("upload");
});
app.post("/upload", upload.single('image'), (req, res) => {
   res.send("image uploaded");
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
