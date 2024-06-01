const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
const routes = require('./routes/routes');
const router = express.Router();
module.exports = router;
const cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`server started at ${3000}`)
})

