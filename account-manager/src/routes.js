const express = require('express');
const { register, login, createAccount, getAccounts, getTransactions } = require('./controllers');
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

router.post('/register', register);
router.post('/login', login);
router.post('/account', authenticate, createAccount);
router.get('/accounts', authenticate, getAccounts);
router.get('/transactions/:accountId', authenticate, getTransactions);

module.exports = router;
