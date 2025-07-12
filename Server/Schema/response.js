const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      required: true,
    },
    formTitle: {
      type: String,
      required: true,
    },
    formDescription: {
      type: String,
      required: true,
    },
    answers: {
      type: Object,
      required: true,
    },
    submitUser: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
