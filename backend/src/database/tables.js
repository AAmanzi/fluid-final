import { dropTable } from './utils';
import * as rooms from '../models/Room';

export const initTables = async () => {
  await dropTable(rooms.TABLE_NAME);

  await rooms.initTable();
};
