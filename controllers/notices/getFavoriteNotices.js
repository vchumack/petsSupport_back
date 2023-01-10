const { User } = require("../../models/userSchema");

const getFavoriteNotices = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const result = await User.findOne({ _id }, "favorite").populate({
    path: "favorite",
    select:
      "category title name birthday breed sex location price imageURL comments",
    // perDocumentLimit: limit,
    // skip,
    options: { limit, skip },
  });

  res.status(200).json(result.favorite.reverse());
};

module.exports = getFavoriteNotices;
