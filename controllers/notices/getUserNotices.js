const { Notice } = require("../../models/noticesSchema");
const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, title = "" } = req.query;
  const skip = (page - 1) * limit;
  if (title === "") {
    const result = await Notice.find({ owner })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  } else {
    const result = await Notice.find({ owner, $text: { $search: title } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  }
};

module.exports = getUserNotices;
