import { sequelize } from '../../src/app/models/index';

export default function () {
  Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({
        truncate: true,
        cascade: true,
        force: true,
      });
    })
  );
}
