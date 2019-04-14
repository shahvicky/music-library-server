const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(8080),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  JWT_EXPIRATION: Joi.number().integer(),
  SQL_DB: Joi.string()
    .description('SQL DB').default("mysql"),
  SQL_HOST: Joi.string()
    .description('SQL DB Hostname').default("localhost"),
  SQL_PORT: Joi.number()
    .default(3306),
  SQL_USERNAME: Joi.string()
    .description('Username to connect to SQL Database').default("root"),
  SQL_PASSWORD: Joi.string()
    .description('Password to connect to SQL Database').default("root"),
  SQL_DB_NAME: Joi.string()
    .description('Database name in the SQL DB').default("music"),
  LAST_FM_URL_ROOT: Joi.string().required(),
  LAST_FM_API_KEY: Joi.string().alphanum().required()
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpire: envVars.JWT_EXPIRATION,
  sql: {
    dialect: envVars.SQL_DB,
    host: envVars.SQL_HOST,
    port: envVars.SQL_PORT,
    username: envVars.SQL_USERNAME,
    password: envVars.SQL_PASSWORD,
    database: envVars.SQL_DB_NAME
  },
  lastfm: {
    baseURL: envVars.LAST_FM_URL_ROOT,
    apiKey: envVars.LAST_FM_API_KEY
  }
};

module.exports = config;
