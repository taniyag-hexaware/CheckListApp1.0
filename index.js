// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

// we are using port 7000
const port = 7000;

// we will create these routes in the future
const workOrderRoutes = require("./routes/workOrder");
const taskRoutes = require("./routes/task");

const app = express();

// DB connection
mongoose
  .connect("mongodb+srv://user_616:root@cluster1.tc1ka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the userRoutes

app.use("/api", workOrderRoutes);
app.use("/api", taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,swaggerUi));

// start the server in the port 8000
app.listen(port, () => {
  console.log('Listening to http://localhost:${port}');
});

