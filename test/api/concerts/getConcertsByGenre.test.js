const chai = require('chai');
const chaiHttp = require('chai-http');
const Concerts = require('../../../models/concerts.model');
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/genre/:genre', () => {
  before(async () => {
    const newConcert1 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7dc34a8afd6030f4a80edd',
      price: 25,
      day: 1,
      image: 'image',
    });
    await newConcert1.save();
    const newConcert2 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7dc34a8afd6030f4a80edd',
      price: 30,
      day: 3,
      image: 'image',
    });
    await newConcert2.save();
  });

  after(async () => {
    await Concerts.deleteMany({ genre: '5e7dc34a8afd6030f4a80edd' });
  });

  it('/ should return all concerts with specyfic genre', async function () {
    const res = await request(server).get('/api/concerts/genre/Dodo');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/ should return object with message "Genre not found"', async function () {
    const res = await request(server).get('/api/concerts/genre/dsfgeg');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Genre not found');
  });

  it('/ should return object with message "No concerts found with selected genre"', async function () {
    const res = await request(server).get('/api/concerts/genre/diskoPolo');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal(
      'No concerts found with selected genre',
    );
  });
});
