const Concerts = require('../models/concerts.model');
const Performer = require('../models/performer.model');
const Genre = require('../models/genre.model');

exports.getAllConcerts = async (req, res) => {
  try {
    res.json(
      await Concerts.find()
        .populate('performer')
        .populate('genre'),
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const idGenerator = async (Model, newValue) => {
    try {
      const item = await Model.findOne({ name: newValue });

      if (item) {
        return item._id;
      }
      const newItem = new Model({ name: newValue });
      await newItem.save();
      return newItem._id;
    } catch (error) {
      return new Error(error);
    }
  };

  try {
    const performerId = await idGenerator(Performer, performer);
    const genreId = await idGenerator(Genre, genre);
    const newConcert = new Concerts({
      performer: performerId,
      genre: genreId,
      price,
      day,
      image,
    });
    await newConcert.save();
    res.json({ message: 'OK', new: newConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomConcert = async (req, res) => {
  try {
    const count = await Concerts.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concerts.findOne()
      .populate('performer')
      .populate('genre')
      .skip(rand);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertById = async (req, res) => {
  const { id } = req.params;

  try {
    const concert = await Concerts.findById(id)
      .populate('performer')
      .populate('genre');
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putConcert = async (req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;

  try {
    let concert = await Concerts.findById(id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  const { id } = req.params;

  try {
    let concert = await Concerts.findById(id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      const deletedConcert = await Concerts.deleteOne({ _id: id });
      res.json({ message: 'OK', modified: deletedConcert });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
