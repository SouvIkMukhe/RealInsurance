
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Insurance } from "../models/insuranceSchema.js";
import cloudinary from "cloudinary";


export const postApplication = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Admin") {
    return next(new ErrorHandler("Admin not allowed to access this resource.", 400));
  }


  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Aadhar File Required!", 400));
  }

  const { aadhar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  
  
  if (!allowedFormats.includes(aadhar.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a PNG file.", 400));
  }

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

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

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

export const getApplicationDetails = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  const application = await Application.findOne({
    _id: id,
    $or: [
      { "applicantID.user": _id }, // Insurance Seeker can view their own applications
      { "adminID.user": _id }, // Admin can view applications related to their insurance
    ],
  });

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }
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


  if (req.user.role !== "Admin") {
    return next(new ErrorHandler("You are not authorized to perform this action!", 403));
  }

  if (decision === 'accept') {
    application.status = 'accepted';
  } else if (decision === 'reject') {
    application.status = 'rejected';
  } else {
    return next(new ErrorHandler("Invalid decision. Please provide 'accept' or 'reject'.", 400));
  }

 
  await application.save();

  

  res.status(200).json({
    success: true,
    message: `Application ${decision === 'accept' ? 'accepted' : 'rejected'} successfully!`,
    application,
  });
});

