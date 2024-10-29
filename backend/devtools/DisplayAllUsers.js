const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const uri = process.env.MONGO_URI;
if (!uri) {
    console.error("MONGO_URI not found in environment variables!");
    process.exit(1);
}

const dbName = 'myshows';  // Replace with your database name

async function fetchUsers() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const users = await db.collection('users').find().toArray();  // Fetch all users

        console.log('Users:', users);  // Print users to console
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await client.close();  // Close the database connection
        console.log('Connection closed');
    }
}

fetchUsers();
