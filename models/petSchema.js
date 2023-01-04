const { Schema, model } = require("mongoose");
const Joi = require("joi");
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
// eslint-disable-next-line no-useless-escape
const textRegexp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

const { handleSaveErrors } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      match: textRegexp,
      required: true,
    },
    birthday: {
      type: String,
      match: dateRegExp,
      required: true,
    },
    breed: {
      type: String,
      match: textRegexp,
      required: true,
    },
    avatarURL: {
      type: String,
      default: "https://via.placeholder.com/300.png/#FDF7F2/#111111",
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
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleSaveErrors);

const petAddSchema = Joi.object({
  name: Joi.string().min(2).max(16).pattern(textRegexp).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
  breed: Joi.string().min(2).max(16).pattern(textRegexp).required(),
  comments: Joi.string().min(8).max(120).pattern(textRegexp).optional(),
  avatarURL: Joi.string().optional(),
});

const petSchemas = {
  petAddSchema,
};

const Pet = model("pet", petSchema);

module.exports = {
  Pet,
  petSchemas,
};
