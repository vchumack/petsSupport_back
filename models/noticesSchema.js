const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const categoryList = ["sell", "lost", "in good hands"];
const sexList = ["male", "female"];
const nameRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const cityRegexp = /^([A-Za-z]+)([,][ ][A-Za-z]+)*$/;
// eslint-disable-next-line no-useless-escape
const textRegexp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost", "in good hands"],
      required: true,
    },
    title: {
      type: String,
      match: textRegexp,
      required: true,
    },
    name: {
      type: String,
      match: nameRegexp,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    breed: {
      type: String,
      match: nameRegexp,
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
      default: null,
    },
    imageURL: {
      type: String,
      default:
        "https://banner2.cleanpng.com/20180724/zlk/kisspng-dog-paw-cat-tiger-clip-art-paw-prints-5b572d6126acf1.7538522915324399051584.jpg",
    },
    comments: {
      type: String,
      match: textRegexp,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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
  title: Joi.string().min(2).max(48).pattern(textRegexp).required(),
  name: Joi.string().min(2).max(16).pattern(nameRegexp).optional(),
  birthday: Joi.string().pattern(dateRegExp).optional(),
  breed: Joi.string().min(2).max(24).pattern(nameRegexp).optional(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  location: Joi.string().pattern(cityRegexp).required(),
  price: Joi.number().optional(),
  imageURL: Joi.string().optional(),
  comments: Joi.string().min(8).max(120).pattern(textRegexp).optional(),
});

const noticesSchemas = {
  noticeAddSchema,
};

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  noticesSchemas,
};
