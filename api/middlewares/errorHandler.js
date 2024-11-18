// errorHandler.js

// Utility function to create custom errors
export const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  };
  
  // Middleware to handle errors
  export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Default to 500 if no status is provided
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
    });
  };
  