const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const conn = require('./db/conn');
const config = require('../webpack.config');
const logger = require('./logger');
const app = require('./app');

module.exports = app;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('../bundle'));

app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/public/fonts', express.static(path.join(__dirname, '..', 'public', 'fonts')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/stylesheets', express.static(path.join(__dirname, '..', 'browser', 'stylesheets')));
app.use('/images', express.static(path.join(__dirname, '..', 'browser', 'images')));
// /home/richard/Documents/fullstack_academy/senior/knowyourmacros/public/fonts/Ubuntu-R.ttf
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => {
  res.status(404);
  res.send('404');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.commonType || err.status || 500).send(err.message);
});

conn
  .sync()
  .then(() => {
    app.listen(app.get('port'), () => {
      logger.appStarted(app.get('port'), 'localhost');
    });
  });
