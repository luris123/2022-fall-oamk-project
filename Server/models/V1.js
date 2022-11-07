const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalAnnualSchema = new Schema({
    time: Number,
    anomaly: Number
});

const v1Schema = new Schema({
    globalAnnual: {
       type: Array
    },

    globalMonthly: {
        type: Array
    },

    northernAnnual: {
        type: Array
    },

    northernMonthly: {
        type: Array
    },

    southernAnnual: {
        type: Array
    },

    southernMonthly: {
        type: Array
    },

});

module.exports = mongoose.model('V1', v1Schema);