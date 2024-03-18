const formData = require('form-data')
const MailGun = require('mailgun.js');
const db = require('../Models/main');
require('dotenv').config();

const mg = new MailGun(formData);
const mailgun = mg.client({
        username: process.env.MAILGUN_USERNAME,
        key: process.env.MAILGUN_APIKEY
    })


    exports.sendMailToOneUser = async(req,res) => {
    try {
        const {userId , mailTitle, mailContent} = req.body;
        if(!userId || !mailTitle || !mailContent){
            res.status(400).send({message: 'user id and mail title and content are required'});
        }
        else{
            const user = await db.User.findOne({where: {
                userId: userId
            }});

            if(!user){
                res.status(400).send({message: 'there is no user with that id'});
            }
            else{
                mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
                    from: `<${process.env.MAILGUN_USER}>`,
                    to: `${user.email}`,
                    subject: `${mailTitle}`,
                    html: `${mailContent}`,
                })
                .then(async(msg) => {
                    await db.NotificationsLog.create({
                        type: 'email',
                        date: new Date(),
                        title: mailTitle,
                        content: mailContent,
                        UserId: user.id
                    });
                    res.status(200).send({message: 'mail send successfully'});
                })
                .catch(error => {
                    res.status(500).send({message: `${error.message} - l`});
                })
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendMailToAllUsers = async(req,res) => {
    try {
        const {mailTitle, mailContent} = req.body;
        if(!mailTitle || !mailContent){
            res.status(400).send({message: 'mail title and content are required'});
        }
        else{
            const allUsers = await db.User.findAll();
            const usersEmails = [];
            const logData = [];
            for (const user of allUsers) {
                usersEmails.push(user.email);
                logData.push({
                    type: 'email',
                    date: new Date(),
                    title: mailTitle,
                    content: mailContent,
                    UserId: user.id
                });
            }
            mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
                from: `<${process.env.MAILGUN_USER}>`,
                to: usersEmails,
                subject: `${mailTitle}`,
                html: `${mailContent}`,
            })
            .then(async(msg) => {
                await db.NotificationsLog.bulkCreate(logData);
                res.status(200).send({message: 'mail send successfully'});
            })
            .catch(error => {
                res.status(500).send({message: `${error.message} - l`});
            })
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}