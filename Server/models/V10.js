const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v10Schema = new Schema({
    year: {
        type: Number,
    },
    description: {
        type: String,
    }

});

v10Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V10', v10Schema);