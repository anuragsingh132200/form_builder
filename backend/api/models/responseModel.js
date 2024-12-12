const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    ref: 'Form'
  },
  response: [{
    question: String,
    answer: String,
  }],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = { Response };