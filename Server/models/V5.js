const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v5Schema = new Schema({
    year: {
        type: Number,
    },
    t: {
        type: Number,
    }

});

module.exports = mongoose.model('V5', v5Schema);