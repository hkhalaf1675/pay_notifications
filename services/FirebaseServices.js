const db = require('../Models/main');
const { Op } = require('sequelize');
const ServiceResponse = require('../templates/ServiceResponse');
const {fcm} = require('../config/MessagingConfig');

exports.sendFirebaseNotificationToOneUser = async(userId, notification_title, notification_body) => {
    try {
        const user = await db.User.findOne({where: {
            userId: userId
        }});

        if(!user){
            return new ServiceResponse (400,'there is no user with that id',null)
        }
        else{
            if(!user.fcm_token){
                return new ServiceResponse (400,'that user does not have firebase token',null)
            }
            else{
                var notification_message = {
                    to: user.fcm_token,
    
                    notification: {
                        title: notification_title,
                        body: notification_body
                    }
                };
    
                fcm.send(notification_message, async(error,response) => {
                    if(error){
                        return new ServiceResponse (500,error.message,null)
                    }
                    else{
                        await db.NotificationsLog.create({
                            type: 'firebase',
                            date: new Date(),
                            title: mailTitle,
                            content: mailContent,
                            UserId: user.id
                        });

                        return new ServiceResponse (200,'notifications send successfully',null)
                    }
                });
            }
        }
    } catch (error) {
        return new ServiceResponse (500,error.message,null)
    }
}

exports.sendFirebaseNotificationToAllUsers = async(notification_title, notification_body) => {
    try {
        let usersData = [];
        const pageSize = 50;
        let pageNumber = 1;
        do{
            usersData = await db.User.findOne({where: {
                fcm_token: {
                    [Op.ne]: null
                }
            }},{
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize
            });

            if(!usersData || usersData.length == 0){
                return new ServiceResponse (400,'there is no user has firebase token',null);
            }
            else{
                for (const user of usersData) {
                    var notification_message = {
                        to: user.fcm_token,
        
                        notification: {
                            title: notification_title,
                            body: notification_body
                        }
                    };
        
                    fcm.send(notification_message, async(error,response) => {
                        if(error){
                            return new ServiceResponse (500, error.message, null);
                        }
                        else{
                            await db.NotificationsLog.create({
                                type: 'firebase',
                                date: new Date(),
                                title: mailTitle,
                                content: mailContent,
                                UserId: user.id
                            });
                        }
                    });
                }
            }
        }while(usersData.length > 0)
    } catch (error) {
        return new ServiceResponse (500, error.message, null);
    }
}