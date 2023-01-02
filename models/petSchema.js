const { Schema, model } = require("mongoose");
const Joi = require("joi");
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const { handleSaveErrors } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      match: dateRegExp,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
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
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).required(),
  avatarURL: Joi.string().required(),
});

const petSchemas = {
  petAddSchema,
};

const Pet = model("pet", petSchema);

module.exports = {
  Pet,
  petSchemas,
};
