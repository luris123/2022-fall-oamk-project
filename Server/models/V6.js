const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v6Schema = new Schema({
    year: {
        type: Number,
    },
    t: {
        type: Number,
    }

});

v6Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V6', v6Schema);