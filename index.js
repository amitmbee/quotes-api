require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected to database')
})

db.on('error', (err) => {
    console.error(err)
})

app.use(express.json())

const quotesRouter = require('./routes/quotes')

app.use('/quotes', quotesRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started at port: ${process.env.PORT}`)
})