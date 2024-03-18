const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize,Sequelize);
db.NotificationsLog = require('./NotificationsLog')(sequelize,Sequelize);

// relation between models
// -- relation between User{One} and NotificationsLog{Many}
db.User.hasMany(db.NotificationsLog, {as: 'logs'});
db.NotificationsLog.belongsTo(db.User);

module.exports = db;