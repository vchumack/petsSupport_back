const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/noticesSchema");
const queryList = ["sell", "lost", "goodhands"];

const getNoticeByCategory = async (req, res) => {
  if (!queryList.includes(req.query)) {
    throw HttpError(
      400,
      `Bad Request:Your request must include something from this list: ${queryList.join(
        ","
      )}`
    );
  }
  const { ...query } = req.query;
  const result = await Notice.find({ ...query });
  res.status(200).json(result);
};

module.exports = getNoticeByCategory;
