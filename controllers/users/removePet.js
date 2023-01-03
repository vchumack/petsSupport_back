const { Pet } = require("../../models/petSchema");

const removePet = async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByIdAndDelete(id);
  res.status(200).json({
    message: `pet with name ${pet.name} has been deleted`,
  });
};

module.exports = removePet;
