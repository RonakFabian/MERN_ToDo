const mongoose = require("mongoose");

const userSchema =
  ({
    username: {
      type: String,
      required: [true, "Please enter a name"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  });

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
