let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../index");
let workOrder = require("../../../controller/workOrder");
let router = require("../../../routes/workOrder");
//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Work Order APIs', () => {
    describe("GET /api/workOrders", () => {
        it("It should GET all the workOrders", (done) => {
            chai.request(app)
                .get("/api/workOrders/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('_id');
                    response.body[0].should.have.property('name');
                    response.body[0].should.have.property('description');
                 
                    done();
                });
        });
        // it("It should NOT GET all the tasks", (done) => {
        //     chai.request(app)
        //         .get("/api/workOrders/")
        //         .end((err, response) => {
        //             response.should.have.status(404);
        //             done();
        //         });
        // });
    });
    describe("GET /api/workOrders", () => {
        it("It should GET workOrders by id", (done) => {
            chai.request(app)
                .get("/api/workOrder/615fdcc30bb1039c38b19b8e/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('description');
                  
                    done();
                });
        });
        // it("It should NOT GET all the tasks", (done) => {
        //     chai.request(app)
        //         .get("/api/workOrders/")
        //         .end((err, response) => {
        //             response.should.have.status(404);
        //             done();
        //         });
        // });
    });

    describe("POST /workOrder/create/", () => {
        it("It should POST a new work order", (done) => {
            const workOrder = {
                name: "WorkOrder 10",
                description: "This is work order 10"
            };
            chai.request(app)
                .post("/api/workOrder/create/")
                .send(workOrder)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq("WorkOrder 10");
                    response.body.should.have.property('description').eq("This is work order 10");
                    done();
                });
        });
        it("It should NOT POST a new workOrder without the name property", (done) => {
            const workOrder = {
                description: false
            };
            chai.request(app)
                .post("/api/workOrder/create/")
                .send(workOrder)
                .end((err, response) => {
                    response.should.have.status(500);
                    done();
                });
        });

    });
     /**
     * Test the PUT route
     */
      describe("PUT /workOrder/update/:id", () => {
        it("It should PUT an existing task", (done) => {
            const workOrderID = "615fdcc30bb1039c38b19b8e";
            const workOrder = {
                name: "WorkOrder 1001",
                description: "This is work order 1001 updated"
            };
            chai.request(app)                
                .put("/api/workOrder/update/" + workOrderID )
                .send(workOrder)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq("615fdcc30bb1039c38b19b8e");
                    response.body.should.have.property('name').eq("WorkOrder 1001");
                    response.body.should.have.property('description').eq("This is work order 1001 updated");
                done();
                });
        });

        it("It should PUT an existing workOrder", (done) => {
            const workOrderID = "615fdcc30bb1039c38b19b8";
            const workOrder = {
                name: "WorkOrder 1001",
                description: "This is work order 1001 updated"
            };
            chai.request(app)                
                .put("/api/workOrder/update/" + workOrderID)
                .send(workOrder)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });    
    });
     /**
     * Test the DELETE route
     */
      describe("DELETE /api/workOrder/delete/:id", () => {
        it("It should DELETE an existing workOrder", (done) => {
            const workOrderID = "616596fc833c97578c6d33e9";
            chai.request(app)                
                .delete("/api/workOrder/delete/" + workOrderID )
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const workOrderID = "145";
            chai.request(app)                
            .delete("/api/workOrder/delete/" + workOrderID )
            .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

   });

    






});

