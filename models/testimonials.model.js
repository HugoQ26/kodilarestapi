const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: 'Client',
    required: true,
  },
  text: { type: String, required: true },
});

module.exports = mongoose.model('Testimonials', testimonialsSchema);
