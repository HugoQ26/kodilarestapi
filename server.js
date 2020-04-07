const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const socket = require('socket.io');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const PORT = process.env.PORT || 8000;
const dbHostAtlas = process.env.DB_HOST_ATLAS;
const dbHostLocal = process.env.DB_HOST_LOCAL;
const dbHost = dbHostAtlas || dbHostLocal;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/seats', seatsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/testimonials', testimonialsRoutes);

app.use('api', (req, res) => {
  res.json({ message: 'Not found...' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket connected');

  socket.on('disconnect', () => {
    console.log('Socekt disconected');
  });
});

module.exports = server;
