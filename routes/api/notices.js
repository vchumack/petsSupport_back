const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const { noticesSchemas } = require("../../models/noticesSchema");

router.post(
  "/",
  authenticate,
  validateBody(noticesSchemas.noticeAddSchema),
  ctrlWrapper(ctrl.addNotice)
);

router.get("/users", authenticate, ctrlWrapper(ctrl.getUserNotices));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getOneNotice));
router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeNotice));

module.exports = router;
