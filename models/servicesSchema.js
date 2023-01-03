const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addressUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    workDays: {
      type: Array,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", handleSaveErrors);

const Service = model("service", serviceSchema);

module.exports = Service;
