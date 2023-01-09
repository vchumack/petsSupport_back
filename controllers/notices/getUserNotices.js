const { Notice } = require("../../models/noticesSchema");
const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Notice.find({ owner }).sort({ updatedAt: -1 });
  res.status(200).json(result);
};

module.exports = getUserNotices;
