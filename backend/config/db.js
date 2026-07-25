const mongoose = require('mongoose');
const User = require('../models/User');

const seedDefaultUser = async () => {
  try {
    const defaultUserId = '60d5ec4b1234567890abcdef';
    const userExists = await User.findById(defaultUserId);
    if (!userExists) {
      await User.create({
        _id: defaultUserId,
        name: 'John Doe',
        email: 'john@example.com'
      });
      console.log('Seeded default user: John Doe (60d5ec4b1234567890abcdef)');
    }
  } catch (error) {
    console.error('Error seeding default user:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultUser();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
