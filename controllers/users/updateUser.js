const { User } = require("../../models/userSchema");

const { uploadToCloudinary } = require("../../helpers");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
      }
    ).select("-accessToken -refreshToken -createdAt -password -updatedAt");
    res.status(200).json({
      user: {
        avatarURL: user.avatarURL,
        userInfo: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          birthday: user.birthday,
        },
      },
    });
  } else {
    const avatarURL = await uploadToCloudinary(req.file.path);
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body, avatarURL: avatarURL.secure_url },
      {
        new: true,
      }
    ).select("-accessToken -refreshToken -createdAt -password -updatedAt");
    res.status(200).json({
      user: {
        avatarURL: user.avatarURL,
        userInfo: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          birthday: user.birthday,
        },
      },
    });
  }
};

module.exports = updateUser;
