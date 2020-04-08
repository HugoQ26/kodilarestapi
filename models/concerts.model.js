const mongoose = require('mongoose');
const Performer = require('./performer.model');
const Genre = require('.//genre.model');

const concertsSchema = new mongoose.Schema({
  performer: {
    type: String,
    ref: 'Performer',
    required: true,
  },
  genre: { type: String, ref: 'Genre', required: true },
  price: {
    type: Number,
    required: true,
    min: [1, 'We arent non profit company'],
  },
  day: { type: Number, required: true, min: 1 },
  image: { type: String, required: true, minlength: 4 },
});

module.exports = mongoose.model('Concerts', concertsSchema);
