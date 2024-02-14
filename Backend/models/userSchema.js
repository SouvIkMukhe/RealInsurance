import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema({
  // Name of the user
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  // Email of the user
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  // Phone number of the user
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  // Password of the user
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false, // Do not include password field by default in query results
  },
  // Role of the user (Insurance Seeker or Admin)
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Insurance Seeker", "Admin"],
  },
  // Date when the user was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to encrypt the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // Hash the password with bcrypt before saving
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token for the user
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Create the User model using the defined schema
export const User = mongoose.model("User", userSchema);
