const express = require('express');

const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Routes
const articles = require('./articles');
const authors = require('./authors');

router.use('/articles', auth, articles); // Entire route requires Authentication
router.use('/authors', authors);

module.exports = router;