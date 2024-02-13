import mongoose from "mongoose";

// Define the schema for the Insurance model
const insuranceSchema = new mongoose.Schema({
  // Title of the insurance
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  // Description of the insurance
  description: {
    type: String,
    required: [true, "Please provide description."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  // Category of the insurance
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  // Country for which the insurance is applicable
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  // City for which the insurance is applicable
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  // Location details for the insurance
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contain at least 20 characters!"],
  },
  // Fixed premium amount for the insurance
  fixedPremium: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  // Premium range - From
  premiumFrom: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  // Premium range - To
  premiumTo: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  // Flag indicating whether the insurance is expired
  expired: {
    type: Boolean,
    default: false,
  },
  // Date when the insurance was posted
  insurancePostedOn: {
    type: Date,
    default: Date.now,
  },
  // Reference to the user who posted the insurance
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // Status of the insurance (e.g., pending, accepted, rejected)
  status: {
    type: String,
    default: "pending", // or another suitable default value
    enum: ["pending", "accepted", "rejected"], // optional: restrict status to these values
  },
});

// Create the Insurance model
export const Insurance = mongoose.model("Insurance", insuranceSchema);
