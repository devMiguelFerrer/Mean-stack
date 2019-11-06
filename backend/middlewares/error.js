const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);
  if (err.name === 'CastError') {
    const message = `Recurso no encontrado con ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  if (error.name === 'MongoError') {
    const message = `Los datos no son validos`;
    error = new ErrorResponse(message, 400);
  }

  if (error.name === 'ValidationError') {
    if (err.errors.email) {
      error = new ErrorResponse(err.errors.email.message, 400);
    } else if (err.errors.age) {
      error = new ErrorResponse(err.errors.age.message, 400);
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error del servidor'
  });
};

module.exports = errorHandler;
