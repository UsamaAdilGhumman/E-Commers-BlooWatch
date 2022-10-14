const { Product, Category } = require("../models");
const cloudinary = require("cloudinary").v2;

const product = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({
      include: "categories",
      where: { id },
    });
    product.pictures = product.pictures.split(",");
    //console.log(product);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
};

// All Products associate with one User
const productsWithUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const products = await Product.findAll({
      where: { userId },
    });
    products.forEach((element) => {
      element.pictures = element.pictures.split(",");
      console.log(element.isdraft);
      if (element.isdraft == 1) {
        element.isdraft = "Yes";
      } else {
        element.isdraft = "No";
      }
    });
    // console.log(res);
    res.send(products);
  } catch (error) {
    console.log(error.message);
  }
};

// Add New Product
const newProduct = async (req, res) => {
  console.log('abcdef');
  const userId = parseInt(req.params.id);
  // const userId = 1;
  
  const arr = [];
  // arr.push("1");
  const { title, description, stock_limit, price, isdraft, categoryId } =
    req.body;

  //arr.push(await cloudinary.url(file1.name))
  try {
   
   const myPic = Promise.all(
      Array.from(req.files.pic).map((item) => {
        return new Promise((resolve, reject) => {
          const result = cloudinary.uploader.upload(item.tempFilePath)
          resolve(result);
        });
      })
    )
    ;(await myPic).map(item=>{
      console.log(item.url);
      arr.push(item.url)
    })
    

    const pictures = arr.toString();
    if(!title && !description && !stock_limit && !price && !isdraft && !categoryId && !pictures){
      return res.send({message:"All fields Required",status:"failed"});
    }else{
      const newproduct = await Product.create({
        title,
        description,
        stock_limit,
        price,
        isdraft,
        categoryId,
        pictures,
        userId,
      });
  
      res.send({status:"Success",message:"Added Successfully"});
    }
  } catch (error) {
    res.send({message:"All fields Required",status:"failed"});
  }
  console.log(arr);
};

// Read All Products
const products = async (req, res) => {
  const {category, range, search } = req.query;
  console.log(req.query);
  try {
    let products;
    if(!category && range==0 && !search){
      products = await Product.findAll({
        include: "categories",
        where: { isdraft: "0" },
      });
    }else if(range>0 && !category && !search) {
      products = await Product.findAll({
        include: "categories",
        where: { price: range ,isdraft: "0" },
      });
    }else if(range == 0 && !category){
      products = await Product.findAll({
        include: "categories",
        where: { title: search ,isdraft: "0" },
      });
    }else if(range == 0 && !search){
      const categories = await Category.findAll({
        where: {title: category}
      })
      console.log(categories[0].id);
      const categoryId =  categories[0].id;
      products = await Product.findAll({
        include: "categories",
        where: { categoryId ,isdraft: "0" },
      });
    }else if(category && range>0){
      const categories = await Category.findAll({
        where: {title: category}
      })
      console.log(categories[0].id);
      const categoryId =  categories[0].id;
      products = await Product.findAll({
        include: "categories",
        where: { categoryId,price: range,isdraft: "0" },
      });
    }else if(search && range>0){
      products = await Product.findAll({
        include: "categories",
        where: { title: search,price: range,isdraft: "0" },
      });
    }
    else if(category && range>0 && search){
      const categories = await Category.findAll({
        where: {title: category}
      })
      console.log(categories[0].id);
      const categoryId =  categories[0].id;
      products = await Product.findAll({
        include: "categories",
        where: { title: search,categoryId,price: range,isdraft: "0" },
      });
    }
    products.forEach((element) => {
      element.pictures = element.pictures.split(",");
    });
    res.send(products);
  } catch (error) {
    console.log(error.message);
  }
};

// Edit Product
const editProduct = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const file1 = req.files.pic1;
  const file2 = req.files.pic2;
  const file3 = req.files.pic3;
  const file4 = req.files.pic4;
  const file5 = req.files.pic5;
  const arr = [];
  // arr.push("1");
  const { title, description, stock_limit, price, isdraft, categoryId } =
    req.body;
  try {
    const result1 = await (
      await cloudinary.uploader.upload(file1.tempFilePath)
    ).url;
    const result2 = await (
      await cloudinary.uploader.upload(file2.tempFilePath)
    ).url;
    const result3 = await (
      await cloudinary.uploader.upload(file3.tempFilePath)
    ).url;
    const result4 = await (
      await cloudinary.uploader.upload(file4.tempFilePath)
    ).url;
    const result5 = await (
      await cloudinary.uploader.upload(file5.tempFilePath)
    ).url;
    arr.push(result1);
    arr.push(result2);
    arr.push(result3);
    arr.push(result4);
    arr.push(result5);

    const pictures = arr.toString();
    await Product.update(
      { title, description, stock_limit, price, isdraft, categoryId, pictures },
      { where: { id } }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const mes = await Product.destroy({ where: { id } });
    if(mes == 0){
      res.send({status:"failed",message:"No Product Found"})
    }else{
      res.send({status:"Success",message:"Product Deleted"})
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  product,
  productsWithUserId,
  newProduct,
  products,
  editProduct,
  deleteProduct,
};
