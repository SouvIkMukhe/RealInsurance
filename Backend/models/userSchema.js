import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  // User's email
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  // User's phone number
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  // User's password
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false, // To exclude the password field from query results
  },
  // User's role (Insurance Seeker or Admin)
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Insurance Seeker", "Admin"],
  },
  // User's creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare the entered password with the stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token for the user
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Create the User model
export const User = mongoose.model("User", userSchema);
