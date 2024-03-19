const emailServices = require('../services/EmailServices');

exports.sendMailToOneUser = async(req,res) => {
    try {
        const {userId, mailTitle, mailContent} = req.body;
        if(!userId || !mailTitle || !mailContent){
            res.status(400).send({message: 'user id , mail title and content are required'});
        }
        else{
            const response = await emailServices.sendMailToOneUser(userId, mailTitle, mailContent);
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

exports.sendMailToAllUsers = async(req,res) => {
    try {
        const {mailTitle, mailContent} = req.body;
        if(!mailTitle || !mailContent){
            res.status(400).send({message: 'mail title and content are required'});
        }
        else{
            const response = await emailServices.sendMailToAllUsers(mailTitle, mailContent);
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