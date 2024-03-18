const {sequelize, Sequelize} = require('./main');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
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

    return User;
}