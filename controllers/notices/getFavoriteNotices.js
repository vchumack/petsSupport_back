const { User } = require("../../models/userSchema");

const getFavoriteNotices = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 8, title = "" } = req.query;
  const skip = (page - 1) * limit;
  if (title === "") {
    const result = await User.findOne({ _id }, "favorite").populate({
      path: "favorite",
      select:
        "category title name birthday breed sex location price imageURL comments owner updatedAt",
      // perDocumentLimit: limit,
      // skip,
      options: { limit, skip },
    });
    res.status(200).json(result.favorite.reverse());
  } else {
    const result = await User.findOne({ _id }, "favorite").populate({
      path: "favorite",
      match: { $text: { $search: title } },
      select:
        "category title name birthday breed sex location price imageURL comments owner updatedAt",
      // perDocumentLimit: limit,
      // skip,
      options: { limit, skip },
    });

    res.status(200).json(result.favorite.reverse());
  }
};

module.exports = getFavoriteNotices;
