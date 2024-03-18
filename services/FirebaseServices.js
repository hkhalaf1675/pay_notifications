const FCM = require('fcm-node');
const db = require('../Models/main');
const { Op } = require('sequelize');
require('dotenv').config();

const fcm = new FCM(process.env.FCM_SERVERKEY);

exports.sendFirebaseNotificationToOneUser = async(req,res) => {
    try {
        const {userId, notification_title, notification_body} = req.body;
        if(!userId || !notification_title || !notification_body){
            res.status(400).send({message: 'user id and notification title and body are required'});
        }
        else{
            const user = await db.User.findOne({where: {
                userId: userId
            }});

            if(!user){
                res.status(400).send({message: 'there is no user with that id'});
            }
            else{
                if(!user.fcm_token){
                res.status(400).send({message: 'that user does not have firebase token'});
                }
                else{
                    var message = {
                        to: registration_tokens,
        
                        notification: {
                            title: notification_title,
                            body: notification_body
                        }
                    };
        
                    fcm.send(message, async(error,response) => {
                        if(error){
                            res.status(500).send({message: error.message});
                        }
                        else{
                            await db.NotificationsLog.create({
                                type: 'firebase',
                                date: new Date(),
                                title: mailTitle,
                                content: mailContent,
                                UserId: user.id
                            });

                            res.status(200).json(response); 
                        }
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendFirebaseNotificationToAllUsers = async(req,res) => {
    try {
        const {notification_title, notification_body} = req.body;
        if(!notification_title || !notification_body){
            res.status(400).send({message: 'user id and notification title and body are required'});
        }
        else{
            const allUsers = await db.User.findOne({where: {
                fcm_token: {
                    [Op.ne]: null
                }
            }});

            if(allUsers.length == 0){
                res.status(400).send({message: 'there is no user has firebase token'});
            }
            else{
                for (const user of allUsers) {
                    var message = {
                        to: registration_tokens,
        
                        notification: {
                            title: notification_title,
                            body: notification_body
                        }
                    };
        
                    fcm.send(message, async(error,response) => {
                        if(error){
                            res.status(500).send({message: error.message});
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
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}