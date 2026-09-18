require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function importData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Clear existing data so re-running the script doesn't duplicate items
        await collection.deleteMany({});

        const filePath = path.join(__dirname, 'gifts.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const result = await collection.insertMany(data);

        console.log(`${result.insertedCount} documents were inserted`);
        // This console output is what you save into your "inserted_items" file for Task 3
    } catch (err) {
        console.error("Error importing data:", err);
    } finally {
        await client.close();
    }
}

importData();
