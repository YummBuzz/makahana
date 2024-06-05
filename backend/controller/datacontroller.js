const nodemailer = require("nodemailer");
const stuser = require("../model/user.js");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const adminuser = require("../model/adminuser.js");
const stproduct =require('../model/product.js')

const instance = require('../server.js')
const crypto =require('crypto')
const payment = require('../model/payment.js')

// nodemailer config
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// route to create new  user  account
module.exports.addNewUser = async (req, res) => {
  const { username, password, name } = req.body;
  const user = await stuser.findOne({ username });
  try {
    if (user) {
      return res.status(400).send("Username already exists");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ username }, process.env.SECRET_KEY);
      let newUser = new stuser({
        username,
        password: hashedPassword,
        name,
        isVerified: false,
      });
      // console.log(newUser)
      await newUser.save();

      // Send verification email
      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: username,
        subject: "Email Verification",
        html: `<p>Click <a href="http://localhost:3800/verify/${token}">here</a> to verify your email</p>`,
      };
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .send("Registration successful. Please verify your email.");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// Email verification registered account

module.exports.verifyemail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.username;
    // Update user's verification status
    await stuser.findOneAndUpdate(
      { username: email },
      { $set: { isVerified: true } }
    );

    res.status(200).send("Your email has been verified!");
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid or expired token");
  }
};

// route to user login

module.exports.authenticateLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await stuser.findOne({ username });

    if (!user) return res.status(404).send("User Not  Found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    if (!user.isVerified) {
      return res.status(401).send("Email not verified");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    // , { expiresIn: '1m' }
    res.status(200).json({ token, message: "Successfully Logged In!" });
  } catch (error) {
    console.log(error);
  }
};

//Route  user  profile
module.exports.userProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await stuser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//   Route send forget password link

module.exports.sendForgetPasswordLink = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await stuser.findOne({ username });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expiryTime = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    // Save token and expiry time in database
    // await user.findOneAndUpdate({ username }, { resetToken: token, resetTokenExpiry: expiryTime });
    user.resetToken = token;
    user.resetTokenExpiry = expiryTime;
    await user.save();

    const resetLink = `${process.env.URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: username,
      subject: "Forget Password Link",
      html: `Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// all users api

module.exports.getallusers = async (req, res) => {
  const {id} =req.query
 
  try {
    const user = await stuser.find();
    const userCount = await stuser.countDocuments();

   
    // if(req.query){
     
      const userDetail =await stuser.findById(id)
      // res.status(200).send(userDetail);
     
    // }
    res.status(200).json({ user, userCount,userDetail });
  } catch (err) {
    console.log(err);
  }
};

// active user within week or month

module.exports.activeuser = async (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const usersWeek = await stuser.find({ createdAt: { $gte: weekAgo } });
    const usersMonth = await stuser.find({ createdAt: { $gte: monthAgo } });
    const usersWeekCount = await stuser.countDocuments({
      createdAt: { $gte: weekAgo },
    });
    const usersMonthCount = await stuser.countDocuments({
      createdAt: { $gte: monthAgo },
    });

    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    // Query to count users registered in the past week
    const currentWeekCount = await stuser.countDocuments({
      createdAt: { $gte: oneWeekAgo, $lte: currentDate },
    });

    // Query to count users registered in the week before the past week
    const previousWeekCount = await stuser.countDocuments({
      createdAt: {
        $gte: new Date(oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
        $lt: oneWeekAgo,
      },
    });

    // Compare counts to determine increase or decrease

    const increaseCount = currentWeekCount - previousWeekCount;
   
    const decreaseCount = previousWeekCount - currentWeekCount;
    const sameCount = Math.min(currentWeekCount, previousWeekCount);



    const totalCount = currentWeekCount + previousWeekCount;
    const increasePercentage = (increaseCount / totalCount) * 100;
    const decreasePercentage = (decreaseCount / totalCount) * 100;

    // console.log(increaseCount)
    // console.log(totalCount)
    // console.log(sameCount)


    let trend = "";
    let count = 0;
    let percentage = 0;

    if (increaseCount > decreaseCount) {
      trend = "increase";
      count = increaseCount;
      percentage = increasePercentage;
  } else if (decreaseCount > increaseCount) {
      trend = "decrease"; 
      count = decreaseCount;
      percentage = decreasePercentage;
  } else {
      trend = "no_change";
  }
  
  


  // month percentage of users

  monthAgo.setDate(monthAgo.getDate() - 30);

const currentMonthCount = await stuser.countDocuments({
  createdAt: { $gte: monthAgo, $lte: currentDate },
});

const previousMonthCount = await stuser.countDocuments({
  createdAt: {
    $gte: new Date(monthAgo.getTime() - 30 * 24 * 60 * 60 * 1000),
    $lt: monthAgo,
  },
});

const increaseMonthCount = currentMonthCount - previousMonthCount;
const decreaseMonthCount = previousMonthCount - currentMonthCount;
const sameMonthCount = Math.min(currentMonthCount, previousMonthCount);

const totalMonthCount = currentMonthCount + previousMonthCount;
const increaseMonthPercentage = (increaseMonthCount / totalMonthCount) * 100;
const decreaseMonthPercentage = (decreaseMonthCount / totalMonthCount) * 100;



let monthtrend = "";
let monthcount = 0;
let monthpercentage = 0;

if (increaseMonthCount > decreaseMonthCount) {
  monthtrend = "increase";
  monthcount = increaseMonthCount;
  monthpercentage = increaseMonthPercentage;
} else if (decreaseMonthCount > increaseMonthCount) {
  monthtrend = "decrease";
  monthcount = decreaseMonthCount;
  monthpercentage = decreaseMonthPercentage;
} else {
  monthtrend = "no_change";
}

// console.log(monthtrend)

   
    const data = {
      usersWeek,
      usersWeekCount,
      usersMonth,
      usersMonthCount,
      trend,
      count,
      percentage,
      monthpercentage,monthtrend,monthcount
    };

    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// route for reset passowrd

module.exports.resetforgetpassword = async (req, res) => {
  const  password  = req.body.formData.password;
  const token =req.body.token
 

  try {
    const user = await stuser.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).send("Invalid or expired token");
      return
    }

    // Update user's password and clear token
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// admin auth routes -----!




// admin auth login

module.exports.authlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await adminuser.findOne({ username });

    if (!admin) return res.status(404).send("Admin Not Found!");

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) return res.status(401).send("Invalid Password");

    const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });

    admin.loginTime = new Date();
    await admin.save();

    res.status(200).json({ token, message: "Successfully Logged In!" });
  } catch (err) {
    console.log(err);
  }
};

// admin profile route

module.exports.adminProfile = async (req, res) => {
  try {
    const adminId = req.admin.adminId;
    // console.log(req.admin)

    const admin = await adminuser.findById(adminId);

    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// admin auth register

module.exports.authregister = async (req, res) => {
  try {
    const { username, password, accesslevel } = req.body;

    let user = await adminuser.findOne({ username: username });
    if (user) {
      res.status(400).send("Admin already exists");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new adminuser({
        username,
        password: hashedPassword,
        accesslevel,
      });
      // // console.log(newAdmin)
      await newAdmin.save();
      res.status(200).send(" Registered Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

// admin delete another sub-admin  acsess

module.exports.deletesubadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminuser.findById(id);
    // console.log(admin.id)

    if (admin.accesslevel == "Main-Admin") {
      return res.status(403).send("Main admin cannot be deleted");
    }
      await adminuser.findByIdAndDelete(id);
   
    res.status(200).send("Deleted Sucessfully");
  } catch (err) {
    console.log(err);
  }
};

// get all admin data api

module.exports.admindata = async (req, res) => {
  try {
    const admins = await adminuser.find();
    res.json(admins);
  } catch (err) {
    console.log(err);
  }
};


// admin last login api
module.exports.activity =async(req,res)=>{
  const {userId} =req.body
  try{
    const user = await adminuser.findOne({username:userId});
    if(user){
      user.loginTime = Date.now();
      await user.save();
      return res.status(200).json({ message: 'User activity updated successfully' });
    }
    return res.status(404).json({ message: 'User not found' });



  }
  catch(err){
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });

  }
}

// get all product api 
module.exports.getproduct = async(req,res)=>{
  try{
    const products= await stproduct.find();
    res.status(200).send(products)
  }
  catch(err){
    console.log(err)
  }
}


// Payment module  

module.exports.createorder=async(req,res)=>{

  try{
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });


  }
  catch(err){
    console.log(err)
  }
}

module.exports.paymentverification=async(req,res)=>{
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
  .update(body.toString())
  .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;

if (isAuthentic) {
  // Database comes here

  await payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    
  });

  res.redirect(
    `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  );
} else {
  res.status(400).json({
    success: false,
  });
}

  }
  catch(err){
    console.log(err)

  }
}











