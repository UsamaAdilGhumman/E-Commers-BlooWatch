const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const categoryController = require('../controllers/categoryController')


routes.get("/category",categoryController.Allcategories);
routes.post("/newCategory",categoryController.newCategory);


module.exports = routes;