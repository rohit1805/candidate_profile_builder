const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  contact: String,
  password: String,
  gender: String,
  hobby: [String],
  address: {
    country: String,
    state: String,
    city: String,
    address1: String,
    address2: String,
    nearby: String,
    zipcode: String,
  },
  education: [
    {
      educationType: String,
      passingYear: String,
      schoolCollege: String,
      percentage: String,
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
