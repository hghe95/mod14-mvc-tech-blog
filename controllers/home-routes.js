const router = require(`express`).Router();
// const withAuth = require(`../utils/auth`);
const { Post, User, Comment } = require(`../models`);

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: [`username`]
            }]
        });
        const posts = postData.map((post) => post.get({
            plain: true
        }))
        res.render(`homepage`, {
            posts, loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findbyPk(req.params.id, {
            include: [{
                model: User,
                attributes: [`username`]
            },
            {
                model: Comment,
                include: [User]
            }]
        });
        const post = postData.get({
            plain: true
        });
        res.render(`post-info`, {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch {
        res.status(500).json(error);
    }
});

// router.get('/dashboard', withAuth, async (req, res) => {
//     try {
//         const userData = await User.findbyPk(req.session.user_id, {
//             attributes: { exclude: [`password`] },
//             include: [{model: Post}]
//         });
//         const user = userData.get({
//             plain: true
//         });
//         res.render(`dashboard`, {
//             ...user,
//             loggedIn: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;