const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v2Schema = new Schema({
    year: {
        type: Number,
    },
    t: {
        type: Number,
    }

});

v2Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V2', v2Schema);