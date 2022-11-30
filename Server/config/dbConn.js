const mongoose = require('mongoose');
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

//try connecting to database
const connectDB = async () => {
    try {
            mongoose.connect(MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(err) {
        console.error(err);
    }
}

module.exports = connectDB;