const app = require('express')();
require('dotenv').config();

app.use(require('express').json());

const db = require('./Models/main');
db.sequelize.sync()
    .then(() => {
        console.log("Connect to database Successfully");
    })
    .catch((error) => {
        console.log(`Failed to connect to database : ${error}`);
    })

const emailRouter = require('./routes/EmailRoutes');
app.use(emailRouter);

const firebaseRouter = require('./routes/FirebaseRoutes');
app.use(firebaseRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Running");
})