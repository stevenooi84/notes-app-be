const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  id: {
    type: String,
    allowNull: false,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  tags: {
    type: Array,
    trim: true,
  },
});

noteSchema.pre('save', function(next) {
  console.log('hereeee', this)
  this.id = this._id;
  next();
});
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
