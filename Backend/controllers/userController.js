// Import necessary modules and dependencies
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// Controller function to register a new user
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill the full form!"));
  }

  // Check if the email is already registered
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  // Send token as a response for successful registration
  sendToken(user, 201, res, "User Registered!");
});

// Controller function to handle user login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Check if email, password, and role are provided
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role."));
  }

  // Find the user by email and include the password field in the selection
  const user = await User.findOne({ email }).select("+password");

  // Check if the user exists
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Compare the provided password with the stored password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Check if the user role matches the provided role
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }

  // Send token as a response for successful login
  sendToken(user, 201, res, "User Logged In!");
});

// Controller function to handle user logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  // Clear the token cookie on the client side
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

// Controller function to get details of the currently logged-in user
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;

  // Send response with the currently logged-in user details
  res.status(200).json({
    success: true,
    user,
  });
});
