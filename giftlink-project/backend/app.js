require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pinoHttp = require('pino-http');
const logger = require('./logger');

const connectToDatabase = require('./util/database');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(pinoHttp({ logger }));

// Connect to MongoDB once when the server starts
connectToDatabase()
    .then(() => {
        logger.info('Connected to DB');
    })
    .catch((e) => logger.error('Failed to connect to DB', e));

// Route registrations
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

// Task 7 requirement: a route serving /api/search
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Inside the GiftLink backend');
});

// Basic error handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
