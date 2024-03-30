const getAllUsers = async (req, res) => {
  res.send("Get all users");
};

const getSingleUser = async (req, res) => {
  res.send("Get single user");
};

const showCurrentUser = async (req, res) => {
  res.send("Get current user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updateUserPassword = async (req, res) => {
  res.send("Update user password");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
