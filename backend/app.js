const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables relative to this directory
dotenv.config({ path: require('path').join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', require('./routes/healthRoutes'));
app.use('/api/decks', require('./routes/deckRoutes'));
app.use('/api/flashcards', require('./routes/flashcardRoutes'));
app.use('/api/research-results', require('./routes/researchResultRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));

// Connect to Database
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.warn('Warning: MONGODB_URI is not defined in environment variables. Database connection skipped.');
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
