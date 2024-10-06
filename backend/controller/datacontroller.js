const nodemailer = require("nodemailer");
const stuser = require("../model/user.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const adminuser = require("../model/adminuser.js");
const stproduct = require("../model/product.js");
const stmsg = require("../model/message.js");
const Razorpay = require("razorpay");
// const instance = require('../server.js')
const crypto = require("crypto");
const payment = require("../model/order.js");
const order = require("../model/order.js");
const ObjectId = require('mongoose').Types.ObjectId;

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
        html: `<p>Click <a href="${process.env.HOST_URL}/verify/${token}">here</a> to verify your email</p>`,
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
  const { id } = req.query;

  try {
    const user = await stuser.find();
    const userCount = await stuser.countDocuments();

    // if(req.query){

    const userDetail = await stuser.findById(id);
    // res.status(200).send(userDetail);

    // }
    res.status(200).json({ user, userCount, userDetail });
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
    const increaseMonthPercentage =
      (increaseMonthCount / totalMonthCount) * 100;
    const decreaseMonthPercentage =
      (decreaseMonthCount / totalMonthCount) * 100;

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

  

    // products count
    const productscount =await stproduct.countDocuments()

    const data = {
      usersWeek,
      usersWeekCount,
      usersMonth,
      usersMonthCount,
      trend,
      count,
      percentage,
      monthpercentage,
      monthtrend,
      monthcount,
      productscount
    };

    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// route for reset passowrd

module.exports.resetforgetpassword = async (req, res) => {
  const password = req.body.formData.password;
  const token = req.body.token;

  try {
    const user = await stuser.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).send("Invalid or expired token");
      return;
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
module.exports.activity = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await adminuser.findOne({ username: userId });
    if (user) {
      user.loginTime = Date.now();
      await user.save();
      return res
        .status(200)
        .json({ message: "User activity updated successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get all product api
module.exports.getproduct = async (req, res) => {
 
  try {
    const { page = 1, pageSize = 6, brand, minPrice, maxPrice, sort } = req.query;

    // Query parameters
    let query = {};
    if (req.query.brand && req.query.brand !== 'all') {
      query = { brand: req.query.brand };
      // console.log(query)
  }

   
    let sortOption = {};

if (sort === 'lowToHigh') {
  sortOption.price = 1; // Ascending sort by price
} else if (sort === 'highToLow') {
  sortOption.price = -1; // Descending sort by price
} else if (sort === 'aToZ') {
  sortOption.name = 1; // Ascending sort by name
} else if (sort === 'zToA') {
  sortOption.name = -1; // Descending sort by name
} else {
  sortOption._id = 1; // Default sorting by _id (or any other default)
}

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const totalCount = await stproduct.countDocuments(query);
    const totalPages = Math.ceil(totalCount / parseInt(pageSize));

    const products = await stproduct.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(pageSize));

    res.status(200).json({ products, currentPage: parseInt(page), totalPages, totalCount });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// random product fetch

module.exports.getrandomlyproducts = async (req, res) => {
  const randomProducts = await stproduct.aggregate([{ $sample: { size: 8 } }]);
  res.json(randomProducts);
};

// product detail get of a specific product

module.exports.productdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await stproduct.findById(id);
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
// product fetch by size

module.exports.sizeProduct = async (req, res) => {
 
    const { productId, size } = req.body;
    // console.log(req.body)

  try {
    const product = await stproduct.findById(productId);
    // console.log(product)
    if (!product || !product.type) {
      throw new Error("productId or productId.type is undefined or null");
    }
   
    const query = {
      type: product.type, // Match products with the same type as productId
      size: size,           // Match products with the specified size
      _id: { $ne: new ObjectId(productId) } // Exclude the current productId
    };

    
    // Performing the query using mongoose
    const products = await stproduct.find(query);
    res.json(products);
    return products;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// products fetch for backend

module.exports.productData =async(req,res)=>{
  try{
    const products = await stproduct.find();
    const productcount =await stproduct.countDocuments()
    res.status(200).json({products,productcount})

  }catch(err){
console.log(err)
  }
}

// Payment module
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports.createorder = async (req, res) => {
  try {
    // console.log(req.body)
    const options = {
      amount: Number(req.body.cartTotalAmount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    // console.log(order)

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.paymentverification = async (req, res) => {
  // console.log(req.body)
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.body;
    const cartdata = req.body.cartdata;
    const cartTotalAmount = req.body.cartTotalAmount;
    const cartTotalQuantity = req.body.cartTotalQuantity;
    const {
      email,
      firstname,
      lastname,
      address,
      apartment,
      country,
      city,
      state,
      pincode,
      phone,
    } = req.body.formData;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      await order.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cartdata,
        cartTotalAmount,
        cartTotalQuantity,
        email,
      firstname,
      lastname,
      address,
      apartment,
      country,
      city,
      state,
      pincode,
      phone,
      });

      // cartdata

      const orderData = () => {
        var data = "";
    
        for (let i = 0; i < cartdata.length; i++) {
          data += "<b>"+"Name:" + cartdata[i].title + "<br>";
         
          data += "<b>"+"Size : " + cartdata[i].size + "<br>";
          data += "<b>"+"Type : " + cartdata[i].type + "<br>";
          data += "<b>"+ "Price:" + cartdata[i].price + "<br>";
         
          data += "<b>"+"Quantity:" + cartdata[i].quantity + "<br>";
         
          // data += "Price : " + cartdata[i].mrp + "<br>";
         
          // console.log(i);
        }
        return data;
      };





      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Order Placed",
        html: `

        <p>Dear  ${firstname},</p>
    <p>We are pleased to inform you that your order has been successfully placed.</p>
    <p><strong>Order Details:</strong></p>
    <ul>
      <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
      <li><strong>Mobile Number:</strong> ${phone} </li>
      <li><strong>Order:</strong> <br> ${orderData()} </li>
      <li><strong>Order Date:</strong>  ${new Date().toLocaleDateString()}</li>
      <li><strong>Total Items :</strong>  ${cartTotalQuantity}</li>
      <li><strong>Order Total:</strong>  ${cartTotalAmount}</li>
      <li><strong>Txn ID:</strong>   ${razorpay_payment_id}</li>
    </ul>
   
    <p>Thank you for shopping with us!</p>
    <p><a href="${process.env.URL}" class="button">Visit Our Website</a></p>

        `,
      };
      await transporter.sendMail(mailOptions);

      res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });

     
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};



// user send message via contact form

module.exports.message = async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;

    let newMsg = new stmsg({
      name,
      contact,
      email,
      message,
    });
    // console.log(newUser)
    await newMsg.save();

    // Send verification email
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.SMTP_MAIL,
      subject: "Contact Form",
      html: `
    <p><b>Name : </b> ${name} </p>
     <p><b>Email : </b> ${email}</p>
    <p><b>Mobile Number : </b> ${contact}</p>
    <p><b>Message : </b> ${message}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).send("Message Sent successful. ");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// to get all the message

module.exports.getmsg = async (req, res) => {
  try {
    const products = await stmsg.find();
    return res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



// order sections .........



module.exports.userOrders =async (req,res)=>{
  try{
    const{username}=req.body
    const products = await order.findOne({userdetail:username})
    console.log(products)

  }
  catch(err){
    console.log(err)

  }
}


// to calculate amount of orders

module.exports.orderData =async(req,res)=>{
  try{
  
  const today = new Date();
const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
lastDayOfPreviousMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);
const firstDayOfPreviousMonth = new Date(lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), 1);

const orders = await order.find();
const totalMoney = orders.reduce((acc, order) => acc + order.cartTotalAmount, 0);

const previousMonthOrders = await order.find({
  createdAt: {
    $gte: firstDayOfPreviousMonth,
    $lt: firstDayOfCurrentMonth
  }
});

const previousMonthTotalMoney = previousMonthOrders.reduce((acc, order) => acc + order.cartTotalAmount, 0);
let percentageGrowth = 0;
if (previousMonthTotalMoney !== 0) {
  percentageGrowth = ((totalMoney - previousMonthTotalMoney) / previousMonthTotalMoney) * 100;
}

res.json({
  totalMoney,
  percentageGrowth,
  orders
});


  }catch(err){
    console.log(err)
  }
}

// fetch acc to date orders
module.exports.packedorders=async(req,res)=>{
  try {
    const orders = await order.find({ packed: true }).sort({ createdAt: 'desc' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
}
module.exports.unpackedorders=async(req,res)=>{
  try {
    const orders = await order.find({ packed: false }).sort({ createdAt: 'desc' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
}

// order status 
module.exports.orderstatus =async(req,res)=>{

  try {
    const { id } = req.params;
    const orders = await order.findById(id);

    if (!orders) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orders.packed = true;
    await orders.save();

    res.status(200).json({ message: 'Packed status updated successfully', orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// latest orders of a day

module.exports.latestorder =async(req,res)=>{
  try{
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to next day
    
    const orders = await order.find({
      orderDate: { $gte: today, $lt: tomorrow }
    });

    res.json(orders);
  }
  catch (err){
    res.status(500).json({ message: error.message });

  }
}



// top selling products

module.exports.topproducts =async(req,res)=>{
  try{
    const topProducts = await order.aggregate([
      { $unwind: '$cartdata' }, // Split orders into individual cart items
      { $group: {
          _id: '$cartdata._id', // Group by product ID
          totalQuantity: { $sum: '$cartdata.quantity' }, // Sum the quantities
          totalAmount: { $sum: '$cartdata.price' } // Sum the total prices
      }},
      { $sort: { totalQuantity: -1 } }, // Sort by total quantity in descending order
      { $limit: 10 } // Limit to top 10 products (adjust as needed)
    ]);
    // console.log(topProducts)

    // Extract product IDs from aggregation result
    const productIds = topProducts.map(product => product._id);

    // Fetch product details from Product model
    const products = await stproduct.find({ _id: { $in: productIds } });

    // Combine product details with topProducts
    const topPurchasedProducts = topProducts.map(product => ({
      ...product,
      details: products.find(p => p._id.equals(product._id)) // Assuming _id is ObjectId
    }));

    res.json(topPurchasedProducts);

  }
  catch (err){

  }
}






