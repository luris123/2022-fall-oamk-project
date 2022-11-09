const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const v8Schema = new Schema({
    year: {
        type: Array,
    },

});

v8Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()

    }
  })

module.exports = mongoose.model('V8', v8Schema);