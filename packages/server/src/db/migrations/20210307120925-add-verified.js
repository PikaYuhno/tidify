const {DataTypes} = require('sequelize');

module.exports = {
    up: async (queryInterface, _) => {
        await queryInterface.addColumn('users', 'verified', {type: DataTypes.BOOLEAN, defaultValue: false})

    },

    down: async (queryInterface, _) => {
        await queryInterface.removeColumn('users', 'verified', {});
    }
};
