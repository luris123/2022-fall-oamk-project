const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v2Schema = new Schema({
    year: {
        type: Number,
        default: 0
    },
    t: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('V2', v2Schema);