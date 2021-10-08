# CheckListApp1.0
The app contains two models - workOrder and task. Further user model can also be added

# Checklist App with NodeJS, ExpressJS and MongoDB - REST APIs 
 

## Overview

This is a application for building REST APIs in Node.js using Express, Mongoose and MongoDB.
 
## About
 
This configuration is a backend [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) boilerplate with the following pieces:
 
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [MongoDB](https://www.mongodb.com/) as the database layer
- [Mongoose](https://mongoosejs.com/) as the "ODM" / model layer
-  [Swagger](https://swagger.io/) as the API documentation
 
This is a REST API, so it works using the following HTTP methods:
 
*   GET (Read): Gets a list of items, or a single item
*   POST (Create): Creates an item
*   PUT (Update): Updates an item
*   DELETE: Deletes an item
 
## APIs
 
#### Work Order
 
- GET    : `/workOrders/` -  To get a list of all workorders.
- GET    : `/workOrder/:id/` -  To get a specific workorder.
- POST   : `/workOrder/create/` -  To create a new workorder.
- DELETE : `/workOrder/:id/delete` -  Deletes a workorder.
- PUT    : `/workOrder/:id/update` -  Update an existing workorder.
 
#### Task
 
- GET    : `/tasks/` -  To get a list of all tasks.
- GET    : `/task/:id/` -  To get a specific task.
- GET    : `/worktask/:id/` -  To get a specific task by workid.
- POST   : `/task/create` -  Add a new task to the checklist.
- DELETE : `/task/:id/delete` -  Deletes a task.
- PUT    : `/task/:id/update` -  Update an existing task.
 
## Additional Features
- CORS support via [cors](https://github.com/expressjs/cors)
- Error handling for `http` status errors `500` `404` `400`
 
 
## Getting Started

Clone the repo:
```sh
git clone https://github.com/taniyag-hexaware/CheckListApp.git
cd CheckListApp
```

Install dependencies:
```sh
npm install
npm update
```
 
Start server:
```sh
# Start server
npm start 
```
 
## To Test The APIs 
```sh
# run the following URL in browzer for swagger
http://localhost:7000/api-docs/#/
```
 
## Deployment
```sh
# Steps to be added
```
 
## Docker
```sh
# Steps to be added
```
 
## License
To be added
 
 
