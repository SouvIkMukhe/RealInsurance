// Import necessary modules and files
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Insurance } from "../models/insuranceSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Controller function to get all active insurances
export const getAllInsurances = catchAsyncErrors(async (req, res, next) => {
  // Fetch all insurances where 'expired' is false
  const insurances = await Insurance.find({ expired: false });

  // Respond with success and the list of insurances
  res.status(200).json({
    success: true,
    insurances,
  });
});

// Controller function to post a new insurance
export const postInsurance = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Extract insurance details from the request body
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

  // Validate required fields
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full insurance details.", 400));
  }

  // Validate premium information
  if ((!premiumFrom || !premiumTo) && !fixedPremium) {
    return next(
      new ErrorHandler(
        "Please either provide fixed premium or ranged premium.",
        400
      )
    );
  }

  // Check if both fixed and ranged premiums are provided
  if (premiumFrom && premiumTo && fixedPremium) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Premium together.", 400)
    );
  }

  // Create and save the insurance
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

  // Respond with success message and insurance details
  res.status(200).json({
    success: true,
    message: "Insurance Posted Successfully!",
    insurance,
  });
});

// Controller function to get insurances posted by the logged-in user
export const getMyInsurances = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Fetch insurances posted by the logged-in user
  const myInsurances = await Insurance.find({ postedBy: req.user._id });

  // Respond with success and the list of insurances
  res.status(200).json({
    success: true,
    myInsurances,
  });
});

// Controller function to update insurance details
export const updateInsurance = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Extract insurance ID from request params
  const { id } = req.params;

  // Find the insurance by ID
  let insurance = await Insurance.findById(id);

  // Check if insurance exists
  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }

  // Update insurance details
  insurance = await Insurance.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Respond with success message
  res.status(200).json({
    success: true,
    message: "Insurance Updated!",
  });
});

// Controller function to delete an insurance
export const deleteInsurance = catchAsyncErrors(async (req, res, next) => {
  // Check user role
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  // Extract insurance ID from request params
  const { id } = req.params;

  // Find the insurance by ID
  const insurance = await Insurance.findById(id);

  // Check if insurance exists
  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }

  // Delete the insurance
  await insurance.deleteOne();

  // Respond with success message
  res.status(200).json({
    success: true,
    message: "Insurance Deleted!",
  });
});

// Controller function to get details of a specific insurance
export const getSingleInsurance = catchAsyncErrors(async (req, res, next) => {
  // Extract insurance ID from request params
  const { id } = req.params;

  try {
    // Find the insurance by ID
    const insurance = await Insurance.findById(id);

    // If insurance not found, return an error
    if (!insurance) {
      return next(new ErrorHandler("Insurance not found.", 404));
    }

    // Respond with success and insurance details
    res.status(200).json({
      success: true,
      insurance,
    });
  } catch (error) {
    // Handle invalid ID or CastError
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
