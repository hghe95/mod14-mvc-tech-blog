const { Comment } = require('../models');

const commentData = [{
        comment_text: "OMG I love this!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Seriously? Who cares?",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This is great!",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;