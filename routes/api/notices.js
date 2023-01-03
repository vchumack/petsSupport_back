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
router.put(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.addNoticeToFavorite)
);
router.patch(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeNoticeFromFavorite)
);

router.get("/users", authenticate, ctrlWrapper(ctrl.getUserNotices));
router.get(
  "/users/favorite",
  authenticate,
  ctrlWrapper(ctrl.getFavoriteNotices)
);
router.get("/:id", isValidId, ctrlWrapper(ctrl.getOneNotice));
router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeNotice));

module.exports = router;
