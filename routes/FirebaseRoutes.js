const router = require('express').Router();

const { sendFirebaseNotificationToOneUser, sendFirebaseNotificationToAllUsers } = require('../controllers/FirebaseController');

router.post('/api/firebase/send-to-one-user', sendFirebaseNotificationToOneUser);
router.post('/api/firebase/send-to-all-users',sendFirebaseNotificationToAllUsers);

module.exports = router;