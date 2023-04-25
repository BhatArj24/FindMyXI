const router = require('express').Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const filterType = req.query.filterType || 'role';
  const searchValue = req.query.searchValue || '';
  const availableSaturday = req.query.availableSaturday === 'true';
  const availableSunday = req.query.availableSunday === 'true';

  const DEFAULT_LIMIT = 8;
  const query = {
    isPlayer: true,
    [filterType]: { $regex: searchValue, $options: 'i' }
  };

  if (availableSaturday && availableSunday) {
    query.availableSat = true;
    query.availableSun = true;
  } else if (availableSaturday) {
    query.availableSat = true;
  } else if (availableSunday) {
    query.availableSun = true;
  }

  const players = await User.find(query)
    .skip(skip)
    .limit(DEFAULT_LIMIT);

  return res.status(200).send({ data: players });
});

module.exports = router;
