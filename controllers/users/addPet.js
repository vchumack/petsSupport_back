const { uploadToCloudinary } = require("../../helpers");
const { Pet } = require("../../models/petSchema");

const addPet = async (req, res) => {
  const { _id: userId } = req.user;

  if (!req.file) {
    const pet = await Pet.create({
      ...req.body,
      owner: userId,
    });
    res.status(201).json(pet);
  } else {
    const avatarURL = await uploadToCloudinary(req.file.path);
    const pet = await Pet.create({
      ...req.body,
      avatarURL: avatarURL.secure_url,
      owner: userId,
    });
    res.status(201).json(pet);
  }
};

module.exports = addPet;
