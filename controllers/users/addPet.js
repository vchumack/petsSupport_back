const { uploadToCloudinary } = require("../../helpers");
const { Pet } = require("../../models/petSchema");

const addPet = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, birthday, breed, comments } = req.body;
  const avatarURL = await uploadToCloudinary(req.file.path);

  const pet = await Pet.create({
    name,
    birthday,
    breed,
    avatarURL: avatarURL.secure_url,
    comments,
    owner: userId,
  });
  res.status(201).json(pet);
};

module.exports = addPet;
