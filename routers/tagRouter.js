const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router
  .route('/')
  .get(tagController.getAllTags)
  .delete(tagController.deleteAllTags)

module.exports = router;
