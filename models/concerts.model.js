const mongoose = require('mongoose');
const Performer = require('./performer.model');
const Genre = require('.//genre.model');

const concertsSchema = new mongoose.Schema({
  performer: {
    type: String,
    ref: 'Performer',
    required: true,
  },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concerts', concertsSchema);
