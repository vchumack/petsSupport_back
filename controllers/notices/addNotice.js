const { Notice } = require("../../models/noticesSchema");
const addNotices = async (req, res) => {
  const { _id: userId } = req.user;

  const notice = await Notice.create({ ...req.body, owner: userId });
  res.status(201).json(notice);
};

module.exports = addNotices;
