const firebaseServices = require('../services/FirebaseServices');

exports.sendFirebaseNotificationToOneUser = async(req,res) => {
    try {
        const {userId, notification_title, notification_body} = req.body;
        if(!userId || !notification_title || !notification_body){
            res.status(400).send({message: 'user id and notification title and body are required'});
        }
        else{
            response = await firebaseServices.sendFirebaseNotificationToOneUser(userId, notification_title, notification_body);
            if(!response){
                res.status(400).send({message: 'Bad Request'});
            }
            else{
                res.status(response.code).send({message: response.message});
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendFirebaseNotificationToAllUsers = async(req,res) => {
    try {
        const { notification_title, notification_body} = req.body;
        if(!notification_title || !notification_body){
            res.status(400).send({message: 'notification title and body are required'});
        }
        else{
            response = await firebaseServices.sendFirebaseNotificationToAllUsers(notification_title, notification_body);
            if(!response){
                res.status(400).send({message: 'Bad Request'});
            }
            else{
                res.status(response.code).send({message: response.message});
            }
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}