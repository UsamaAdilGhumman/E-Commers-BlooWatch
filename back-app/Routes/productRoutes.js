const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const productController = require('../controllers/productController');
const { upload } = require("../index");

routes.get("/product/:id",productController.product);
routes.get("/:id/products",productController.productsWithUserId);
routes.post("/:id/newProduct",productController.newProduct);
routes.get("/products",productController.products);
routes.post('/editproduct/:id',productController.editProduct);
routes.delete("/deleteProduct/:id",productController.deleteProduct);


module.exports = routes;