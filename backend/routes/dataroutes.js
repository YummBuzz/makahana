const routes = require('express').Router();
const datacontroller = require('../controller/datacontroller.js')
const authenticateToken =require('../middleware/auth.js')
// route path for sending forget link

routes.post('/sendForgetLink', datacontroller.sendForgetPasswordLink)

//route to verify the user from forgot password page

// routes.post("/verifyUser", datacontroller.verifyUser);

//update new password after verification  

// routes.put("/changePassword/:id", datacontroller.changePassword);

// create user new account
routes.post('/createAccount', datacontroller.addNewUser);

// login authentication  
routes.post('/loginAuthenticate', datacontroller.authenticateLogin);

// User Profile 
routes.get('/profile',authenticateToken,  datacontroller.userProfile );


module.exports = routes;
