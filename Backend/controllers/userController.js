// Importing necessary modules and files
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// Controller function for user registration
export const register = catchAsyncErrors(async (req, res, next) => {
  // Extracting user details from request body
  const { name, email, phone, password, role } = req.body;

  // Validation for required fields
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }

  // Check if email is already registered
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  // Create user and send token
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

// Controller function for user login
export const login = catchAsyncErrors(async (req, res, next) => {
  // Extracting login details from request body
  const { email, password, role } = req.body;

  // Validation for required fields
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role."));
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  // If user not found, return an error
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Check if the provided password matches the stored password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Check if the user's role matches the provided role
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }

  // Send token for successful login
  sendToken(user, 201, res, "User Logged In!");
});

// Controller function for user logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  // Clear the token cookie and respond with success message
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

// Controller function to get user details
export const getUser = catchAsyncErrors((req, res, next) => {
  // Extract user details from request object
  const user = req.user;

  // Respond with success and user details
  res.status(200).json({
    success: true,
    user,
  });
});
