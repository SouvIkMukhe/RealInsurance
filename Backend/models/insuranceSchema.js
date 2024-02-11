import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide description."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contian at least 20 characters!"],
  },
  fixedPremium: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  premiumFrom: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  premiumTo: {
    type: Number,
    minLength: [4, "Premium must contain at least 4 digits"],
    maxLength: [9, "Premium cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  insurancePostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Insurance = mongoose.model("Insurance", insuranceSchema);
