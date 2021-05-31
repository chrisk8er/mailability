require('dotenv').config();

const promise = require('bluebird');

const options = {
	promiseLib: promise,
};

const pgp = require('pg-promise')(options);

pgp.pg.defaults.ssl = {
	rejectUnauthorized: false,
};

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const db = pgp(isProduction ? process.env.DATABASE_URL : connectionString);

module.exports = { db };
