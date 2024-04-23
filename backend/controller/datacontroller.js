const nodemailer = require("nodemailer");
const stuser = require("../model/user.js");
var bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
  try {
    let user = await stuser.findOne({ username: username });
    if (user) {
      res.status(400).send("Username already exists");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ username }, 'secret');
      const newUser = new stuser({ username, password: hashedPassword, name ,isVerified: false });
      await newUser.save();
    
    // Send verification email
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: username,
        subject: 'Email Verification',
        html: `<p>Click <a href="http://localhost:3800/verify/${token}">here</a> to verify your email</p>`
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send('Registration successful. Please verify your email.');
    }
  } catch (err) {
    console.log(err);
  }
};

// Email verification registered account 

module.exports.verifyemail =async (req,res)=>{
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.username;
        // Update user's verification status
        await stuser.findOneAndUpdate({ username:email }, { $set: { isVerified: true } });
        
        res.status(200).send('Your email has been verified!');
      } catch (error) {
        console.error(error);
        res.status(400).send('Invalid or expired token');
      }
}

// route to user login

module.exports.authenticateLogin = async (req, res) =>{
    
   
    try {
        const {username, password} = req.body;
        
        const user = await stuser.findOne({username});
        
        if (!user) return res.status(400).send('User Not  Found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).send('Invalid password' );
        }
        if (!user.isVerified) {
            return res.status(401).send('Email not verified');
          }
        const token = jwt.sign({ userId: user._id },  "secret");  
        // , { expiresIn: '1m' }
        res.status(200).json({ token,message:"Successfully Logged In!" });
    }catch(error){
        console.log(error)
    }
}

//Route  user  profile 
module.exports.userProfile=async (req,res)=>{
    try {
        const userId = req.user.userId;
        const user = await stuser.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

}



//   Route send forget password link

module.exports.sendForgetPasswordLink = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await stuser.findOne({ username });
    if (!user) {
      return res.status(400).json("User not found");
    } 
    const token = crypto.randomBytes(20).toString('hex');
    const expiryTime = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    // Save token and expiry time in database
    // await user.findOneAndUpdate({ username }, { resetToken: token, resetTokenExpiry: expiryTime });
    user.resetToken = token;
    user.resetTokenExpiry = expiryTime;
    await user.save();

    const resetLink = `http://yourdomain.com/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: username,
      subject: 'Forget Password Link',
      html: `Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });

  } catch (error) {
    console.log(error);
  }
};
