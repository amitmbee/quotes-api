const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
    quote: String,
    author: String
})

module.exports = mongoose.model('quotes', quotesSchema)