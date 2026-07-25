const Deck = require('../models/Deck');

// @desc    Get all decks for a userId
// @route   GET /api/decks
const getDecks = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const decks = await Deck.find({ userId });
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new deck
// @route   POST /api/decks
const createDeck = async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) {
      return res.status(400).json({ message: 'name and userId are required' });
    }
    const newDeck = new Deck({ name, userId });
    const savedDeck = await newDeck.save();
    res.status(201).json(savedDeck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single deck by ID
// @route   GET /api/decks/:id
const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a deck name
// @route   PUT /api/decks/:id
const updateDeck = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    deck.name = name;
    const updatedDeck = await deck.save();
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a deck
// @route   DELETE /api/decks/:id
const deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    await Deck.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDecks,
  createDeck,
  getDeckById,
  updateDeck,
  deleteDeck
};
