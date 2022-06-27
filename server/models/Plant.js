const plantHistorySchema = require('./PlantHistory');
const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const plantSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    scientific_name: {
      type: String,
      required: true,
    },
    common_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500
    },
    image_path: {
      type: String,
      required: true,
    },
    usda_zone: {
      type: String,
    },
    pruning: {
      type: String,
    },
    fertilization: {
      type: String,
    },
    water: {
      type: String,
    },
    plantHistory: [plantHistorySchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Plant = model('Plant', plantSchema);

module.exports = Plant;
