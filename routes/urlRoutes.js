const express = require('express');
const shortid = require('shortid');
const URL = require('../models/URL');
const validateURL = require('../utils/validateURL');

const router = express.Router();

// POST /URL - Create short URL
router.post('/URL', async (req, res) => {
    const { originalURL } = req.body;
    if (!validateURL(originalURL)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const shortID = shortid(6); // Generate a short ID
        const newURL = new URL({ originalURL, shortID });
        await newURL.save();
        res.json({ shortURL: `example.com/${shortID}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /id - Redirect to original URL
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const url = await URL.findOne({ shortID: id });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        url.clicks++;
        await url.save();
        res.redirect(url.originalURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /URL/analytics/:id - Get URL analytics
router.get('/URL/analytics/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const url = await URL.findOne({ shortID: id });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({ originalURL: url.originalURL, clicks: url.clicks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
