"use strict";
const fs = require('fs');
const path = require('path');
const Sequelize =  require('sequelize');
const config=  require('./../../config/config');
const logger = require('./../../config/winston');

var basename  = path.basename(__filename);
var db = {};

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

Sequelize.Promise = Promise;

//connect to sequelize using env variables
const database = config.sql.database;
const username = config.sql.username;
const password = config.sql.password;
const host = config.sql.host;
const port = config.sql.port;
const dialect = config.sql.dialect;
const sequelize =  new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  operatorsAliases: false,
  logging: true,
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//Load all the models in the model directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 * This function should be used only once to create the tables in the database.
 * This will drop all the tables present in the database with the models defined create new table schema
 */
(async function newFunction() {
  await sequelize.sync();
})();

//Export Sequelize

Sequelize.Promise.onPossiblyUnhandledRejection(() => logger.debug('Catched in local'));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;