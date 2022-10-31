const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
const { Post, User, Comment } = require(`../models`);
const sequelize = require(`../config/connections`);

router.get(`/`, withAuth, (req, res) => {
    Post.findAll({
        where: { user_id: requestAnimationFrame.session.user_id },
        attributes: [ `id`, `title`, `content`, `created_at`],
        include: [{
            model: Comment,
            attributes: [ `id`, `title`, `content`, `created_at`],
            include: {
                model: User,
                attributes: [`username`]
            }
        },
        {
            model: User,
            attributes: [`username`]
        }]
    })
    .then(postData => {
        const posts = [];
        if (postData.length == 1) {
            const title = postData[0].dataValues.title;
            const date = postData[0].dataValues.created_at;
            const postID = postData[0].dataValues.id;
            const content = postData[0].dataValues.content;
            posts.push({ postID, title, content, date });
        } else {
            postData.forEach((post) => {
                const title = postData[0].dataValues.title;
                const date = postData[0].dataValues.created_at;
                const postID = postData[0].dataValues.id;
                const content = postData[0].dataValues.content;
                posts.push({ postID, title, content, date });
            });
        }
        res.render(`dashboard`, {
            posts,
            loggedIn: req.session.LoggedIn,
            username: req.session.username
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;