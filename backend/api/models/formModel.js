const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  url: String,
  formJson: Object,
  date: Date,
});

const Form = mongoose.model("Form", formSchema);

module.exports = { Form };