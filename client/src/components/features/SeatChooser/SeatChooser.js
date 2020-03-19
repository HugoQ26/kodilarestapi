import React from 'react';
import io from 'socket.io-client';
import { Button, Progress, Alert } from 'reactstrap';

import './SeatChooser.scss';

const host = process.env.NODE_ENV === 'production' ? '' : 'localhost:8000';

class SeatChooser extends React.Component {
  componentDidMount() {
    this.socket = io(host);
    const { loadSeatsData, loadSeats } = this.props;
    loadSeats();

    this.socket.on('seatsUpdated', seats => {
      loadSeatsData(seats);
    });
  }

  isTaken = seatId => {
    const { seats, chosenDay } = this.props;
    console.log(seats);

    return seats.some(item => item.seat === seatId && item.day === chosenDay);
  };

  freeSeats() {
    const { seats, chosenDay } = this.props;
    return seats.filter(seat => seat.day == chosenDay).length;
  }

  prepareSeat = seatId => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className="seats__seat" color="primary">
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className="seats__seat" disabled color="secondary">
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color="primary"
          className="seats__seat"
          outline
          onClick={e => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  render() {
    const { prepareSeat } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2">
          <Button color="secondary" /> – seat is already taken
        </small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4">
          <Button outline color="primary" /> – it's empty
        </small>
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
          <div className="seats">
            {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
            <h5>Free seats: {50 - this.freeSeats()}/50</h5>
          </div>
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
          <Progress animated color="primary" value={50} />
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
          <Alert color="warning">Couldn't load seats...</Alert>
        )}
      </div>
    );
  }
}

export default SeatChooser;
