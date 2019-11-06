const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const erroHandler = require('./middlewares/error');
var morgan = require('morgan');

// Load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// Connect to DB
connectDB();

const app = express();

//  Static Files
app.use('/', express.static(`${__dirname}/angular`));

app.use(morgan('dev'));

// Body parse
app.use(express.json());

// Load middleware for CORS
const { setHeader } = require('./middlewares/setHeader');
app.use(setHeader);

// Load routes
const list = require('./routes/list');

// Mount routes
app.use('/api', list);

// Error handler
app.use(erroHandler);

// Set Angular
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/angular/index.html`);
});

module.exports = app;
