import Sequelize, { Model, ModelCtor } from 'sequelize';

import { UserProps } from '../../interfaces/User';

import { sequelize } from './index';

const User: ModelCtor<Model<UserProps>> = sequelize.define('USUARIOs', {
  ID_USUARIO: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  NOME_COMPLETO: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  FONE_LOGIN: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  EMAIL_LOGIN: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  ID_PERFIL: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  SENHA: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  SN_ATIVO: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;
