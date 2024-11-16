const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MongoDB connection string is missing! Check your .env file.');
  process.exit(1); // Exit the app if the URI is not found
}

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

module.exports = { client, connectToDatabase };