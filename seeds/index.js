const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connections');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedComments();
    await seedPosts();
    await seedUsers();
    process.exit(0);
};

seedAll();