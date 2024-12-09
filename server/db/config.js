const logger = require('./logger');

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'kym',
    host: 'localhost',
    dialect: 'postgres',
    logging: logger
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'kym_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.RDS_USERNAME || '',
    password: process.env.RDS_PASSWORD || '',
    database: process.env.RDS_DB_NAME || '',
    host: process.env.RDS_HOSTNAME || '',
    port: process.env.RDS_PORT || '5432',
    dialect: 'postgres'
  }
};
