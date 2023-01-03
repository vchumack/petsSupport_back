const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  authenticate,
  // upload
} = require("../../middlewares");

const { userSchemas } = require("../../models/userSchema");

// signup
router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post(
  "/refresh",
  validateBody(userSchemas.refreshSchema),
  ctrlWrapper(ctrl.refresh)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrlWrapper(ctrl.updateAvatar)
// );

module.exports = router;
