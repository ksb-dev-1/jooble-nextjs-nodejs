const createTokenUser = (user) => {
  return {
    userId: user._id,
    image: user.image,
    name: user.name,
    email: user.email,
    country: user.country,
    state: user.state,
    city: user.city,
    available_to_join: user.available_to_join,
    mobile_no: user.mobile_no,
    role: user.role,
    last_updated: user.last_updated,
  };
};

export default createTokenUser;
