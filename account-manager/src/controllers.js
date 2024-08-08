const { User, Account, Transaction } = require('./models');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createAccount = async (req, res) => {
    const { type } = req.body;
    const userId = req.userId
    try {
        const account = new Account({ userId, type });
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAccounts = async (req, res) => {
    const userId  = req.userId;
    try {
        const accounts = await Account.findOne({ userId });
        res.json(accounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    const { accountId } = req.params;
    try {
        const transactions = await Transaction.findOne({ accountId });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login, createAccount, getAccounts, getTransactions };
