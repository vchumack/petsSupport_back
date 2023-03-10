const HttpError = require("../../helpers/HttpError.js");
const { User } = require("../../models/userSchema.js");

const addNoticeToFavorite = async (req, res) => {
  const { _id, favorite } = req.user;
  const { id } = req.params;

  if (favorite.includes(id)) {
    throw HttpError(
      409,
      `Notice with id: ${id} is already in your favorite list`
    );
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { $push: { favorite: id } },
    {
      new: true,
    }
  );

  res
    .status(201)
    .json({ favorite: user.favorite, message: "notice add to favorite" });
};

module.exports = addNoticeToFavorite;
