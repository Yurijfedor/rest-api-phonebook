const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

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