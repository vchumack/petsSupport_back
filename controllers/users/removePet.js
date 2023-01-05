const { Pet } = require("../../models/petSchema");
const HttpError = require("../../helpers/HttpError.js");
const removePet = async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByIdAndDelete(id);
  if (!pet) {
    throw HttpError(404, `failure, pet with id: ${id} not found!`);
  }
  res.status(200).json({
    message: `pet with name ${pet.name} has been deleted`,
    id,
  });
};

module.exports = removePet;
