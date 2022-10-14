const jwt = require("jsonwebtoken");
const { User } = require("../models");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];

      // console.log(token);
      if (!token) {
        return res.send({
          status: "failed",
          message: "Unauthorized User, No Token",
        });
      }
      // Verify Token
      const { user } = jwt.verify(token, process.env.JWT_KEY);

      // console.log(user);
      // Get User from Token
      req.user = await User.findOne({ where: { id: user.id } });

      // console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      return res.send({ status: "failed", message: "Unauthorized User" });
    }
  }
};

module.exports = checkUserAuth;
