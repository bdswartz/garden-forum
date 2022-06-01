const plantHistorySchema = require('./PlantHistory');
const { Schema, model } = require('mongoose');

const plantSchema = new Schema({
  scientific_name: {
    type: String,
    required: true,
  },
  common_name: {
    type: String,
    required: true,
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
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
