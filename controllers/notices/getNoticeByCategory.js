const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/noticesSchema");
const queryList = ["sell", "lost", "goodhands"];

const getNoticeByCategory = async (req, res) => {
  const { category = "", page = 1, limit = 8, title = "" } = req.query;
  const skip = (page - 1) * limit;
  if (category === "" && title === "") {
    const result = await Notice.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  } else if (title !== "" && category === "") {
    const result = await Notice.find({ $text: { $search: title } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  } else if (!queryList.includes(category)) {
    throw HttpError(
      400,
      `Bad Request:Your request must include something from this list: ${queryList.join(
        ","
      )}`
    );
  } else if (category !== "" && title === "") {
    const result = await Notice.find({ category })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  } else {
    const { category, title } = req.query;

    const result = await Notice.find({ category, $text: { $search: title } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(result);
  }
};

module.exports = getNoticeByCategory;
