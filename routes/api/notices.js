const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { noticeSchemas } = require("../../models/noticesSchema");

router.post(
  "/",
  authenticate,
  validateBody(noticeSchemas.noticeAddSchema),
  ctrlWrapper(ctrl.addNotice)
);

router.get("/", ctrlWrapper(ctrl.getNotices));
module.exports = router;
