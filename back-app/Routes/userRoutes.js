const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const userController = require('../controllers/userController')


routes.post("/login", userController.login);
routes.post('/register',userController.register)
routes.post("/changePassword",userController.changePassword)
routes.get("/loggeduser",auth,userController.loggedUser)
routes.get('/users',userController.Allusers);
routes.get("/users/:id",userController.userWithproducts)
routes.post('/UpdateProfile/:id',userController.UpdateProfile)



module.exports = routes;