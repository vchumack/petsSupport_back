const { Pet } = require("../../models/petSchema");

const addPet = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, birthday, breed, avatarURL, comments } = req.body;

  const pet = await Pet.create({
    name,
    birthday,
    breed,
    avatarURL,
    comments,
    owner: userId,
  });
  res.status(201).json(pet);
};

module.exports = addPet;
