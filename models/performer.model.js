const mongoose = require('mongoose');

const performerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Performer', performerSchema);
