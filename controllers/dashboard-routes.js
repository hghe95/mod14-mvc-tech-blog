const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
const { Post, User, Comment } = require(`../models`);
const sequelize = require(`../config/connections`);

router.get(`/`, withAuth, (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
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

router.get(`/edit/:id`, withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: [`id`, `title`, `content`, `user_id`],
        include: [
            { 
                model: Comment,
                attributes: [`id`, `comment_text`, `post_id`, `user_id`, `created_at`],
                include: { model: User, attributes: [`username`]}
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: `Post ID does not exist` });
            return;
        }
        const post = postData.get({ plain: true });
        res.render(`edit-post`, { post, loggedIn: true });
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

router.get(`/new`, withAuth, (req, res) => {
    res.render(`new-post`);
});

module.exports = router;