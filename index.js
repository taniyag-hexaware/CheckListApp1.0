// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const compression = require('compression');

// we are using port 7000
const port = 7001;

// we will create these routes in the future
const workOrderRoutes = require("./routes/workOrder");
const taskRoutes = require("./routes/task");

const app = express();

app.use(
  compression(
      {
          level:-1
      }
  )
)

// DB connection
const dotenv = require("dotenv");
dotenv.config();

// function connect()
// {
//   if (process.env.NODE_ENV ==='test')
//     {
//      const Mockgoose = require('mockgoose').Mockgoose;
//      const mockgoose=new Mockgoose(mongoose);
    
//      mockgoose.prepareStorage()
//      .then(()=>
//      mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//       console.log("Connected to db!");
//       app.listen(port, () => console.log('Listening to http://localhost:7001'));
//     })
//     )}
//     else{
//     mongoose
//       // .connect("mongodb+srv://user_616:root@cluster1.tc1ka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
//       //   useNewUrlParser: true,
//       //   useUnifiedTopology: true,
        
//       // })
//       // .then(() => {
//       //   console.log("CONNECTED TO DATABASE");
//       // });
//       .connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//         console.log("Connected to db!");
//         app.listen(port, () => console.log('Listening to http://localhost:7001'));
//     });
//     }
   
// }

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(process.env.DB_CONNECT,
            { useNewUrlParser: true}
            )
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        })
    } else {
        mongoose.connect(process.env.DB_CONNECT,
          { useNewUrlParser: true}
    )
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
    }
  });
}
function close() {
  return mongoose.disconnect();
}



// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the userRoutes

app.use("/api", workOrderRoutes);
app.use("/api", taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,swaggerUi));

// // start the server in the port 8000
// app.listen(port, () => {
//   console.log('Listening to http://localhost:7000');
// });

// app.get('/',(req,res)=>
// {
//   const demo=
//   res.send(demo)
// })

// app.get('/workOrdertesting',(req,res)=>{
//   res.send('Hello World')
// })
connect()
  .then(() => {
    app.listen(port, () => {
      console.log('Listening on port: ' + port);
    });
  });
module.exports = {connect,close};
module.exports = app;