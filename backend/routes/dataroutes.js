const routes = require('express').Router();
const datacontroller = require('../controller/datacontroller.js')
const authenticateToken =require('../middleware/auth.js')
// route path for sending forget link

routes.post('/sendForgetLink', datacontroller.sendForgetPasswordLink)

//route to verify the user from forgot password page

// routes.post("/verifyUser", datacontroller.verifyUser);

// reset password with reset password link

routes.post("/resetPassword", datacontroller.resetforgetpassword);

// create user new account
routes.post('/createAccount', datacontroller.addNewUser);

// login authentication  
routes.post('/loginAuthenticate', datacontroller.authenticateLogin);

// User Profile 
routes.get('/profile',authenticateToken,  datacontroller.userProfile );

// verify acoount email
routes.get('/verify/:token',datacontroller.verifyemail);


module.exports = routes;
