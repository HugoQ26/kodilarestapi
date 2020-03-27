const Testimonials = require('../models/testimonials.model');
const Performer = require('../models/performer.model');
const Client = require('../models/client.model');
const createItem = require('../utils/returnItemOrCreate');

exports.getAllTestimonials = async (req, res) => {
  try {
    res.json(await Testimonials.find().populate('author'));
  } catch (error) {
    res.status(500).json({ message: err });
  }
};

exports.postTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonials({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK', new: newTestimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomTestimonial = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonials.findOne()
      .populate('author')
      .skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getTestimonialById = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonials.findById(id).populate('author');
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putTestimonial = async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;

  try {
    let testimonial = await Testimonials.findById(id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else {
      testimonial.text = text;
      testimonial.author = author;
      await testimonial.save();
      res.json(testimonial);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    let testimonial = await Testimonials.findById(id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else {
      const deletedConcert = await Testimonials.deleteOne({ _id: id });
      res.json({ message: 'OK', modified: deletedConcert });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
