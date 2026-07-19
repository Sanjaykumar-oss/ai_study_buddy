const Flashcard = require('../models/Flashcard');
const Deck = require('../models/Deck');

// @desc    Get all flashcards (optionally by deckId)
// @route   GET /api/flashcards
const getFlashcards = async (req, res) => {
  try {
    const deckId = req.query.deckId || req.body.deckId;
    const filter = deckId ? { deckId } : {};
    const flashcards = await Flashcard.find(filter);
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new flashcard
// @route   POST /api/flashcards
const createFlashcard = async (req, res) => {
  try {
    const { question, answer, deckId } = req.body;
    if (!question || !answer || !deckId) {
      return res.status(400).json({ message: 'question, answer, and deckId are required' });
    }

    const deckExists = await Deck.findById(deckId);
    if (!deckExists) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    const flashcard = new Flashcard({ question, answer, deckId });
    const savedFlashcard = await flashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single flashcard
// @route   GET /api/flashcards/:id
const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update flashcard
// @route   PUT /api/flashcards/:id
const updateFlashcard = async (req, res) => {
  try {
    const { question, answer, deckId } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    if (question !== undefined) flashcard.question = question;
    if (answer !== undefined) flashcard.answer = answer;
    if (deckId !== undefined) {
      const deckExists = await Deck.findById(deckId);
      if (!deckExists) {
        return res.status(404).json({ message: 'Deck not found' });
      }
      flashcard.deckId = deckId;
    }

    const updatedFlashcard = await flashcard.save();
    res.status(200).json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete flashcard
// @route   DELETE /api/flashcards/:id
const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    await Flashcard.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFlashcards,
  createFlashcard,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard
};
