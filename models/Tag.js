const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const tagSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  _note: {
     type: mongoose.Schema.ObjectId,
     ref: "Note",
  },
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
