const express = require('express');
const router = express.Router();
const { concerts } = require('../db/db');

router.get('/', (req, res) => {
  res.json(concerts);
});

router.post('/', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  concerts.push({ id, author, text });
  res.json({ message: 'OK' });
});

router.get('/random', (req, res) => {
  const index = Math.floor(Math.random() * concerts.length);
  res.json(concerts[index]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const [item] = concerts.filter(i => i.id == id);
  item ? res.json(item) : res.status(204).json({ message: 'noResults' });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;

  concerts = concerts.map(i => (i.id == id ? { ...i, author, text } : i));
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  concerts = concerts.filter(i => i.id != id);

  res.json({ message: 'OK' });
});

module.exports = router;
