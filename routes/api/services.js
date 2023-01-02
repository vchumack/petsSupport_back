const express = require("express");
const router = express.Router();

const getServices = require("../../controllers/servicesSidebar/getServices");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(getServices));

module.exports = router;
