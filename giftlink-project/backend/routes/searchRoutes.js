const express = require('express');
const router = express.Router();
const connectToDatabase = require('../util/database');
const logger = require('../logger');

// GET /api/search?name=...&category=...&condition=...&age_years=...
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        // Build a dynamic MongoDB query object based on the provided query params
        let query = {};

        if (req.query.name && req.query.name.trim() !== "") {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // Task 6: filter items by category
        if (req.query.category && req.query.category.trim() !== "") {
            query.category = req.query.category;
        }

        if (req.query.condition && req.query.condition.trim() !== "") {
            query.condition = req.query.condition;
        }

        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };
        }

        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (e) {
        logger.error('Error searching gifts', e);
        next(e);
    }
});

module.exports = router;
