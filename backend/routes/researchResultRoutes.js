const express = require('express');
const router = express.Router();
const {
  runAndSaveResearch,
  getResearchResults,
  getResearchResultById,
  deleteResearchResult
} = require('../controllers/researchResultController');

router.post('/run', runAndSaveResearch);

router.route('/')
  .get(getResearchResults);

router.route('/:id')
  .get(getResearchResultById)
  .delete(deleteResearchResult);

module.exports = router;
