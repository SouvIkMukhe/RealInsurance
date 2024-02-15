// Import necessary modules and dependencies
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Insurance } from "../models/insuranceSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Controller function to get all insurances that are not expired
export const getAllInsurances = catchAsyncErrors(async (req, res, next) => {
  const insurances = await Insurance.find({ expired: false });
  res.status(200).json({
    success: true,
    insurances,
  });
});

// Controller function to post a new insurance
export const postInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Check if the user role is 'Insurance Seeker'
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Destructure insurance details from the request body
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedPremium,
    premiumFrom,
    premiumTo,
  } = req.body;

  // Check if all required fields are provided
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full insurance details.", 400));
  }

  // Check if either fixed premium or ranged premium is provided
  if ((!premiumFrom || !premiumTo) && !fixedPremium) {
    return next(
      new ErrorHandler(
        "Please either provide fixed premium or ranged premium.",
        400
      )
    );
  }

  // Check if both fixed premium and ranged premium are not provided together
  if (premiumFrom && premiumTo && fixedPremium) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Premium together.", 400)
    );
  }

  // Create a new insurance
  const postedBy = req.user._id;
  const insurance = await Insurance.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedPremium,
    premiumFrom,
    premiumTo,
    postedBy,
  });
  
  // Send response with success message and created insurance
  res.status(200).json({
    success: true,
    message: "Insurance Posted Successfully!",
    insurance,
  });
});

// Controller function to get all insurances posted by the logged-in user
export const getMyInsurances = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Check if the user role is 'Insurance Seeker'
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Find insurances posted by the logged-in user
  const myInsurances = await Insurance.find({ postedBy: req.user._id });
  
  // Send response with success message and user's insurances
  res.status(200).json({
    success: true,
    myInsurances,
  });
});

// Controller function to update an existing insurance
export const updateInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Check if the user role is 'Insurance Seeker'
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Extract insurance ID from the request parameters
  const { id } = req.params;
  
  // Find the insurance by ID
  let insurance = await Insurance.findById(id);
  
  // Check if the insurance exists
  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }
  
  // Update the insurance and get the updated documenttt
  insurance = await Insurance.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  
  // Send response with success message
  res.status(200).json({
    success: true,
    message: "Insurance Updated!",
  });
});

// Controller function to delete an existing insurance
export const deleteInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Check if the user role is 'Insurance Seeker'
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Extract insurance ID from the request parameters
  const { id } = req.params;
  
  // Find the insurance by ID
  const insurance = await Insurance.findById(id);
  
  // Check if the insurance exists
  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }
  
  // Delete the insurance
  await insurance.deleteOne();
  
  // Send response with success message
  res.status(200).json({
    success: true,
    message: "Insurance Deleted!",
  });
});

// Controller function to get details of a single insurance by ID
export const getSingleInsurance = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  try {
    // Find the insurance by ID
    const insurance = await Insurance.findById(id);
    
    // Check if the insurance exists
    if (!insurance) {
      return next(new ErrorHandler("Insurance not found.", 404));
    }
    
    // Send response with success message and insurance details
    res.status(200).json({
      success: true,
      insurance,
    });
  } catch (error) {
    // Handle invalid ID or CastError
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});