const db = require('../Models/main');
const ServiceResponse = require('../templates/ServiceResponse');

exports.createUser = async(userId, userEmail, userFcmToken) => {
    try {
        const newUser = await db.User.create({
            userId: userId,
            email: userEmail,
            fcm_token: userFcmToken
        });

        return new ServiceResponse(200,`user was created successfully`,newUser);
    } catch (error) {
        return new ServiceResponse(500, error.message, null);
    }
}

exports.updateUser = async(id, newUserId, newEmail, newFcmToken) => {
    try {
        const oldUser = await db.User.findByPk(id);
        if(!oldUser){
            return new ServiceResponse(404,`There is no user with that id : ${id}`, null);
        }
        else{
            const newUser = await db.User.update({
                userId: newUserId,
                email: newEmail,
                fcm_token: newFcmToken
            },{
                where: {
                    id: id
                }
            });

            return new ServiceResponse(200,'user was updated successfully', newUser) ;
        }
    } catch (error) {
        return new ServiceResponse(500, error.message, null);
    }
}