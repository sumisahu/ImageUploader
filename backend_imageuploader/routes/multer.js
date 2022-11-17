var multer = require("multer");
var { uuid } = require("uuidv4");

var storage = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    const filePath = `${uuid()}_${file.originalname}`;
    // path(null, file.originalname);
    path(null, filePath);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
