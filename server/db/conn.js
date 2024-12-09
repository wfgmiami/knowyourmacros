const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('./config.js')[env];

if (config.use_env_variable) {
  module.exports = new Sequelize(process.env[config.use_env_variable]);
} else {
  console.log('connecting to AWS db', config.database);
  module.exports = new Sequelize(config.database, config.username, config.password, config);
}

