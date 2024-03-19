const {sequelize, Sequelize} = require('./main');
const User = require('./User');

module.exports = (sequelize, Sequelize) => {
    const NotificationsLog = sequelize.define('NotificationsLog', {
        type: {
            type: Sequelize.ENUM('email', 'firebase'),
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // // relation between models
    // // -- relation between User{One} and NotificationsLog{Many}
    // NotificationsLog.belongsToMany(User);

    return NotificationsLog;
}