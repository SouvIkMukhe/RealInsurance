import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
export const dbConnection = () => {
  // Use mongoose to connect to the MongoDB database using the provided URI
  mongoose
    .connect(process.env.MONGO_URI, {
      // Specify the name of the database
      dbName: "MERN_INSURNACE_BUYING_WEBAPP",
    })
    .then(() => {
      // Log a success message when the connection is established
      console.log("Connected to the database.");
    })
    .catch((err) => {
      // Log an error message if there's an issue with the database connection
      console.log(`Some error occurred. ${err}`);
    });
};
