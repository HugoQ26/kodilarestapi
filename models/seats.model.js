const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, ref: 'Client', required: true },
});

module.exports = mongoose.model('Seats', seatsSchema);
