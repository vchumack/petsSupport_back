const News = require("../../models/newsSchema");

const getNews = async (req, res) => {
  const { page = 1, limit = 9, search = "" } = req.query;
  const skip = (page - 1) * limit;
  if (search === "") {
    const news = await News.find({}).skip(skip).limit(limit);
    res.status(200).json(news);
  } else {
    const news = await News.find({ $text: { $search: search } })
      .skip(skip)
      .limit(limit);
    res.status(200).json(news);
  }
};

module.exports = getNews;
