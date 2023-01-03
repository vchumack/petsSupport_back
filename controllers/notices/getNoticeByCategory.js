const { Notice } = require("../../models/noticesSchema");
const getNoticeByCategory = async (req, res) => {
  const { ...query } = req.query;
  const result = await Notice.find({ ...query });
  res.status(200).json(result);
};

module.exports = getNoticeByCategory;
