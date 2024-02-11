// Importing necessary modules and files
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Insurance } from "../models/insuranceSchema.js";
import cloudinary from "cloudinary";

// Controller function for posting an application
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Admin") {
    return next(new ErrorHandler("Admin not allowed to access this resource.", 400));
  }

  // Check for Aadhar file
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Aadhar File Required!", 400));
  }

  const { aadhar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  
  // Validate Aadhar file format
  if (!allowedFormats.includes(aadhar.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a PNG file.", 400));
  }

  // Upload Aadhar to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(aadhar.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Aadhar to Cloudinary", 500));
  }

  // Extract data from request body
  const { name, email, coverLetter, phone, address, insuranceId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Insurance Seeker",
  };

  // Check for insurance existence
  if (!insuranceId) {
    return next(new ErrorHandler("Insurance not found!", 404));
  }

  const insuranceDetails = await Insurance.findById(insuranceId);
  if (!insuranceDetails) {
    return next(new ErrorHandler("Insurance not found!", 404));
  }

  const adminID = {
    user: insuranceDetails.postedBy,
    role: "Admin",
  };

  // Validate required fields
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

  // Create and save the application
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

// Controller function to get all applications for an admin
export const adminGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler(
        "Insurance Seeker not allowed to access this resource.",
        400
      )
    );
  }
  const { _id } = req.user;
  const applications = await Application.find({ "adminID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

// Controller function to get all applications for an insurance seeker
export const insuranceseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

// Controller function to delete an application for an insurance seeker
export const insuranceseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }
  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application Deleted!",
  });
});

// Controller function to get details of a specific application
export const getApplicationDetails = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  // Find the application based on user role and application ID
  const application = await Application.findOne({
    _id: id,
    $or: [
      { "applicantID.user": _id }, // Insurance Seeker can view their own applications
      { "adminID.user": _id }, // Admin can view applications related to their insurance
    ],
  });

  // If application not found, return an error
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Respond with success and application details
  res.status(200).json({
    success: true,
    application,
  });
});

// Controller function for Admin to accept/reject an application
export const adminDecision = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { decision } = req.body;

  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Check if the user making the request is an admin
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler("You are not authorized to perform this action!", 403));
  }

  // Update the status based on the admin's decision
  if (decision === 'accept') {
    application.status = 'accepted';
  } else if (decision === 'reject') {
    application.status = 'rejected';
  } else {
    return next(new ErrorHandler("Invalid decision. Please provide 'accept' or 'reject'.", 400));
  }

  // Save the updated application
  await application.save();

  // Notify both admin and user about the decision (you can use notifications, emails, etc.)

  res.status(200).json({
    success: true,
    message: `Application ${decision === 'accept' ? 'accepted' : 'rejected'} successfully!`,
    application,
  });
});

