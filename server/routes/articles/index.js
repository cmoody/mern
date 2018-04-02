const express = require('express');
const router = express.Router();
const slug = require('slug');

// Models
const Articles = require('./articles-model');

/**
 * Get Array of all articles.
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

    Articles
      .find()
      .populate('author')
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .exec((err, article) => {
        if (err) return res.status(400).send(err);

        return res.json(article);
      });
  })
/**
 * Add new article.
 *
 * @param {String} author
 * @param {String} title
 * @param {String} text
 * 
 * @return {Object}
 */
  .post((req, res) => {
    const {
      author, // Normally this would be determined by id from Authentication
      title,
      text
    } = req.body;

    if (!author || !title || !text) return res.status(400).send({ error: 'Missing field' });

    Articles.create({
      author,
      title,
      text,
      url: slug(title)
    }, (err, article) => {
      if (err) return res.status(400).send(err);

      return res.json(article);
    });
  });

/**
 * Returns single article by url.
 *
 * @return {Object}
 */
// Make url non-dupe field
router.route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params; // id is actually a url for GET method

    Articles
      .findOne({
        url: id
      })
      .populate('author')
      .exec((err, article) => {
        if (err) return res.status(400).send(err);

        return res.json(article);
      });
  })
/**
 * Returns single article by ID with updated data.
 *
 * @param {String} title
 * @param {String} text
 * 
 * @return {Object}
 */
  .put((req, res) => {
    const {
      title,
      text
    } = req.body;

    const {
      id
    } = req.params;

    let args = {};

    if (title) args.first = first;
    if (text) args.last = last;
    if (Object.keys(args).length === 0) return res.status(400).send({ error: 'Nothing to update' });
    if (!id) return res.status(404).send({ error: 'No user found' });

    Articles
      .findByIdAndUpdate(id,
        args,
        (err, author) => {
          if (err) return res.status(400).send(err);

          return res.json(author);
        });
  })
/**
 * Returns if succesfully deleted by ID.
 *
 * @return {Object}
 */
  .delete(async (req, res) => {
    const {
      id
    } = req.params;

    try {
      const deletedArticle = await Articles.deleteOne({ _id: id });

      return res.json(deletedArticle);
    } catch(e) {
      console.log(e)
      return res.status(400).send({ error: 'Couldnt delete' });
    }
  });

module.exports = router;
