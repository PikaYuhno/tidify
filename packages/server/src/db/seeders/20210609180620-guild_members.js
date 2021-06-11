'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', Array.from({length: 10}, (v, k) => k).map((k, i) => ({
        username: `Max_Muster_${i}`,
        firstName: 'Max',
        lastName: 'Mustermann',
        password: await bcrypt.hash("1234", 10),
        email: `maxmuster${i}@gmail.com`,
        avatar: 'default-avatar'
                
    })), {returning: true}).then(users => {
        return query
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
