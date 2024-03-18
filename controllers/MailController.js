const mailServices = require('../services/MailServices');

exports.sendMail = async(req,res) => {
    try {
        mailServices.sendMail(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendFirebaseNotification = async(req,res) => {
    try {
        mailServices.sendFirebaseNotification(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}