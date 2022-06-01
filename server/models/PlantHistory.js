const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;

const plantHistorySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  note_body: {
    type: String,
    maxlength: 280,
  },
});

module.exports = plantHistorySchema;
