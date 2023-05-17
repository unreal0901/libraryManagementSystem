// const { omit } = require("lodash");
const studentModel = require("../models/student.model");
const { excludedFields } = require("../utils/excludedFields");
const getMe = async (user) => {
  return await studentModel.find({ _id: user._id }, { password: 0 }); 
};

const getAllUsers = async () => {
  return await studentModel.find({}, { password: 0 });
};

module.exports = { getMe, getAllUsers };
