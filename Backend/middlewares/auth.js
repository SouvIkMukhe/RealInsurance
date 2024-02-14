// Import necessary modules and dependencies
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware function to check if a user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Retrieve the token from the request cookies
  const { token } = req.cookies;

  // Check if a token is present
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  // Verify the token using the provided JWT secret key
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Find the user by the decoded user ID from the token
  req.user = await User.findById(decoded.id);

  // Continue to the next middleware or route
  next();
});
