const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");
const phoneRegexp = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const cityRegexp = /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/;
// eslint-disable-next-line no-useless-escape
const textRegexp = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: textRegexp,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    city: {
      type: String,
      required: true,
      match: cityRegexp,
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      match: dateRegExp,
      default: "",
    },
    favorite: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
        required: true,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().min(1).pattern(textRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).max(32).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  city: Joi.string().pattern(cityRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
const updateUserSchema = Joi.object({
  name: Joi.string().min(1).pattern(textRegexp).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  birthday: Joi.string().pattern(dateRegExp).optional(),
  phone: Joi.string().pattern(phoneRegexp).optional(),
  city: Joi.string().pattern(cityRegexp).optional(),
  avatarURL: Joi.string().optional(),
});
// .max(1);

const userSchemas = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
