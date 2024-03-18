const {sequelize, Sequelize} = require('./main');

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

    return NotificationsLog;
}