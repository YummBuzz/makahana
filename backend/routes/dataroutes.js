const routes = require('express').Router();
const datacontroller = require('../controller/datacontroller.js')
const authenticateToken =require('../middleware/auth.js')
const adminAuthenticateToken =require('../middleware/admin.js')
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

// get all user 
routes.get('/alluser', datacontroller.getallusers);

// get activer user
 routes.get('/activeuser',datacontroller.activeuser)

// verify acoount email
routes.get('/verify/:token',datacontroller.verifyemail);

// admin login 
routes.post('/adminlogin',datacontroller.authlogin)

// admin Profile 
routes.get('/adminprofile',adminAuthenticateToken,datacontroller.adminProfile );


// admin register
routes.post('/adminregister',datacontroller.authregister)

// delete register admin
routes.delete('/deleteadmin/:id',datacontroller.deletesubadmin)

//  admins data 
routes.get("/getalladmin",datacontroller.admindata)

// admin last activity api
routes.post('/admin/activity',datacontroller.activity)

// get product api  

routes.get('/products',datacontroller.getproduct)


// payment routes api

// for create api for paymnet routes
routes.post('/create-order',datacontroller.createorder)

// for payment verification 
routes.post('/paymentverification',datacontroller.paymentverification)


module.exports = routes;
