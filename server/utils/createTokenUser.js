const createTokenUser = (user) => {
  return {
    image: user.image,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    userId: user._id,
    role: user.role,
    last_updated: user.last_updated,
    location: user.location,
    available_to_join: user.available_to_join,
    mobile_no: user.mobile_no,
  };
};

export default createTokenUser;
