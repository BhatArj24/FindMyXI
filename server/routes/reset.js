const router = require('express').Router();
const {User} = require('../models/user');

router.get("/:email", async (req, res) => {
    const user = await User.find({ email: req.params.email});

  return res.status(200).send({ data: user._id });
});

module.exports = router;
