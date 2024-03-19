const FCM = require('fcm-node');
const formData = require('form-data')
const MailGun = require('mailgun.js');
require('dotenv').config();

exports.fcm = new FCM(process.env.FCM_SERVERKEY);


const mg = new MailGun(formData);
exports.mailgun = mg.client({
        username: process.env.MAILGUN_USERNAME,
        key: process.env.MAILGUN_APIKEY
    });
