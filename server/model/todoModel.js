const mongoose = require("mongoose");

const todoSchema =
  ({
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  });

const ToDos = mongoose.model("Todos", todoSchema);
module.exports = ToDos;
