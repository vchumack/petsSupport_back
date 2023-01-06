const uploadToCloudinary = require("../../helpers/cloudinaryUpload.js");
const { Notice } = require("../../models/noticesSchema.js");

const addNotice = async (req, res) => {
  const { _id, email, phone } = req.user;
  if (!req.file) {
    const notice = await Notice.create({
      ...req.body,
      owner: _id,
      email,
      phone,
    });
    res.status(201).json(notice);
  } else {
    const avatarURL = await uploadToCloudinary(req.file.path);
    const notice = await Notice.create({
      ...req.body,
      owner: _id,
      avatarURL: avatarURL.secure_url,
      email,
      phone,
    });
    res.status(201).json(notice);
  }
};

module.exports = addNotice;
