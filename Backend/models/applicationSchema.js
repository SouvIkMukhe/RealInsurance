import mongoose from "mongoose";
import validator from "validator";

// Define the Mongoose schema for the Application model
const applicationSchema = new mongoose.Schema({
  // Name of the applicant
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  // Email of the applicant
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  // ADDITIONAL INFORMATION  submitted by the applicant
  Additional_Information: {
    type: String,
    required: [true, "Please provide Additional Details!"],
  },
  // Phone number of the applicant
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  // Address of the applicant
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  // Aadhar document information of the applicant
  aadhar: {
    public_id: {
      type: String, 
      required: true,
    },
    url: {
      type: String, 
      required: true,
    },
  },
  // Information about the applicant's user ID and role
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    role: {
      type: String,
      enum: ["Insurance Seeker"],
      required: true,
    },
  },
  // Information about the admin who handles the application
  adminID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin"],
      required: true,
    },
  },
  // Status of the application
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});

// Create the Application model using the defined schema
export const Application = mongoose.model("Application", applicationSchema);