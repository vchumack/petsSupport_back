const getCurrent = async (req, res) => {
  const { name, email, phone, city, birthday, avatarURL, _id } = req.user;

  res.status(200).json({
    avatarURL,
    name,
    email,
    birthday,
    phone,
    city,
    _id,
  });
};

module.exports = getCurrent;
