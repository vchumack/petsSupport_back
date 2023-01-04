const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const categoryList = ["sell", "lost", "goodhands"];
const sexList = ["male", "female"];
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

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
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    imageURL: {
      type: String,
      required: true,
      default:
        "https://e7.pngegg.com/pngimages/499/839/png-clipart-cat-silhouette-sticker-dog-beige-color-mammal-leaf.png",
    },
    comments: {
      type: String,
      required: true,
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
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
  breed: Joi.string().min(2).max(24).required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  location: Joi.string().required(),
  price: Joi.number(),
  imageURL: Joi.string().optional(),
  comments: Joi.string().min(8).max(120).required(),
});

const noticesSchemas = {
  noticeAddSchema,
};

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  noticesSchemas,
};
