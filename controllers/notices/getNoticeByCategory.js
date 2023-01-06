const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/noticesSchema");
const queryList = ["sell", "lost", "goodhands"];

const getNoticeByCategory = async (req, res) => {
  const { category } = req.query;

  console.log(category);
  if (category === "") {
    const result = await Notice.find();
    res.status(200).json(result);
  } else if (!queryList.includes(category)) {
    throw HttpError(
      400,
      `Bad Request:Your request must include something from this list: ${queryList.join(
        ","
      )}`
    );
  } else {
    const { ...query } = req.query;
    const result = await Notice.find({ ...query });
    res.status(200).json(result);
  }
};

module.exports = getNoticeByCategory;
