import Sequelize, { Model, ModelCtor } from 'sequelize';
// interfaces
import { StartupProps } from '../../interfaces/Startup';
import { sequelize } from './index';
// models
import User from './User';

const Startup: ModelCtor<Model<StartupProps>> = sequelize.define('STARTUP', {
  ID_STARTUP: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    references: {
      model: User,
      key: 'ID_USUARIO',
      deferrable: new Sequelize.Deferrable.INITIALLY_DEFERRED(),
    },
  },

  NOME_FANTASIA: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  RAZAO_SOCIAL: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  DT_FUNDACAO: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  CNPJ: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  CAMINHO_FOTO: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  ID_MODELO_NEGOCIO: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_PUBLICO_ALVO: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_MOMENTO: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_SEGUIMENTO_PRINC: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_SEGUIMENTO_SECUN: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_TAMANHO_TIME: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  ID_FATURAMENTO_ANUAL: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  WEBSITE: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  LINKEDIN: {
    type: Sequelize.STRING,
  },

  FACEBOOK: {
    type: Sequelize.STRING,
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
});

export default Startup;
