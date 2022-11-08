const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v3Schema = new Schema({
    annual: {
       type: Array
    },

    monthly: {
        type: Array
    },


});

module.exports = mongoose.model('V3', v3Schema);