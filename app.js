const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')({
  secret: 'some random string goes here',
  resave: false,
  saveUninitalzed: false,
});

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const index = require('./routes/index');
const users = require('./routes/api/users');
const api = require('./routes/api/index');
const authentication = require('./routes/api/authentication');

const app = express();

// Connect Mongoose
mongoose.connect('mongodb://localhost/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successfully connected to MongoDB...'))
  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
const User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Webpack Server
const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: true,
    'errors-only': true,
  },
}));
app.use(webpackHotMiddleware(webpackCompiler, {
  log: console.log,
}));

app.use('/api/authentication', authentication);
app.use('/api/users', users);
app.use('/api', api);
app.use('/*', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
