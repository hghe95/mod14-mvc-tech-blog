const router = require(`express`).Router();
const { Post } = require(`../../models`);
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

module.exports = router;