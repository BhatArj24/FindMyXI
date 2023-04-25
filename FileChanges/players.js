const router = require('express').Router();
const {User} = require('../models/user');

router.get("/", async (req, res) => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
	const DEFAULT_LIMIT = 8;
    const users = await User.find({ isPlayer: true}).skip(skip).limit(DEFAULT_LIMIT);

  return res.status(200).send({ data: users });
});

module.exports = router;
