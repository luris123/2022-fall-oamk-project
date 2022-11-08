const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v8Schema = new Schema({
    year: {
        type: Array,
    },

});

module.exports = mongoose.model('V8', v8Schema);