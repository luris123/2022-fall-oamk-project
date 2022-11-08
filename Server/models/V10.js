const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v10Schema = new Schema({
    year: {
        type: Number,
    },
    description: {
        type: String,
    }

});

module.exports = mongoose.model('V10', v10Schema);