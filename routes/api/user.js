const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const { petSchemas } = require("../../models/petSchema");
const { userSchemas } = require("../../models/userSchema");

router.post(
  "/pets",
  authenticate,
  validateBody(petSchemas.petAddSchema),
  ctrlWrapper(ctrl.addPet)
);

router.delete(
  "/pets/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removePet)
);
router.get("/", authenticate, ctrlWrapper(ctrl.getUserInfo));

router.put(
  "/",
  authenticate,
  validateBody(userSchemas.updateUserSchema),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
