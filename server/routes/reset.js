const router = require('express').Router();
const {User} = require('../models/user');

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
    // const user = await User.find({ email: userEmail});
    User.find({ email: userEmail })
    .then(user => {
      res.status(200).send({ data: user._id });
    })
    .catch(err => {

      res.status(500).send({ message: "No account under this email" });
    })


});

module.exports = router;
