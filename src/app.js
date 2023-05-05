const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database/model');
const router = require('./routes/router');
const HttpError = require('./utils/httpError');
const { ERRORS } = require('./utils/httpResponses');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(router);

app.use((error, req, res) => {
  if (error instanceof HttpError) {
    return res.status(error.code).json({
      error: error.message,
    });
  }
  return res.status(ERRORS.SERVER_ERROR.STATUS).json({
    error: ERRORS.SERVER_ERROR.MESSAGE,
  });
});

module.exports = app;
