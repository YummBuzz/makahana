const nodemailer = require("nodemailer");
const stuser = require("../model/user.js");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const adminuser = require("../model/adminuser.js");

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
      const token = jwt.sign({ username }, "secret");
      const newUser = new stuser({
        username,
        password: hashedPassword,
        name,
        isVerified: false,
      });
      await newUser.save();

      // Send verification email
      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: username,
        subject: "Email Verification",
        html: `<p>Click <a href="http://localhost:3800/verify/${token}">here</a> to verify your email</p>`,
      };
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .send("Registration successful. Please verify your email.");
    }
  } catch (err) {
    console.log(err);
  }
};

// Email verification registered account

module.exports.verifyemail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, "secret");
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
    const token = jwt.sign({ userId: user._id }, "secret");
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

    const resetLink = `http://yourdomain.com/reset-password?token=${token}`;
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

// route for reset passowrd
module.exports.resetforgetpassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await stuser.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).send("Invalid or expired token");
    }
    // Update user's password and clear token
    const hashedPassword = await bcrypt.hash(newPassword, 10);
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

    if (!admin)  return res.status(404).send("Admin Not Found!");
  
    const validPassword = await bcrypt.compare(password, admin.password);
    
    if (!validPassword)  return res.status(401).send("Invalid Password");
     
    
    const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY);

    res.status(200).json({ token, message: "Successfully Logged In!", admin });
  } catch (err) {
    console.log(err);
  }
};

// admin auth register

module.exports.authregister = async (req, res) => {
  try {
    const { username, password, accesslevel } = req.body;
    // console.log(req.body)
    let user = await adminuser.findOne({ username: username });
    if (user) {
      res.status(400).send("Username already exists");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new adminuser({
        username,
        password: hashedPassword,
        accesslevel,
      });
      // console.log(newAdmin)
      await newAdmin.save();
      res.status(200).send("User Registered");
    }
  } catch (err) {
    console.log(err);
  }
};

// admin delete another sub-admin  acsess

module.exports.deletesubadmin = async (req, res) => {
  try {
    const { _id } = req.body;
    // console.log(_id)
    const admin = await adminuser.findByIdAndDelete({ _id });
    // console.log(admin)
    res.status(200).send("Deleted Sucessfully");
  } catch (err) {
    console.log(err);
  }
};
