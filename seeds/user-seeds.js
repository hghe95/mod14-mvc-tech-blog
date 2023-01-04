const { User } = require('../models');

const userData = [{
        username: 'Freddy',
        password: 'password123'

    },
    {
        username: 'Francine',
        password: 'hitrow92'
    },
    {
        username: 'Franklin',
        password: '2chainz'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;