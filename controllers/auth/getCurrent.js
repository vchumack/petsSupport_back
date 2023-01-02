const getCurrent = async (req, res) => {
  const { name, email, phone, city, birthday, avatarURL } = req.user;

  res.status(200).json({
    email,
    name,
    phone,
    city,
    birthday,
    avatarURL,
  });
};

module.exports = getCurrent;
