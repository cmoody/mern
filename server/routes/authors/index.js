const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../../middleware/auth');

// Models
const Authors = require('./authors-model');
const Articles = require('../articles/articles-model');

/**
 * Get Array of all authors.
 *
 * @param {Number} limit
 * @param {Number} offset
 * 
 * @return {Array}
 */
router.route('/')
  .get((req, res) => {
    const {
      limit = 10,
      offset = 0
    } = req.query;

    // Better handling for parseInt in case of NaN
    Authors
      .find()
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .exec((err, author) => {
        if (err) return res.status(400).send(err);

        return res.json(author);
      });
  })
/**
 * Add new author.
 *
 * @param {String} first
 * @param {String} last
 * 
 * @return {Object}
 */
  .post((req, res) => {
    const {
      first,
      last
    } = req.body;

    if (!first || !last) return res.status(400).send({ error: 'Missing field' });

    Authors.create({
      first,
      last
    }, (err, author) => {
      if (err) return res.status(400).send(err);

      return res.json(author);
    });
  });

/**
 * Returns single author by ID.
 *
 * @return {Object}
 */
router.route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params;

    Authors
      .findById(id)
      .exec((err, author) => {
        console.log(err)
        if (err) return res.status(400).send({ error: 'No user found' });

        return res.json(author);
      });
  })
/**
 * Returns single author by ID with updated data.
 *
 * @param {String} first
 * @param {String} last
 * 
 * @return {Object}
 */
  .put((req, res) => {
    const {
      first,  
      last
    } = req.body;

    const {
      id
    } = req.params;

    let args = {};
    
    // Need to think about more scalable way for more fields
    if (first) args.first = first;
    if (last) args.last =  last;
    if (Object.keys(args).length === 0) return res.status(400).send({ error: 'Nothing to update' });
    if (!id) return res.status(404).send({ error: 'No user found' });

    Authors
      .findByIdAndUpdate(id,
      args,
      (err, author) => {
        if (err) return res.status(400).send({ error: 'No user found'});

        return res.json(author);
      });
  })
/**
 * Returns if succesfully deleted by ID.
 *
 * @return {Object}
 */
  .delete(auth, async (req, res) => { // Only the delete method required Authentication
    const {
      id
    } = req.params;

    const deletedArticles = await Articles.deleteMany({ author: id });
    const deletedAuthor = await Authors.deleteOne({ _id: id });

    return res.json(deletedAuthor);
  });

/**
 * Returns single authors articles by ID.
 * 
 * @param {Number} limit
 * @param {Number} offset
 * 
 * @return {Object}
 */
router.route('/:id/articles')
  .get((req, res) => {
    const {
      limit = 10,
      offset = 0
    } = req.query;

    const {
      id
    } = req.params;

    Articles
      .find({
        author: id
      })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .select('title text url')
      .exec((err, articles) => {
        if (err) return res.status(400).send({ error: 'No user found' });

        return res.json(articles);
      });
  })

module.exports = router;
