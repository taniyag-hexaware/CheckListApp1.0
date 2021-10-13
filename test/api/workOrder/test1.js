let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../index");
let workOrder = require("../../../controller/workOrder");
let router = require("../../../routes/workOrder");
//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    // describe("GET /workOrdertesting", () => {
    //     it("It should GET all the tasks", (done) => {
    //         chai.request(app)
    //             .get("/workOrdertesting")
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                // response.body.should.be.a('string');
    //                 //response.body.length.should.be.eq(3);
    //                 //console.log(response.body);
    //             done();
    //             });
    //     });

        describe("GET /api/workOrders", () => {
            it("It should GET all the tasks", (done) => {
                chai.request(workOrder)
                    .get("/api/workOrders/")
                    .end((err, response) => {
                        response.should.have.status(200);
                        res.body.should.have.keys(['_id','name','description']);
                       // response.body.should.be.a('string');
                        //response.body.length.should.be.eq(3);
                        //console.log(response.body);
                    done();
                    });
            });
        });

        // it("It should NOT GET all the tasks", (done) => {
        //     chai.request(app)
        //         .get("/api/task")
        //         .end((err, response) => {
        //             response.should.have.status(404);
        //         done();
        //         });
        // });

    //});

});

