process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../controller/workOrder.js');

const conn = require('../../../index.js');

describe('POST /workOrder', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));

    })
    after((done) => {
        conn.close()
          .then(() => done())
          .catch((err) => done(err));
      })
    it('OK, creating a new workOrder', (done) => {
        request(app).post('/workOrder/create/')
            .send({ name: 'workORder 1', description: 'description 2' })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('_id');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('description');
                expect(body).to.contain.property('createdAt');
                expect(body).to.contain.property('updatedAt');
                done();

            })
            .catch((err) => done(err));
    })
})
