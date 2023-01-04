
require('dotenv').config();
const app = require('./app')
const {connection} = require('./src/db/connection')

const PORT = process.env.PORT || 3000;


  connection()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
    return process.exit(1)
  }
);


  
