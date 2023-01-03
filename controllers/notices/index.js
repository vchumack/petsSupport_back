const addNotice = require("./addNotice");
const getOneNotice = require("./getOneNotice");
const getNoticeByCategory = require("./getNoticeByCategory");
const removeNotice = require("./removeNotice");
const getUserNotices = require("./getUserNotices");
const addNoticeToFavorite = require("./addNoticeToFavorite");
const removeNoticeFromFavorite = require("./removeNoticeFromFavorite");
const getFavoriteNotices = require("./getFavoriteNotices");

module.exports = {
  addNotice,
  getOneNotice,
  getNoticeByCategory,
  removeNotice,
  getUserNotices,
  addNoticeToFavorite,
  removeNoticeFromFavorite,
  getFavoriteNotices,
};
