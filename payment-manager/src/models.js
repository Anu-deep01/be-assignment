const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    amount: { type: Number, required: true },
    type: { type: String, required: true }, 
    toAddress: { type: String, required: true },
    status: { type: String, default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };
