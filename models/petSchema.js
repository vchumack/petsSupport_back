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

petSchema.post("save", handleSaveErrors);

const petAddSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).optional(),
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
