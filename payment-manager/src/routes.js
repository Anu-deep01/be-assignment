const express = require('express');
const { createTransaction, withdraw } = require('./controllers');
const jwt = require('jsonwebtoken');


const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.userId = decoded.userId;
        next();
    });
};

router.post('/send', authenticate, createTransaction);
router.post('/withdraw', authenticate, withdraw);

module.exports = router;
