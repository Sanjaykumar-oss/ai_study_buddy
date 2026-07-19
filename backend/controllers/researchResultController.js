const ResearchResult = require('../models/ResearchResult');
const User = require('../models/User');
const Deck = require('../models/Deck');
const { runResearchPipeline } = require('../services/orchestrator');

// @desc    Run research pipeline and save result
// @route   POST /api/research-results/run
const runAndSaveResearch = async (req, res) => {
  try {
    const { topic, userId, deckId } = req.body;
    if (!topic || !userId) {
      return res.status(400).json({ message: 'topic and userId are required' });
    }

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify deck if provided
    if (deckId) {
      const deckExists = await Deck.findById(deckId);
      if (!deckExists) {
        return res.status(404).json({ message: 'Deck not found' });
      }
    }

    // Run the agent pipeline
    const pipelineData = await runResearchPipeline(topic);

    // Save result to DB
    const researchResult = new ResearchResult({
      topic,
      content: pipelineData.reviewResult, // saving the final review/draft
      userId,
      deckId: deckId || undefined
    });

    const savedResult = await researchResult.save();

    res.status(201).json({
      message: 'Research pipeline executed successfully',
      result: savedResult,
      details: pipelineData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all research results (optionally by userId)
// @route   GET /api/research-results
const getResearchResults = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    const filter = userId ? { userId } : {};
    const results = await ResearchResult.find(filter);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single research result
// @route   GET /api/research-results/:id
const getResearchResultById = async (req, res) => {
  try {
    const result = await ResearchResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Research result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete research result
// @route   DELETE /api/research-results/:id
const deleteResearchResult = async (req, res) => {
  try {
    const result = await ResearchResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Research result not found' });
    }
    await ResearchResult.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Research result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  runAndSaveResearch,
  getResearchResults,
  getResearchResultById,
  deleteResearchResult
};
