const express = require('express');
const app = express();
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/seats', seatsRoutes);
app.use('/concerts', concertsRoutes);
app.use('/testimonials', testimonialsRoutes);

app.use((req, res) => {
  res.json({ message: 'Not found...' });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
