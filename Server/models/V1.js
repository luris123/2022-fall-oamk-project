const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

v1Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V1', v1Schema);