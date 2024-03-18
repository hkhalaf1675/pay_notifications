const emailServices = require('../services/EmailServices');

exports.sendMailToOneUser = async(req,res) => {
    try {
        emailServices.sendMailToOneUser(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.sendMailToAllUsers = async(req,res) => {
    try {
        emailServices.sendMailToAllUsers(req,res);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}