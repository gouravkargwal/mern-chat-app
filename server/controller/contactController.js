const createError = require("http-errors");
const Customer = require("../model/customerModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    console.log(req.params);
    const users = await Customer.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id",
    ]);
    console.log(users);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
