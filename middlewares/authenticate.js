const jwt = require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../helpers");

const { User } = require("../models/userSchema");

const { ACCESS_JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized.Please,provide a token");
  }
  try {
    const { id } = jwt.verify(token, ACCESS_JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    throw HttpError(403, "Invalid token");
  }
};

module.exports = ctrlWrapper(authenticate);
