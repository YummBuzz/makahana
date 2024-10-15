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

// get product random 

routes.get('/randomproducts',datacontroller.getrandomlyproducts)

// get product by size

routes.post('/productbysize',datacontroller.sizeProduct);


// product for backend

routes.get('/dataproducts',datacontroller.productData)

// get product detail 
 routes.get('/products/:id',datacontroller.productdetail)



// payment routes api

// for create api for paymnet routes
routes.post('/create-order',datacontroller.createorder)

// for payment verification 
routes.post('/paymentverification',datacontroller.paymentverification)

// get orders data
routes.get('/orderdata',datacontroller.orderData)

// message via contact form
routes.post('/message',datacontroller.message)

// to get all msg

routes.get('/allmessage',datacontroller.getmsg)

// to get user order
routes.post('/userorders', datacontroller.userOrders)
// to delete user data
routes.delete('/deleteuser', datacontroller.deleteData)

// acc to date fetch order
routes.get('/packedorder',datacontroller.packedorders)
routes.get('/unpackedorder',datacontroller.unpackedorders)

// order status

routes.put('/statusorder/:id',datacontroller.orderstatus)

// latest order
routes.get('/getorder',datacontroller.latestorder)

// top selling products 
routes.get('/topselling',datacontroller.topproducts)


module.exports = routes;
