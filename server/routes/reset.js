const router = require('express').Router();
const {User} = require('../models/user');

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
    const user = await User.find({ email: userEmail});
    if (!user) return res.status(404).send({ message: "User not found" });
    return res.status(200).send({ data: user });


});

module.exports = router;
