const router = require('express').Router();

const { sendMail, sendFirebaseNotification } = require('../controllers/MailController');

router.post('/api/mails/send',sendMail);
router.post('/api/firebase/send-notification',sendFirebaseNotification);

module.exports = router;