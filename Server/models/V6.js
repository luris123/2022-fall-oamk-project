const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v6Schema = new Schema({
    year: {
        type: Number,
    },
    t: {
        type: Number,
    }

});

module.exports = mongoose.model('V6', v6Schema);