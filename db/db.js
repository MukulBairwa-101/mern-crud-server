const mongoose = require("mongoose");

require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
//   useCreateIndex: true,
  useUnifiedTopology: true,
};

const db_url = `mongodb+srv://mukulbairwa-db_cloud1608:${process.env.DB_KEY}@cluster0.bnkhjiv.mongodb.net/test`;

const connection = mongoose
  .connect(db_url, connectionParams)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log('Error connecting to the database',err))


  module.exports = connection;
  