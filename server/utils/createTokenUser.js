const createTokenUser = (user) => {
  return {
    image: user.image,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
};

export default createTokenUser;
