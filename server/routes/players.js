const router = require('express').Router();
const {User} = require('../models/user');

router.get("/", async (req, res) => {
//   const users = await User.find({ isPlayer: true}, ...{});
    const users = await User.find({ isPlayer: true});
//   console.log("hi:"+users);
  return res.status(200).send({ data: users });
});

module.exports = router;
