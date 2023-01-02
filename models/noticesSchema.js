const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");
const phoneRegexp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const noticeSchema = new Schema(
  {
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
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleSaveErrors);

const noticeGetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(24).required(),
  comments: Joi.string().min(8).max(120).required(),
  avatarURL: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  city: Joi.string().required(),
});

const schemas = {
  noticeGetSchema,
};

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  schemas,
};
