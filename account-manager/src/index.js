require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3002
const app = express();
app.use(express.json());
app.use('/api', routes);

// mongodb://localhost:27017
// mongodb://mongo:27017/accountmanager
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
