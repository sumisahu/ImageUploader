const { default: mongoose } = require("mongoose");
var schema = new mongoose.Schema({
  fullname: {
    type: "string",
  },
  email: {
    type: "string",
    unique: true,
  },
  password: {
    type: "string",
  },
  pic: {
    type: "array",
    default: [],
  },
});

var user = new mongoose.model("user", schema);

module.exports = user;
