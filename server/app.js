const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

module.exports = app;

require('./configure/app-variables')(app);
require('./oauth')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
