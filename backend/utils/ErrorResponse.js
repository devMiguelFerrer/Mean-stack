class ErrorResponse extends Error {
  constructor(menssage, statusCode) {
    super(menssage);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
