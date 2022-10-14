const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const orderController = require('../controllers/orderController')

routes.get("/Carts/:id",orderController.readCartDataWithuserid)
routes.post("/Carts/:id",orderController.deleteCart);
routes.post("/buy/:id",orderController.Buyproduct);
routes.get("/Complete/:id",orderController.completeOrdersData);
routes.get("/Pending/:id",orderController.pendingCartData);
routes.get("/OrderData",orderController.orderData);
routes.get("/OrderComplete/:id",orderController.orderComplete);
routes.post("/Order/:id",orderController.newOrder);
routes.post("/OrderUp/:id",orderController.up);
routes.post("/OrderDown/:id",orderController.down);


module.exports = routes;