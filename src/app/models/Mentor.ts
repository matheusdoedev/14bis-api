import Sequelize, { Model, ModelCtor } from 'sequelize';

import { MentorProps } from '../../interfaces/Mentor';
import { sequelize } from './index';

import User from './User';

const Mentor: ModelCtor<Model<MentorProps>> = sequelize.define('MENTOR', {
  ID_MENTOR: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'ID_USUARIO',
      deferrable: new Sequelize.Deferrable.INITIALLY_DEFERRED(),
    },
  },

  CPF: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  DT_NASCIMENTO: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  SEXO: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  CEP: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ENDERECO: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  UF: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  CIDADE: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  FONE_FIXO: {
    type: Sequelize.STRING,
  },

  FONE_CELULAR: {
    type: Sequelize.STRING,
  },

  LINKEDIN: {
    type: Sequelize.STRING,
  },

  ESCOLARIDADE: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ID_AREA_ATUACAO: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  CURRICULO_RESUMIDO: {
    type: Sequelize.STRING,
  },

  CAMINHO_FOTO: {
    type: Sequelize.STRING,
  },
});

export default Mentor;
