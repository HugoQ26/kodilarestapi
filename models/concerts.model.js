const mongoose = require('mongoose');

const concertsSchema = new mongoose.Schema({
  performer: {
    type: String,
    ref: 'Performer',
    required: true,
  },
  genre: { type: String, ref: 'Genre', required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concerts', concertsSchema);
