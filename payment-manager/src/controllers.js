const cron = require('node-cron');
const { Transaction } = require('./models');

cron.schedule('0 0 * * *', async () => {
    const recurringTransactions = await Transaction.find({ isRecurring: true, status: 'pending' });
    for (const transaction of recurringTransactions) {
        processTransaction(transaction)
            .then(async (processedTransaction) => {
                await Transaction.findByIdAndUpdate(processedTransaction._id, { status: 'completed' });
            })
            .catch(error => {
                console.error('Recurring transaction processing failed:', error);
            });
    }
});


const processTransaction = (transaction) => {
    return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        setTimeout(() => {
            console.log('transaction processed for:', transaction);
            transaction.status = 'completed';
            resolve(transaction);
        }, 30000); 
    });
};

const createTransaction = async (req, res) => {
    const { accountId, amount, type, toAddress } = req.body;
    try {
        const transaction = new Transaction({ accountId, amount, type, toAddress });
        await transaction.save();
        processTransaction(transaction)
            .then(async (processedTransaction) => {
                await Transaction.findByIdAndUpdate(processedTransaction._id, { status: 'completed' });
                res.json(processedTransaction);
            })
            .catch(error => {
                res.status(500).json({ error: 'Transaction processing failed' });
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


  const withdraw = async (req, res) => {
    const { accountId, amount, type, toAddress } = req.body;
    const userId = req.userId;
  
    try {
      const transaction = new Transaction({ userId, accountId, amount, status: 'pending', type, toAddress });
      const savedTransaction = await transaction.save();
  
      processTransaction(savedTransaction)
        .then(async (processedTransaction) => {
          await Transaction.findByIdAndUpdate(processedTransaction._id, processedTransaction);
          res.json(processedTransaction);
        })
        .catch((error) => {
          res.status(400).json({ error: 'Transaction processing failed' });
        });
    } catch (error) {
        console.log("===>", error)
      res.status(400).json({ error: 'Transaction creation failed' });
    }
  };
  


module.exports = { createTransaction, withdraw };
