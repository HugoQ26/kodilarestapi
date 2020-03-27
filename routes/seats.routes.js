const express = require('express');
const router = express.Router();

const {
  getAllSeats,
  postSeat,
  getSeatById,
  putSeat,
  deleteSeat,
} = require('../controllers/seats.controller');

router.get('/', getAllSeats);

router.post('/', postSeat);

router.get('/:id', getSeatById);

router.put('/:id', putSeat);

router.delete('/:id', deleteSeat);

module.exports = router;
