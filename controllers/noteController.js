const axios = require('axios');
const Note = require('../models/Note');
const Tag = require('../models/Tag');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllNotes = (async (req, res, next) => {
  const notes = await Note.find();

  // SEND RESPONSE
  res.status(200).json({
    notes,
  });
});

exports.createNote = (async (req, res, next) => {
  const newNote = await Note.create({
    content: req.body.content,
    tags: req.body.tags,
  });

  if (!newNote)
    return next(
      new AppError(`
      Can't create note due to invalid details, 400
      `)
    );

  const tags = req.body.tags;
  if(tags) {
    tags.forEach(async (tag)=> {
      const newTag = await Tag.create({
        description: tag,
        _note: newNote._id
      });
    });
  }

  res.status(200).json(newNote);
});

exports.updateNote = (async (req, res, next) => {

  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'content', 'tags');
  // Update note
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      runValidators: true,
    }
  );
  
  await Tag.deleteMany({ "_note": req.params.id });
  const tags = filteredBody.tags;
  if(tags) {
    tags.forEach(async (tag)=> {
      await Tag.create({
        description: tag,
        _note: req.params.id
      });
    });
  }

  res.status(200).json(updatedNote);
});

exports.getNote = (async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note)
    return next(
      new AppError(`Note with ID${req.params.id} not found`, 404)
    );

  res.status(200).json(note);
});

exports.deleteNote = (async (req, res, next) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  await Tag.deleteMany({ "_note": req.params.id });

  if (!deletedNote)
    return next(
      new AppError(`{
        "message": "Note with ID 1 not found",
        "id": ${req.params.id}
      }`, 404)
    );

  res.status(200).json(deletedNote);
});

exports.deleteAllNote = (async (req, res, next) => {
  try{ 
    await Note.deleteMany();
    await Tag.deleteMany();
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return next(
      new AppError(`Delete All Notes failed${err}`, 404)
    );
  }
});

exports.getTag = (async (req, res, next) => {
  const notes = await Note.find({
    tag: req.params.tag
  });

  res.status(200).json(notes);
});

exports.getFunnyQuote = (async (req, res, next) => {

  const randomUser = await axios.get('https://randomuser.me/api/');
  
  const firstName = randomUser?.data?.results[0]?.name?.first;
  const lastName = randomUser?.data?.results[0]?.name?.last;

  const randomJoke = await axios.get(`http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`);
  

  const newNote = await Note.create({
    content: randomJoke,
    tags: ['funny'],
  });

  if (!newNote)
    return next(
      new AppError(`
      Can't create note due to invalid details, 400
      `)
    );

  const tags = req.body.tags;
  if(tags) {
    tags.forEach(async (tag)=> {
      const newTag = await Tag.create({
        description: tag,
        _note: newNote._id
      });
    });
  }

  res.status(200).json(newNote);

});
