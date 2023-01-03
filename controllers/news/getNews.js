const News = require("../../models/newsSchema");

const getNews = async (req, res, next) => {
  const news = await News.find();

  res.status(200).json(news);
};

module.exports = getNews;
