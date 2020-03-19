const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const PORT = process.env.PORT || 8000;

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

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

const io = socket(server);

io.on('connection', socket => {
  console.log('New socket connected');

  // socket.on('message', message => {
  //   messages.push(message);
  //   socket.broadcast.emit('message', message);
  // });

  socket.on('disconnect', () => {
    console.log('Socekt disconected');

    // socket.broadcast.emit('message', {
    //   author: 'Chat Bot',
    //   content: `${userName} has left the conversation... :(`,
    // });
  });
});
