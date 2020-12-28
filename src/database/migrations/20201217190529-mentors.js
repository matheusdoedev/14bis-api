'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('MENTORs', {
      ID_MENTOR: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
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
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MENTORs');
  },
};
