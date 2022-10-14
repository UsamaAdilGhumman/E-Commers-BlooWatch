const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const itemController = require('../controllers/itemController')

routes.get("/items", itemController.items);

module.exports = routes