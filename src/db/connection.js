const mongoose = require('mongoose');

const uriDb = process.env.DB_HOST;

const connection = async() => {
   return  mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   });
} 


module.exports = {
    connection
};