const nodemailer = require('nodemailer');
const FCM = require('fcm-node');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.SECURE,
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

exports.sendMail = async(req,res) => {
    try {
        const {mailSubject,mailText,usersAddresses} = req.body;
        if(!mailSubject || !mailText || !usersAddresses){
            res.status(400).send({message: 'mail subject , mail text, and users addresses are required'});
        }
        else{
            const info = await transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: usersAddresses,
                subject: mailSubject,
                text: mailText,
            });
    
            res.status(200).send({message: info.messageId});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const fcm = new FCM(process.env.FCM_SERVERKEY);

exports.sendFirebaseNotification = async(req,res) => {
    try {
        const {registration_tokens, notification_title, notification_body} = req.body;
        if(!registration_tokens || !notification_title || !notification_body){
            res.status(400).send({message: 'registration tokens and notification title and body are required'});
        }
        else{
            var message = {
                to: registration_tokens,

                notification: {
                    title: notification_title,
                    body: notification_body
                }
            };

            fcm.send(message, (error,response) => {
                if(error){
                    res.status(500).send({message: error.message});
                }
                else{
                    res.status(200).json(response); 
                }
            })

        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}