require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL, loaded from the .env file
const url = process.env.MONGO_URL;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url);

    // Task 4 requirement: connect using await client.connect()
    await client.connect();

    dbInstance = client.db(dbName);

    return dbInstance;
}

module.exports = connectToDatabase;
