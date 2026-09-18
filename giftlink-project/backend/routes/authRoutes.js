const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../util/database');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;

// ---------------------------------------------------------------
// REGISTER  ->  POST /api/auth/register
// ---------------------------------------------------------------
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const { firstName, lastName, email, password } = req.body;

        const existingEmail = await collection.findOne({ email });
        if (existingEmail) {
            logger.error('Email id already exists');
            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

        const newUser = await collection.insertOne({
            firstName,
            lastName,
            email,
            password: hash,
            createdAt: new Date(),
        });

        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, email });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// ---------------------------------------------------------------
// LOGIN  ->  POST /api/auth/login
// ---------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const { email, password } = req.body;
        const theUser = await collection.findOne({ email });

        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await bcryptjs.compare(password, theUser.password);
        if (!result) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        const payload = { user: { id: theUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({
            authtoken,
            userName: theUser.firstName,
            userEmail: theUser.email,
        });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// ---------------------------------------------------------------
// UPDATE  ->  PUT /api/auth/update
// ---------------------------------------------------------------
router.put('/update', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.headers.email;
        if (!email) {
            logger.error('Email not found in the request headers');
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            logger.error('User not found');
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.firstName = req.body.name || existingUser.firstName;
        existingUser.updatedAt = new Date();

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        const payload = { user: { id: updatedUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
