const firebaseServices = require('../services/FirebaseServices');

exports.sendFirebaseNotificationToOneUser = async(req,res) => {
    try {
        firebaseServices.sendMailToOneUser(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendFirebaseNotificationToAllUsers = async(req,res) => {
    try {
        firebaseServices.sendMailToAllUsers(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}