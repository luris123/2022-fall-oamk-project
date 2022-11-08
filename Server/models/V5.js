const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v5Schema = new Schema({
    year: {
        type: Number,
    },
    t: {
        type: Number,
    }

});

v5Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V5', v5Schema);