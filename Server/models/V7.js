const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v7Schema = new Schema({
    gast_reconstruction: {
       type: Array
    },

    carbon_dioxide: {
        type: Array
    },


});

module.exports = mongoose.model('V7', v7Schema);