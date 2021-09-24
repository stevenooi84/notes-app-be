const Tag = require('../models/Tag');

exports.getAllTags = (async (req, res, next) => {
  const tags = await Tag.find().distinct('description') || [];

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: tags?.length || 0,
    data: {
      tags,
    },
  });
});

exports.deleteAllTags = (async (req, res, next) => {
  const deletedNote = await Tag.deleteMany();

  res.status(200).json({
    status: 'success',
    note: deletedNote,
  });
});
