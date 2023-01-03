const { Notice } = require("../../models/noticesSchema.js");
const addNoticeToFavorite = async (req, res) => {
  const { _id } = req.user;

  const notice = await Notice.create({ ...req.body, owner: _id });
  res.status(201).json(notice);
};

module.exports = addNoticeToFavorite;
