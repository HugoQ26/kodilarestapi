const express = require('express');
const router = express.Router();
const {
  getAllConcerts,
  postConcert,
  getRandomConcert,
  getConcertById,
  putConcert,
  deleteConcert,
} = require('../controllers/concerts.controller');

router.get('/', getAllConcerts);

router.post('/', postConcert);

router.get('/random', getRandomConcert);

router.get('/:id', getConcertById);

router.put('/:id', putConcert);

router.delete('/:id', deleteConcert);

module.exports = router;
