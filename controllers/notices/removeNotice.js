const HttpError = require("../../helpers/HttpError.js");
const { Notice } = require("../../models/noticesSchema.js");

const removeNotice = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: userId } = req.user;
  const notice = await Notice.findOneAndRemove({
    owner: userId,
    _id: noticeId,
  });
  if (!notice) {
    throw HttpError(404, `failure, notice with id: ${noticeId} not found!`);
  }
  res.status(200).json({
    message: `notice with id: ${noticeId} has been deleted`,
    id: noticeId,
  });
};

module.exports = removeNotice;
