import Knex from 'knex';

import { initTables } from './tables';

const config = require('../../knexfile.js');

const client = Knex(config);

export default client;

export const initDatabase = async () => {
  await client.migrate.latest();

  await initTables();
  console.log('Purged DB');
};
