const mongoose = require('mongoose');

//try connecting to database
const connectDB = async () => {
    try {
            mongoose.connect("mongodb+srv://group5-user:sovellusprojekti@cluster0.xu4r63n.mongodb.net/db?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(err) {
        console.error(err);
    }
}

module.exports = connectDB;