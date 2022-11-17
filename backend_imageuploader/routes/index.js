var express = require("express");
const user = require("../modals");
const upload = require("./multer");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  await user.create({
    fullname: "Arun patel",
    email: "arun12@gmail.com",
    password: "12345678",
  });
  res.render("index", { title: "Express" });
});

router.post("/signup/userlogin", async (req, res, next) => {
  const userData = await user.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  res.json({ status: userData ? true : false, data: userData });
});

router.post("/signup/usersignup", async (req, res, next) => {
  console.log(req.body);
  const userData = await user.create({ ...req.body });
  res.json(userData);
});

router.post(
  "/insert/insertimages",
  upload.single("picture"),
  async (req, res, next) => {
    console.log(req.file, req.body);
    const updateUser = await user.updateOne(
      { email: req.body.email },
      {
        $push: {
          pic: req.file.filename,
        },
      }
    );
    console.log(updateUser);
    res.json({ status: true });
  }
);

router.post("/insert/getimages", async (req, res) => {
  const data = await user.findOne({ email: req.body.email });
  res.json({ data: data });
});

// user.updateOne({email : req.body.email} , {$set : {$push : {
//   pic :
// }}})

module.exports = router;
