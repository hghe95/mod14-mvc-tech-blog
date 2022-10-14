const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
const { Post, User, Comment } = require(`../models`);
const sequelize = require(`../config/connections`);

router.get(`/`, withAuth, (reg, res) => {
    try {
        
    } catch {

    }
})

module.exports = router;