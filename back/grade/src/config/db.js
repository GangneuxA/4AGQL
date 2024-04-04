const mongoose = require('mongoose');

const MONGO_URI = process.env.URLDB;
console.log(MONGO_URI)

const connectDB = () => {
    return mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Db Connected`);
    })
    .catch(err => {
      console.log(err.message);
    });
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection failed"));

module.exports = connectDB;