const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true }, 
    balance: { type: Number, required: true, default: 0 }
});

const Account = mongoose.model('Account', accountSchema);

const transactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    amount: { type: Number, required: true },
    type: { type: String, required: true }, 
    toAddress: { type: String, required: true },
    status: { type: String, default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { User, Account, Transaction };
