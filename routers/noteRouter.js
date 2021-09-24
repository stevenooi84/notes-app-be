const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

router
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote)
  .delete(noteController.deleteAllNote);

router
  .route('/funny')
  .post(noteController.getFunnyQuote);

router
  .route('/:id')
  .get(noteController.getNote)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

router
  .route('/tag/:tag')
  .get(noteController.getTag);


module.exports = router;
