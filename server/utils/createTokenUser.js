const createTokenUser = (user) => {
  return {
    image: user.image,
    name: user.name,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
};

export default createTokenUser;
