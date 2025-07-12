const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: String,
  label: String,
  type: String,
  required: Boolean,
  options: [String],
});

const formSchema = new mongoose.Schema(
  {
    formTitle: {
      type: String,
      required: true,
    },
    formDescription: {
      type: String,
    },
    questions: [questionSchema],
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FormList = mongoose.model("FormList", formSchema);

module.exports = FormList;
