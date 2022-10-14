const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user != null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        // Generate JWT Token
        const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });
        res.send({
          status: "success",
          message: "Login Success",
          token: token,
          user: user,
        });
      } else {
        res.send({
          status: "failed",
          message: "Email or Password is not Valid",
        });
      }
    } else {
      res.send({ status: "failed", message: "You are not a Registered User" });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

// Registration
const register = async (req, res) => {
  try {
    const file = req.files.profilePic;
    const { name, email, cpassword, password, isShop } = req.body;
    if (!name && !email && !cpassword && !password && !isShop) {
      return res.send({
        status: "failed",
        message: "All Fields Required",
      });
    }
    if (cpassword !== password) {
      return res.send({
        status: "failed",
        message: "Password Not Match",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // res.send('Image Uploading......... Please Wait!')
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        name,
        email,
        password: passwordHash,
        isShop,
        profilePic: result.url,
      },
    });
    if (created) {
      const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
        expiresIn: "1d",
      });
      return res.send({
        status: "Success",
        message: "User Register Successfully",
        token: token,
        user: user,
      });
    } else {
      return res.send({
        status: "failed",
        message: "User Already Exist",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({
      status: "failed",
      message: "Error In Upload",
    });
  }
};

const changePassword = async (req, res) => {
  const { cpass, pass } = req.body;
  const email = req.user.email;
  console.log(req.body);
  console.log(pass);
  if (pass === cpass) {
    // console.log("abcdef");
    try {
      const passwordHash = await bcrypt.hash(pass, 10);
      const user = await User.update(
        { password: passwordHash },
        { where: { email: email } }
      );
      if (user[0]) {
        // console.log("abcdef");
        res.send({
          status: "success",
          message: "Password changed succesfully",
        });
      } else {
        res.send({ status: "failed", message: "User not exist" });
      }
      // res.send({ "status": "success", "message": "Password changed succesfully" })
    } catch (error) {
      console.log(error.message);
    }
  }
};

const loggedUser = async (req, res) => {
  // const user = req.user;
  
  res.send({ user: req.user });
};

const Allusers = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// User with Product Data
const userWithproducts = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const users = await User.findAll({
      include: "products",
      where: { id },
    });
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
}

const UpdateProfile = async (req,res) => {
  const {id} = req.params;
  const {pic} = req.files;
  try {
    console.log(pic);
    console.log(id);
    const result = await cloudinary.uploader.upload(pic.tempFilePath);
    console.log(result.url)
    const user = await User.update(
      { profilePic: result.url, },
      { where: { id } }
    );
    if (user[0]) {
      console.log("abcdef");
      res.send({
        status: "success",
        message: "Image Upload succesfully",
      });
    } else {
      res.send({ status: "failed", message: "Image Upload Error" });
    }
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  login,
  register,
  changePassword,
  loggedUser,
  Allusers,
  userWithproducts,
  UpdateProfile
};
