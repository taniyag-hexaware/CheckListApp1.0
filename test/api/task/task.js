let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Task APIs', () => {
    describe("GET /api/tasks/", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(app)
                .get("/api/tasks/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('_id');
                    response.body[0].should.have.property('task_name');
                    response.body[0].should.have.property('task_description');
                    response.body[0].should.have.property('wordOrderId');
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
    describe("GET /api/task", () => {
        it("It should GET task by id", (done) => {
            chai.request(app)
                .get("/api/task/615fdfc40bb1039c38b19b93/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id');
                    response.body.should.have.property('task_name');
                    response.body.should.have.property('task_description');
                    response.body.should.have.property('wordOrderId');
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

    //this is find task by workOrderId 
    describe("GET /api/taskwork", () => {
        it("It should GET task by wordOrderId", (done) => {
            chai.request(app)
                .get("/api/taskwork/615ef03869fad420ce41ea0a/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('_id');
                    response.body[0].should.have.property('task_name');
                    response.body[0].should.have.property('task_description');
                    response.body[0].should.have.property('wordOrderId');
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

    describe("POST /task/create/", () => {
        it("It should POST a new task", (done) => {
            const task = {
                task_name: "task 10",
                task_description: "This is task 10",
                wordOrderId: "615ef03869fad420ce41ea0a"
            };
            chai.request(app)
                .post("/api/task/create/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('task_name').eq("task 10");
                    response.body.should.have.property('task_description').eq("This is task 10");
                    response.body.should.have.property('wordOrderId').eq("615ef03869fad420ce41ea0a");
                    done();
                });
        });
        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                description: "This is task 10"
            };
            chai.request(app)
                .post("/api/task/create/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(500);
                    done();
                });
        });

    });
     /**
     * Test the PUT route
     */
      describe("PUT /task/update/:id/", () => {
        it("It should PUT an existing task", (done) => {
            const taskID = "615ef18869fad420ce41ea13";
            const task = {
                task_name: "task 1001",
                task_description: "This is task 1001 updated",
                wordOrderId: "615ef03869fad420ce41ea0a"
            };
            chai.request(app)                
                .put("/api/task/update/" + taskID + "/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq("615ef18869fad420ce41ea13");
                    response.body.should.have.property('task_name').eq("task 1001");
                    response.body.should.have.property('task_description').eq("This is task 1001 updated");
                    response.body.should.have.property('wordOrderId').eq("615ef03869fad420ce41ea0a");
                done();
                });
        });

        it("It should PUT an existing task", (done) => {
            const taskID = "615ef18869fad420ce41ea1";
            const task = {
                task_name: "task 1001",
                task_description: "This is task 1001 updated",
                wordOrderId: "615ef03869fad420ce41ea0a"
            };
            chai.request(app)                
                .put("/api/task/update/" + taskID + "/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });    
    });
     /**
     * Test the DELETE route
     */
      describe("DELETE /api/task/delete/:id/", () => {
        it("It should DELETE an existing task", (done) => {
            const taskID = "61659d5ad9e9b7490bf63fca";
            chai.request(app)                
                .delete("/api/task/delete/" + taskID + "/")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const taskID = "145";
            chai.request(app)                
            .delete("/api/task/delete/" + taskID + "/")
            .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

   });

    






});

