const devLogger = require('./devLogger');
const productionLogger = require('./productionLogger');

const dotenv = require("dotenv");
dotenv.config();

let logger=null;

if (process.env.NODE_ENV === "productionLogger") {
    logger=productionLogger();
  }

  if (process.env.NODE_ENV === "devLogger") {
    logger=devLogger();
  }  

 module.exports=logger; 