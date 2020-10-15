class GeneralError extends Error {
  constructor(message) {
    super();
    this.error = "GeneralError"
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {
  constructor(message) {
    super();
    this.name = "BadRequestError";
    this.message = message;
  }
}

class Unauthorized extends GeneralError {
  constructor(message) {
    super();
    this.name = "UnauthorizedError";
    this.message = message;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super();
    this.name = "NotFoundError";
    this.message = message;
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  Unauthorized,
  NotFound,
};
