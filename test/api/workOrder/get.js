// // process.env.NODE_ENV = 'test';

// const expect = require('chai').expect;
// const request = require('supertest');

// const app = require('../../../controller/workOrder.js');

// const conn = require('../../../index.js');

// describe('GET /workOrdertesting', () => {
//     before((done) => {
//         conn.connect()
//             .then(() => done())
//             .catch((err) => done(err));

//     })
//     after((done) => {
//         conn.close()
//           .then(() => done())
//           .catch((err) => done(err));
//       })
//       it('OK, getting a new workOrder', (done) => {
//         request(app).get('/workOrdertesting')
           
//             .then((res) => {
//                 const body = res.body;
//                console.log(body);
//                 done();

//             })
//             .catch((err) => done(err));
//     })
// })