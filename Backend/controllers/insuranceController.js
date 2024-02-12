
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Insurance } from "../models/insuranceSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Controller function to get all active insurances
export const getAllInsurances = catchAsyncErrors(async (req, res, next) => {
  const insurances = await Insurance.find({ expired: false });
  res.status(200).json({
    success: true,
    insurances,
  });
});

export const postInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }


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

  
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full insurance details.", 400));
  }


  if ((!premiumFrom || !premiumTo) && !fixedPremium) {
    return next(
      new ErrorHandler(
        "Please either provide fixed premium or ranged premium.",
        400
      )
    );
  }

  if (premiumFrom && premiumTo && fixedPremium) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Premium together.", 400)
    );
  }


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

// Controller function to get all insurances posted by the logged-in user
export const getMyInsurances = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }
  const myInsurances = await Insurance.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myInsurances,
  });
});

export const updateInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }

  
  const { id } = req.params;
  let insurance = await Insurance.findById(id);

  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }


  insurance = await Insurance.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Insurance Updated!",
  });
});


export const deleteInsurance = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Insurance Seeker") {
    return next(
      new ErrorHandler("Insurance Seeker not allowed to access this resource.", 400)
    );
  }


  const { id } = req.params;
  const insurance = await Insurance.findById(id);

  // Check if insurance exists
  if (!insurance) {
    return next(new ErrorHandler("OOPS! Insurance not found.", 404));
  }

  await insurance.deleteOne();


  res.status(200).json({
    success: true,
    message: "Insurance Deleted!",
  });
});


export const getSingleInsurance = catchAsyncErrors(async (req, res, next) => {
  // Extract insurance ID from request params
  const { id } = req.params;

  try {
    
    const insurance = await Insurance.findById(id);

    // If insurance not found, return an error
    if (!insurance) {
      return next(new ErrorHandler("Insurance not found.", 404));
    }
    res.status(200).json({
      success: true,
      insurance,
    });
  } catch (error) {
   
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
