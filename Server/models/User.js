const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visualizationSchema = new Schema({
    url: {
        type: String,
        default: ''
    },

    settings: {
        v1v2: {
            type: Boolean,
            default: true,
        },
        v1v2text: {
            type: String,
            default: ''
        },

        v3v4v10: {
            type: Boolean,
            default: true,
        },
        v3v4v10text: {
            type: String,
            default: ''
        },

        v5: {
            type: Boolean,
            default: true,
        },
        v5text: {
            type: String,
            default: ''
        },
        v6: {
            type: Boolean,
            default: true,
        },
        v6text: {
            type: String,
            default: ''
        },
        v7v10: {
            type: Boolean,
            default: true,
        },
        v7v10text: {
            type: String,
            default: ''
        },
        v8: {
            type: Boolean,
            default: true,
        },
        v8text: {
            type: String,
            default: ''
        },
        v9: {
            type: Boolean,
            default: true,
        },
        v9text: {
            type: String,
            default: ''
        },
        display: {
            type: Boolean,
            default: true,
        },
    },
});

const userSchema = new Schema({

    username: {
        type: String,
    },
    passwordHash: {
        type: String
    },
    visualizations: {
        type: [visualizationSchema],
        default: []
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

 /* visualizationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
    }
  }) */

module.exports = mongoose.model('User', userSchema);