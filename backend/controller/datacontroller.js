const nodemailer = require("nodemailer");
const stuser = require("../model/user.js");
var bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');


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
      const newUser = new stuser({ username, password: hashedPassword, name });
      await newUser.save();
      res.status(200).send("Account Created Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

// route to user login

module.exports.authenticateLogin = async (req, res) =>{
    
   
    try {
        const {username, password} = req.body;
        
        const user = await stuser.findOne({username});
        
        if (!user) return res.status(400).send('User Not  Found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id },  "secret", { expiresIn: '1m' });
        res.status(200).json({ token });
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

// nodemailer config
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

//   Route send forget password link

module.exports.sendForgetPasswordLink = async (req, res) => {
  const { username } = req.body;
  try {
    const email = await stuser.findOne({ username });
    if (!email) {
      return res.status(400).json("User not found");
    } else {
      return res.status(200).json("Email has been sent");
    }
  } catch (error) {
    console.log(error);
  }
};
