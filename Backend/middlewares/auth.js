// auth.js

import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Extracting token from request cookies
  const { token } = req.cookies;

  // If token is not present, user is not authorized
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  // Verify the token using the secret key
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Find the user by the decoded user ID and add it to the request object
  req.user = await User.findById(decoded.id);

  // Continue to the next middleware or route handler
  next();
});

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  // Check if the user has the role of 'Admin'
  if (req.user && req.user.role === 'Admin') {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'You are not authorized to perform this action.' });
  }
};
