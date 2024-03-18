const router = require('express').Router();

const { sendFirebaseNotificationToOneUser, sendFirebaseNotificationToAllUsers } = require('../controllers/FirebaseController');

router.post('/api/mails/send-to-one-user', sendFirebaseNotificationToOneUser);
router.post('/api/mails/send-to-all-users',sendFirebaseNotificationToAllUsers);

module.exports = router;