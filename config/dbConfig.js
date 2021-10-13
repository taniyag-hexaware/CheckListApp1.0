const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

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
  module.exports=connect
  