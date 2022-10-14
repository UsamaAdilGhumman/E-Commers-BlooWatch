const express = require("express");
const auth = require("../Middleware/auth");
const routes = express.Router();
const reviewController = require('../controllers/reviewController')


routes.post('/Review/:userId/:productId',reviewController.addReview)
routes.get('/Reviews/:productId',reviewController.allReviewsByProductID)

module.exports = routes;