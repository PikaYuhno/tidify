const {DataTypes} = require('sequelize');

module.exports = {
    up: async (queryInterface, _) => {
        await queryInterface.addColumn('users', 'locked', {type: DataTypes.BOOLEAN, defaultValue: false})
        await queryInterface.addColumn('users', 'role', {type: DataTypes.STRING(255), defaultValue: 'user'})

    },

    down: async (queryInterface, _) => {
        await queryInterface.removeColumn('users', 'locked', {});
        await queryInterface.removeColumn('users', 'role', {});
    }
};
