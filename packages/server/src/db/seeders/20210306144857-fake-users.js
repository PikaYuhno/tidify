//const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, _) => {
        const generateUsers = async () => {
            let users = [];
            for (let i = 0; i < 10; i++) {
                users.push({
                    username: 'Max_Muster',
                    firstName: 'Max',
                    lastName: 'Mustermann',
                    password: await bcrypt.has("1234", 10),
                    email: 'maxmuster@gmail.com',
                    avatar: 'default-avatar'
                });
            }
            return users;
        }
        await queryInterface.bulkInsert('users', generateUsers(), {});
    },

    down: async (queryInterface, _) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
