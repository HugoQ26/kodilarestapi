const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { testimonials } = require('../db/db');
const Testimonials = require('../models/testimonials.model');
const {
  getAllTestimonials,
  postTestimonial,
  getRandomTestimonial,
  getTestimonialById,
  putTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonials.controller');

router.get('/', getAllTestimonials);

router.post('/', postTestimonial);

router.get('/random', getRandomTestimonial);

router.get('/:id', getTestimonialById);

router.put('/:id', putTestimonial);

router.delete('/:id', deleteTestimonial);

module.exports = router;
