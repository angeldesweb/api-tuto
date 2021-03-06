const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { ErrorMiddleware , NotFoundMiddleware } = require('./middlewares/ErrorsMiddleware');
const db = require('./database/connect_db');
const indexRoute = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Index router
app.use('/', indexRoute);


// catch 404 and forward to error handler
app.use(NotFoundMiddleware);

// error handler
app.use(ErrorMiddleware);

module.exports = app;
