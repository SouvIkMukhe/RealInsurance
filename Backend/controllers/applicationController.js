// Import necessary modules and models
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Insurance } from "../models/insuranceSchema.js";
import cloudinary from "cloudinary";

// Controller to handle the submission of insurance applications
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  // Check if the user is an Admin
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }

  // Check if Aadhar file is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Aadhar File Required!", 400));
  }

  // Validate the format of the Aadhar file MultiPurposeInternetMailExtension
  const { aadhar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(aadhar.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }

  // Upload Aadhar file to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    aadhar.tempFilePath
  );

  // Handle Cloudinary upload errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Aadhar to Cloudinary", 500));
  }

  // Extract necessary details from request body
  const { name, email, coverLetter, phone, address, insuranceId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Insurance Seeker",
  };

  // Check if Insurance ID is provided
  if (!insuranceId) {
    return next(new ErrorHandler("Insurance not found!", 404));
  }

  // Retrieve insurance details
  const insuranceDetails = await Insurance.findById(insuranceId);
  if (!insuranceDetails) {
    return next(new ErrorHandler("Insurance not found!", 404));
  }

  // Construct Admin ID
  const adminID = {
    user: insuranceDetails.postedBy,
    role: "Admin",
  };

  // Validate if all required fields are provided
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !adminID ||
    !aadhar
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  // Create and save application in the database
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    adminID,
    aadhar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  // Respond with success message and application details
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// Controller to fetch all applications for an Admin
export const adminGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  // Check if the user is an Insurance Seeker
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Fetch applications for the logged-in Admin
  const { _id } = req.user;
  const applications = await Application.find({ "adminID.user": _id });

  // Respond with success and applications
  res.status(200).json({
    success: true,
    applications,
  });
});

// Controller to fetch all applications for an Insurance Seeker
export const insuranceseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  // Check if the user is an Admin
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }

  // Fetch applications for the logged-in Insurance Seeker
  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });

  // Respond with success and applications
  res.status(200).json({
    success: true,
    applications,
  });
});

// Controller to delete an application for an Insurance Seeker
export const insuranceseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  // Check if the user is an Admin
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }

  // Extract application ID from the request parameters
  const { id } = req.params;

  // Find and delete the application
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }
  await application.deleteOne();

  // Respond with success message
  res.status(200).json({
    success: true,
    message: "Application Deleted!",
  });
});