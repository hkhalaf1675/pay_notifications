const router = require('express').Router();

const { sendMailToOneUser, sendMailToAllUsers } = require('../controllers/EmailControllers');

router.post('/api/mails/send-to-one-user',sendMailToOneUser);
router.post('/api/mails/send-to-all-users',sendMailToAllUsers);

module.exports = router;