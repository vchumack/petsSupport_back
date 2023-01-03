const { Notice } = require("../../models/noticesSchema");
const getUserNotices = async (req, res) => {
  console.log("sfasfsafaf");
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Notice.find({ owner });
  res.status(200).json(result);
};

module.exports = getUserNotices;
