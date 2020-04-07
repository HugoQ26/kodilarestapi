const express = require('express');
const router = express.Router();

const {
  getAllConcerts,
  postConcert,
  getRandomConcert,
  getConcertById,
  putConcert,
  deleteConcert,
  getAllPerformerConcerts,
  getConcertsByGenre,
  getConcertsByPriceRange,
  getConcertsByDay,
} = require('../controllers/concerts.controller');

router.get('/', getAllConcerts);

router.post('/', postConcert);

router.get('/random', getRandomConcert);

router.get('/:id', getConcertById);

router.put('/:id', putConcert);

router.delete('/:id', deleteConcert);

router.get('/performer/:performer', getAllPerformerConcerts);

router.get('/genre/:genre', getConcertsByGenre);

router.get('/price/:price_min/:price_max', getConcertsByPriceRange);

router.get('/day/:day', getConcertsByDay);

module.exports = router;
