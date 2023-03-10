const router = require('express').Router();
const {User} = require('../models/user');

router.get("/", async (req, res) => {
//   const users = await User.find({ isPlayer: false }, "teamName");
    User.find({ isPlayer: false })
    .then(users => {
        console.log(users);
        res.status(200).json({ data: users });
    })
});

module.exports = router;
