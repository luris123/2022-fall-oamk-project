const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v4Schema = new Schema({
    de08: {
       type: Array
    },

    de082: {
        type: Array
    },

    dss: {
        type: Array
    },


});

module.exports = mongoose.model('V4', v4Schema);