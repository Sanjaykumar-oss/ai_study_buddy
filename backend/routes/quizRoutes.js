const express = require('express');
const router = express.Router();
const { generateQuiz } = require('../controllers/quizController');

router.route('/generate')
  .post(generateQuiz);

module.exports = router;
