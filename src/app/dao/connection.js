'use strict';
const knex = require('knex');
const configuration = require('../../config/knexfile');

const connection = knex(configuration.production);

module.exports = connection;