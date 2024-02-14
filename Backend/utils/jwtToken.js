// Function to send a JWT token in a cookie and respond with user details and a success message
export const sendToken = (user, statusCode, res, message) => {
  // Generate a JWT token for the user
  const token = user.getJWTToken();

  // Set options for the cookie containing the JWT token
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true to enhance security
  };

  // Respond with status code, cookie containing the token, user details, and a success message
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
