const express = require('express');
const router = express.Router();
const {
  getFlashcards,
  createFlashcard,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard
} = require('../controllers/flashcardController');

router.route('/')
  .get(getFlashcards)
  .post(createFlashcard);

router.route('/:id')
  .get(getFlashcardById)
  .put(updateFlashcard)
  .delete(deleteFlashcard);

module.exports = router;
