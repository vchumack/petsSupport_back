const { Pet } = require("../../models/petSchema");

const getUserInfo = async (req, res) => {
  const {
    _id: owner,
    avatarURL,
    name,
    email,
    city,
    phone,
    birthday,
  } = req.user;
  const pets = await Pet.find({ owner });

  res.status(200).json({
    _id: owner,
    avatarURL,
    name,
    email,
    city,
    phone,
    birthday,
    pets: [...pets],
  });
};

module.exports = getUserInfo;
