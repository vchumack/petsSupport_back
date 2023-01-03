const uploadToCloudinary = require("../../helpers/cloudinaryUpload.js");
const { Notice } = require("../../models/noticesSchema.js");

const addNotice = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = await uploadToCloudinary(req.file.path);
  const notice = await Notice.create({
    ...req.body,
    owner: _id,
    avatarURL: avatarURL.secure_url,
  });
  res.status(201).json(notice);
};

module.exports = addNotice;
