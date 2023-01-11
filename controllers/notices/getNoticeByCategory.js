const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/noticesSchema");
const queryList = ["sell", "lost", "goodhands"];

const getNoticeByCategory = async (req, res) => {
  const { category = "", page = 1, limit = 8, title = "" } = req.query;
  const skip = (page - 1) * limit;
  let totalPages = 1;
  if (category === "" && title === "") {
    const allNotices = await Notice.find({});
    const notices = await Notice.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    totalPages =
      allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
    res.status(200).json({ notices, totalPages });
  } else if (title !== "" && category === "") {
    const allSearcNotices = await Notice.find({ $text: { $search: title } });
    const notices = await Notice.find({ $text: { $search: title } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    totalPages =
      allSearcNotices.length === 0
        ? 1
        : Math.ceil(allSearcNotices.length / limit);
    res.status(200).json({ notices, totalPages });
  } else if (!queryList.includes(category)) {
    throw HttpError(
      400,
      `Bad Request:Your request must include something from this list: ${queryList.join(
        ","
      )}`
    );
  } else if (category !== "" && title === "") {
    const allNoticesByCategory = await Notice.find({ category });
    const notices = await Notice.find({ category })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    totalPages =
      allNoticesByCategory.length === 0
        ? 1
        : Math.ceil(allNoticesByCategory.length / limit);
    res.status(200).json({ notices, totalPages });
  } else {
    const allNotices = await Notice.find({
      category,
      $text: { $search: title },
    });
    const notices = await Notice.find({ category, $text: { $search: title } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    totalPages =
      allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
    res.status(200).json({ notices, totalPages });
  }
};

module.exports = getNoticeByCategory;
