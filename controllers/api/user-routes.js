const router = require(`express`).Router();
const { User } = require(`../../models`);

router.post(`/`, (req, res) => {
    User.create({
        username: req.body.username,
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
    User.findOne({
        where: { username: req.body.username }
    })
    .then((userData) => {
        const correctPassword = userData.checkPassword(req.body.password);
        if (!userData) {
            res.status(400).json({ message: `Username or Password is incorrect, , please try again` });
            return;
        }
        if(!correctPassword) {
            res.status(400).json({ message: `Username or Password is incorrect, please try again`});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);           
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

router.delete(`/:id`, (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then (userData => {
        if (!userData) {
            res.status(404).json({ message: `Error: No user has this id..` })
        }
        res.json(userData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;