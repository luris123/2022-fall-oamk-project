const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v9Schema = new Schema({
    sub_sector_further_breakdown: {
       type: Array
    },

    sub_sector: {
        type: Array
    },

    sector: {
        type: Array
    },


});

module.exports = mongoose.model('V9', v9Schema);