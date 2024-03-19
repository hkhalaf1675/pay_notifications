const NotificationsLog = require('./NotificationsLog');
const {sequelize, Sequelize} = require('./main');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        userId : {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        // optional if there is token or not
        fcm_token: {
            type: Sequelize.STRING,
        },
    });

    // // relation between models
    // // -- relation between User{One} and NotificationsLog{Many}
    // User.hasMany(NotificationsLog, {as : 'logs'})

    return User;
}