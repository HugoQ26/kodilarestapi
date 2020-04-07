const Concerts = require('../models/concerts.model');
const Performer = require('../models/performer.model');
const Genre = require('../models/genre.model');
const createItem = require('../utils/returnItemOrCreate');

exports.getAllConcerts = async (req, res) => {
  try {
    res.json(
      await Concerts.find()
        .populate('performer', 'name')
        .populate('genre', 'name'),
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    /* createItem checks if record exists if no it will create new and retirn id*/
    const performerId = await createItem(Performer, performer);
    const genreId = await createItem(Genre, genre);
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

exports.getAllPerformerConcerts = async (req, res) => {
  const { performer } = req.params;

  try {
    const perf = await Performer.findOne({ name: performer });
    if (!perf) {
      return res.status(404).json({ message: 'Performer not found' });
    }
    const performerId = perf._id;
    const concerts = await Concerts.find({ performer: performerId })
      .populate('genre')
      .populate('performer');
    if (!concerts.length)
      return res.status(404).json({ message: 'Concerts not found' });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const gen = await Genre.findOne({ name: genre });
    if (!gen) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    const genreId = gen._id;
    const concerts = await Concerts.find({
      genre: genreId,
    })
      .populate('genre')
      .populate('performer');

    if (!concerts.length) {
      return res
        .status(404)
        .json({ message: 'No concerts found with selected genre' });
    }
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByPriceRange = async (req, res) => {
  const { price_min, price_max } = req.params;
  console.log(price_min, price_max);

  try {
    const concerts = await Concerts.find()
      .where('price')
      .gte(price_min)
      .lte(price_max)
      .populate('genre')
      .populate('performer');
    if (!concerts.length) {
      return res.status(404).json({
        message: 'No concerts found with selected price range',
      });
    }

    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByDay = async (req, res) => {
  const { day } = req.params;

  try {
    const concerts = await Concerts.find({ day })
      .populate('genre')
      .populate('performer');
    if (!concerts.length) {
      return res.status(404).json({
        message: 'No concerts found with selected day',
      });
    }
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
