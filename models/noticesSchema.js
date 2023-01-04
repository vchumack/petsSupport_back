const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const categoryList = ["sell", "lost", "goodhands"];
const sexList = ["male", "female"];
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const cityRegexp = /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/;

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost", "goodhands"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    breed: {
      type: String,

      default: "",
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    location: {
      type: String,
      match: cityRegexp,
      required: true,
    },
    price: {
      type: Number,
    },
    imageURL: {
      type: String,
      default: "https://via.placeholder.com/300.png/#FDF7F2/#111111",
    },
    comments: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleSaveErrors);

const noticeAddSchema = Joi.object({
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16).optional(),
  birthday: Joi.string().pattern(dateRegExp).optional(),
  breed: Joi.string().min(2).max(24).optional(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  location: Joi.string().required(),
  price: Joi.number().optional(),
  imageURL: Joi.string().optional(),
  comments: Joi.string().min(8).max(120).optional(),
});

const noticesSchemas = {
  noticeAddSchema,
};

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  noticesSchemas,
};
