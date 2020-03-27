const Seats = require('../models/seats.model');
const Client = require('../models/client.model');
const createItem = require('../utils/returnItemOrCreate');

exports.getAllSeats = async (req, res) => {
  try {
    res.json(await Seats.find().populate('client'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  console.log(day, seat, client, email);

  try {
    /* createItem checks if record exists if no it will create new and return id*/
    const clientId = await createItem(Client, { client, email });
    const newseat = await Seats.findOne({ seat, day });
    if (newseat) {
      res.status(404).json({ message: 'The slot is already taken...' });
    }
    const newTicket = new Seats({ client: clientId, seat, day });
    await newTicket.save();
    res.json({ message: 'OK', new: newTicket });
  } catch (err) {
    res.json(err);
  }
};

exports.getSeatById = async (req, res) => {
  const { id } = req.params;

  try {
    const seats = await Seats.findById(id).populate('client');

    if (!seats) res.status(404).json({ message: 'Not found' });
    else res.json(seats);
  } catch (err) {
    res.status(500).json({ message: 'err' });
  }
};

exports.putSeat = async (req, res) => {
  const { id } = req.params;
  const { day, seat, client } = req.body;

  try {
    let newSeat = await Seats.findById(id);
    if (!newSeat) res.status(404).json({ message: 'Not found' });
    else {
      newSeat.day = day;
      newSeat.seat = seat;
      newSeat.client = client;

      await newSeat.save();
      res.json(newSeat);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  const { id } = req.params;

  try {
    let seat = await Seats.findById(id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else {
      const deletedSeat = await Seats.deleteOne({ _id: id });
      res.json({ message: 'OK', modified: deletedConcert });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
