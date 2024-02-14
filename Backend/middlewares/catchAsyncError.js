// Function to wrap an asynchronous function with error handling using Promise.resolve
export const catchAsyncErrors = (theFunction) => {
  // Return a new function that takes request, response, and next as parameters
  return (req, res, next) => {
    // Wrap the asynchronous function with Promise.resolve to handle errors
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
