// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const Sequelize = require('sequelize');
const models = require('./server/models');
const logger = require('./config/winston');

Promise = require('bluebird');

Sequelize.Promise = Promise;

models.sequelize
  .authenticate()
  .then(() => {
    logger.debug('SQL Connection has been established successfully.', config.sql.database, " @ ", config.sql.host);
  })
  .catch(err => {
    logger.debug('Unable to connect to the SQL database:', config.sql.database, ' @ ', config.sql.host, err);
  });

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.info(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;
