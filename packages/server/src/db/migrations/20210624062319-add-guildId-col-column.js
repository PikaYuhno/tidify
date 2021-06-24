'use strict';
const {DataTypes} = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Columns', 'guildId', {type: DataTypes.INTEGER, allowNull: false})
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Columns', 'guildId', {});
  }
};
