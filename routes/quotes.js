const express = require('express');
const router = express.Router();
const Quote = require('../models/quotes');

//middleware
async function getQuote(req, res, next) {
    let quote;
    try {
        quote = await Quote.findById(req.params.id)
        if (quote === null) {
            return res.status(404).json({ message: 'Quote not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.quote = quote;
    next();
}

// Router

// Get all
router.get('/', async(req, res) => {
    try {
        const allQuotes = await Quote.find();
        res.json({ quotes: allQuotes, length: allQuotes.length });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Get one
router.get('/:id', getQuote, (req, res) => {
    res.json(res.quote)
})

// Insert one
router.post('/', async(req, res) => {
    const quote = new Quote({
        quote: req.body.quote,
        author: req.body.quote
    })
    try {
        const newQuote = await quote.save();
        res.status(201).json(newQuote);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Update one
router.patch('/:id', getQuote, async(req, res) => {
    if (req.body.quote !== null) {
        res.quote.quote = req.body.quote
    }
    if (req.body.author !== null) {
        res.quote.author = req.body.author
    }

    try {
        const updatedQuote = await res.quote.save();
        res.json(updatedQuote)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Delete one
router.delete('/:id', getQuote, async(req, res) => {
    try {
        await res.quote.remove()
        res.json({ message: 'deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;