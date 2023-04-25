const router = require('express').Router();
const {User} = require('../models/user');

router.get("/", async (req, res) => {
    const users = await User.find({ isPlayer: true});

  return res.status(200).send({ data: users });
});

module.exports = router;
