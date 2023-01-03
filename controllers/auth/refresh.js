const jwt = require("jsonwebtoken");

const { User } = require("../../models/userSchema");

const { HttpError, createTokens } = require("../../helpers");

const { REFRESH_JWT_SECRET } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: refToken } = req.body;

  try {
    const { id } = jwt.verify(refToken, REFRESH_JWT_SECRET);
    const isExist = await User.findOne({ id });
    if (!isExist) {
      throw HttpError(403, "Token invalid");
    }
    const payload = {
      id,
    };
    const tokens = createTokens(payload);

    const { accessToken, refreshToken } = await User.findByIdAndUpdate(id, {
      ...tokens,
    });
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
