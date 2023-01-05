const getCurrent = async (req, res) => {
  const { name, email, phone, city, birthday, avatarURL } = req.user;

  res.status(200).json({
    avatarURL,
    name,
    email,
    birthday,
    phone,
    city,
  });
};

module.exports = getCurrent;
