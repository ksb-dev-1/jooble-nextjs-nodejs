const registerUser = (req, res) => {
  res.send("Register user");
};

const verifyEmail = (req, res) => {
  res.send("Verify email");
};

const loginUser = (req, res) => {
  res.send("Login user");
};

const logoutUser = (req, res) => {
  res.send("Logout user");
};

const forgotPassword = (req, res) => {
  res.send("Forgot password");
};

const resetPassword = (req, res) => {
  res.send("Reset password");
};

export {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
