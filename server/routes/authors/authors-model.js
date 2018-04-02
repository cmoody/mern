const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorsSchema = new Schema({
  first: String,
  last: String
});

module.exports = mongoose.model('Authors', AuthorsSchema);