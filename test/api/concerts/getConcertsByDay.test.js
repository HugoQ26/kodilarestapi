const chai = require('chai');
const chaiHttp = require('chai-http');
const Concerts = require('../../../models/concerts.model');
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/day/:day', () => {
  before(async () => {
    const newConcert1 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7cabaa2b4ed031d05efc83',
      price: 25,
      day: 23,
      image: 'image',
    });
    await newConcert1.save();
    const newConcert2 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7cabaa2b4ed031d05efc83',
      price: 30,
      day: 23,
      image: 'image',
    });
    await newConcert2.save();
  });

  after(async () => {
    await Concerts.deleteMany({ image: 'image' });
  });

  it('/ should return all concerts in this day', async function () {
    const res = await request(server).get('/api/concerts/day/23');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/ should return object with message "No concerts found with selected day"', async function () {
    const res = await request(server).get('/api/concerts/day/111111');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('No concerts found with selected day');
  });

  it('/ should return object with error message', async function () {
    const res = await request(server).get('/api/concerts/day/q');
    expect(res.status).to.be.equal(500);
    expect(res.body).to.be.an('object');
    expect(res.body.message).not.to.be.empty;
  });
});
