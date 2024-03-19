const { createUser, updateUser } = require('../controllers/UsersControllers');

const router = require('express').Router();

router.post('/api/users/create', createUser);
router.put('/api/users/update', updateUser);

module.exports = router;