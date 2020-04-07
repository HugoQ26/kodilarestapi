const chai = require('chai');
const chaiHttp = require('chai-http');
const Concerts = require('../../../models/concerts.model');
const server = require('../../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/price/:price_min/:price_max', () => {
  before(async () => {
    const newConcert1 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7dc34a8afd6030f4a80edd',
      price: 100,
      day: 1,
      image: 'image',
    });
    await newConcert1.save();
    const newConcert2 = new Concerts({
      performer: '5e7ce06ec9f1fb67830dc456',
      genre: '5e7dc34a8afd6030f4a80edd',
      price: 110,
      day: 3,
      image: 'image',
    });
    await newConcert2.save();
  });

  after(async () => {
    await Concerts.deleteMany({ genre: '5e7dc34a8afd6030f4a80edd' });
  });

  it('/ should return all concerts with specyfic price range 1', async function () {
    const res = await request(server).get('/api/concerts/price/100/110');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  it('/ should return all concerts with specyfic price range 2', async function () {
    const res = await request(server).get('/api/concerts/price/90/105');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('/ should return all concerts with specyfic price range 3', async function () {
    const res = await request(server).get('/api/concerts/price/103/111');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
  it('/ should return all concerts with specyfic price range 4', async function () {
    const res = await request(server).get('/api/concerts/price/98/111');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/ should return object with message "No concerts found with selected price range"', async function () {
    const res = await request(server).get('/api/concerts/price/1000/2000');
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal(
      'No concerts found with selected price range',
    );
  });
  it('/ should return object with error message', async function () {
    const res = await request(server).get('/api/concerts/price/a/b');
    expect(res.status).to.be.equal(500);
    expect(res.body).to.be.an('object');
    expect(res.body.message).not.to.be.empty;
  });
});
