const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Authors' },
  title: String,
  text: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Articles', ArticlesSchema);
