const { Category } = require("../models");

// Read All Categories
const Allcategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error.message);
  }
};

// Add Category

const newCategory = async (req, res) => {
  console.log("abcdef");
  console.log(req.body);
  const { title } = req.body;
  if (title) {
    try {
      const [newCategory, created] = await Category.findOrCreate({
        where: { title },
        defaults: { title },
      });
      if (created) {
        res.send({ status: "success", message: "Add Category succesfully" });
      } else {
        res.send({ status: "failed", message: "Category Already Exist" });
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.send({ status: "failed", message: "Something Wrong",Error: "Title not Found" });
  }
  // res.send("hello world!");
};


module.exports = {
    Allcategories,
    newCategory
}