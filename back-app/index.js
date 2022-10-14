// const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const { sequelize, User, Category, Product, Order, Item,Review} = require("./models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./Middleware/auth");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: path.join(__dirname, ".env") });
const PORT = process.env.PORT || 5000;

const userRoute = require('./Routes/userRoutes')
const productRoute = require('./Routes/productRoutes')
const categoryRoute = require('./Routes/categoryRoutes')
const itemRoute = require('./Routes/itemRoutes')
const orderRoute = require('./Routes/orderRoutes')
const reviewRoute = require('./Routes/reviewRoutes');
const { resolve } = require("path");


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: "dmnnslzuu",
  api_key: "847391679733438",
  api_secret: "hG1WN1CLRBWC8La8tb3E58RWKLI",
});



app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/category',categoryRoute);
app.use('/item',itemRoute);
app.use('/order',orderRoute);
app.use('/review',reviewRoute);



// Picture Upload in server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
exports.upload = multer({ storage: storage });



exports.uploads = (file,folder)=>{
  return new Promise(resolve=>{
    cloudinary.uploader.upload(file,(result)=>{
      resolve({
        url:result.url,
        id:result.public_id
      })
    },{
      resource_type: 'auto',
      folder:folder
    })
  })
}


// app.use('/upload-images',upload.array('pic'),async(req,res)=>{
//   const uploader = async (path) => await cloudinary.uploads(path,"/public/images")
//   if(req.method === 'POST'){
//     const urls = []
//     const files = req.files;
//     for(const file of files){
//       const {path} = file;
//       const newPath = await uploader(path)
//       urls.push(newPath);
//       fs.unlinkSync(path)
//     }
//   }
// })









// Server Listen
app.listen(PORT, async () => {
  console.log(`Server is listening in http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log("error", error.message);
  }
  console.log("Database Connected");
});
