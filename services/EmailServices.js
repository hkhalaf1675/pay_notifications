const db = require('../Models/main');
const ServiceResponse = require('../templates/ServiceResponse');
const {mailgun} = require('../config/MessagingConfig')

exports.sendMailToOneUser = async(userId, mailTitle, mailContent) => {
    try {
        const user = await db.User.findOne({where: {
            userId: userId
        }});

        if(!user){
            return new ServiceResponse(404, 'there is no user with that id',null);
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
                return new ServiceResponse(200, 'mail send successfully', null);
            })
            .catch(error => {
                return new ServiceResponse(500, error.message, null);
            })
        }
    } catch (error) {
        return new ServiceResponse(500,error.message, null);
    }
}

exports.sendMailToAllUsers = async(mailTitle,mailContent) => {
    try {
        let usersData = [];
        const pageSize = 50;
        let pageNumber = 1;
        do{
            usersData = await db.User.findAll({
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize
            });

            const usersEmails = [];
            const logData = [];
            for (const user of usersData) {
                usersEmails.push(user.email);
                logData.push({
                    type: 'email',
                    date: new Date(),
                    title: mailTitle,
                    content: mailContent,
                    UserId: user.id
                });
            }

            await mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
                from: `<${process.env.MAILGUN_USER}>`,
                to: usersEmails,
                subject: `${mailTitle}`,
                html: `${mailContent}`,
            })
            .then(async(msg) => {
                await db.NotificationsLog.bulkCreate(logData);
                return new ServiceResponse(200,'mail send successfully',null);
            })
            .catch(error => {
                return new ServiceResponse(500,error.message,null);
            });

            pageNumber++;
        }
        while(usersData.length > 0)
    } catch (error) {
        return new ServiceResponse(500,error.message,null);
    }
}