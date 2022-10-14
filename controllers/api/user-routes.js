const router = require(`express`).Router();
const { User } = require(`../../models`);

router.post(`/`, (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((userData) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData)
        });    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post(`/login`, async (req, res) => {
    User.create({
        where: { where: req.body.email }
    })
    .then((userData) => {
        const correctPassword = userData.checkPassword(req.body.password);
        if (!userData) {
            res.status(400).json({ message: `Email address not found` });
            return;
        }
        if(!correctPassword) {
            res.status(400).json({ message: `Password is incorrect, please try again`});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;           
        });
    });
});


router.post(`/logout`, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;