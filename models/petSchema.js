const { Schema, model } = require("mongoose");
const Joi = require("joi");
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
// eslint-disable-next-line no-useless-escape
const textRegexp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
const nameRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const { handleSaveErrors } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: true,
    },
    birthday: {
      type: String,
      match: dateRegExp,
      required: true,
    },
    breed: {
      type: String,
      match: nameRegexp,
      required: true,
    },
    avatarURL: {
      type: String,
      default: "",
      required: true,
    },
    comments: {
      type: String,
      match: textRegexp,
      default: "",
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

petSchema.post("save", handleSaveErrors);

const petAddSchema = Joi.object({
  name: Joi.string().min(2).max(16).pattern(nameRegexp).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
  breed: Joi.string().min(2).max(16).pattern(nameRegexp).required(),
  comments: Joi.string().min(8).max(120).pattern(textRegexp).required(),
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
