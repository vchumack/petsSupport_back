const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

// const {
//   validateBody,
//   authenticate
// } = require("../../middlewares");

// const { schemas } = require("../../models/noticesSchema");

router.get(
  "/",

  ctrlWrapper(ctrl.getNotices)
);

module.exports = router;
