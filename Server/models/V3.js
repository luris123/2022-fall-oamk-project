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

v3Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V3', v3Schema);