const { Notice } = require("../../models/noticesSchema");

const getOneNotice = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id);

  res.status(200).json(notice);
};

module.exports = getOneNotice;
