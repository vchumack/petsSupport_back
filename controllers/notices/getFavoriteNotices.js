const { User } = require("../../models/userSchema");

const getFavoriteNotices = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findOne({ _id }, "favorite").populate({
    path: "favorite",
    select:
      "category title name birthday breed sex location price imageURL comments ",
  });

  res.status(200).json(result.favorite);
};

module.exports = getFavoriteNotices;
