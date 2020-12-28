import { sequelize } from '../../src/app/models/index';

export default async function () {
  await sequelize.truncate({ force: true, cascade: true });
}
