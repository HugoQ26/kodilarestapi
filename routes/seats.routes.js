const express = require('express');
const router = express.Router();
const { seats } = require('../db/db');

router.get('/', (req, res) => {
  res.json(seats);
});

router.post('/', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  seats.push({ id, author, text });
  res.json({ message: 'OK' });
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
  const { author, text } = req.body;

  seats = seats.map(i => (i.id == id ? { ...i, author, text } : i));
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  seats = seats.filter(i => i.id != id);

  res.json({ message: 'OK' });
});

module.exports = router;
