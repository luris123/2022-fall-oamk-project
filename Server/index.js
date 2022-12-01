const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3001; 

//Cross Origin Resource Sharing
app.use(cors());

//built-in middleware to hande urlencoded form data
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json()); 

//Connect to MongoDB
connectDB();

app.get("/",(req,res) => {
    res.status(200).json({message: "Home Page"});
})

app.use('/datasets', require('./routes/datasetsRouter'));
app.use('/users', require('./routes/userRouter'));
app.use('/login', require('./routes/loginRouter'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;