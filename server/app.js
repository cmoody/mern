// Modules ==================================================
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Database Connects ========================================
const {
  DB_HOST,
  DB_PASS,
  DB_USERNAME,
  DB_NAME
} = process.env;

// mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASS}@${DB_HOST}/${DB_NAME}`); // Store port?
mongoose.connect('mongodb://localhost:27017/blog');

// Route Modules ============================================
const routes = require('./routes');

// Start Express ============================================
const app = express();

// App Middleware ===========================================
app.use(helmet());
app.use(logger('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compress());
app.use(cors());

// routes ==================================================
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => res.status(404).send({ error: 'Not found' }));

module.exports = app;
