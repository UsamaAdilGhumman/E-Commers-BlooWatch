const { Review } = require("../models");

// Add Review

const addReview = async (req, res) => {
  console.log(req.params);
  const { rating, comment } = req.body;
  const { userId, productId } = req.params;
  let myReviews = 0;
  try {
    const [newreview, created] = Review.findOrCreate({
      where: { userId, productId },
      defaults: {
        userId,
        productId,
        rating,
        comment,
      },
    });
    res.send({ status: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

// All Reviews By ProductID
const allReviewsByProductID = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.findAll({
      include: "users",
      where: { productId },
    });
    res.send(reviews);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  addReview,
  allReviewsByProductID
};
