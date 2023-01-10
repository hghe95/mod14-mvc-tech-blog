const router = require(`express`).Router();
const { Post, User } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

router.post(`/`, withAuth, (req,res) => {
    Post.create({ title: req.body.title, content: req.body.content, user_id: req.session.user_id })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put(`/:id`, withAuth, (req, res) => {
    Post.update({
        comment_text: req.body.comment_text
    },
    {
        where: { id: req.params.id }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: `Error: Post not found` });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.delete(`/:id`, withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then (postData => {
        if (!postData) {
            res.status(404).json({ message: `Error: Post not found.` })
        }
        res.json(postData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get(`/`, (req, res) => {
    Post.findAll({ attributes: [`id`, `title`, `created_at`, `content`],
    order: [[`created_at`, `DESC`]],
    include: [{
        model: User,
        attributes: [`username`]
    },
    {
        model: Comment,
        attributes: [`id`, `comment_text`, `post_id`, `user_id`],
        include: {
            model: User,
            attributes: [`username`]
        }
    }]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get(`/:id`, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: [
            `id`,
            `title`,
            `created_at`,
            `post_content`
        ],
        include: [
            {
                model: User,
                attributes: [`username`]
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: `There is no post associated with this id` });
            return
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;