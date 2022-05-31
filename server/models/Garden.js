const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const gardenSchema = new Schema(
    {
    name: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
    },
    username: {
    type: String,
    required: true
    },
    plants: [plantSchema]
    },
    {
    toJSON: {
    getters: true
    }
    }
    )

    // gardenSchema.virtual('plantCount').get(function() {
    //     return this.plants.length;
    //   });
      
      const Garden = model('Garden', gardenSchema);

      module.exports = Garden;