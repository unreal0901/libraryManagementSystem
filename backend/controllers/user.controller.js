const { getAllUsers, getMe } = require("../services/user.service");

const getMeHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const me = await getMe(user);
    res.status(200).json({
      message: "Your info:",
      data: me,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.status(200).json({
      message: "All users",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMeHandler,
  getAllUsersHandler,
};
