const getCurrent = async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    birthday,
    avatarURL,
    favorite = [],
  } = req.user;

  res.status(200).json({
    avatarURL,
    name,
    email,
    birthday,
    phone,
    city,
    favorite,
  });
};

module.exports = getCurrent;
