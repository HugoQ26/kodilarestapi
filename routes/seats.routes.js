const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { seats } = require('../db/db');

router.get('/', (req, res) => {
  res.json(seats);
});

router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const duplicates = seats.filter(i => i.seat == seat && i.day == day);

  if (duplicates.length) {
    res.status(404).json({ message: 'The slot is already taken...' });
  } else {
    seats.push({ id, day, seat, client, email });
    res.json({ message: 'OK' });
  }
});

router.get('/random', (req, res) => {
  const index = Math.floor(Math.random() * seats.length);
  res.json(seats[index]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const [item] = seats.filter(i => i.id == id);
  item ? res.json(item) : res.status(204).json({ message: 'noResults' });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { day, seat, client, email } = req.body;

  seats = seats.map(i => (i.id == id ? { ...i, day, seat, client, email } : i));
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  seats = seats.filter(i => i.id != id);

  res.json({ message: 'OK' });
});

module.exports = router;
