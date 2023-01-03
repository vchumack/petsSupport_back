const { User } = require("../../models/userSchema");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    {
      new: true,
    }
  ).select("-accessToken -refreshToken -createdAt -password -updatedAt");
  res.status(200).json(user);
};

module.exports = updateUser;
