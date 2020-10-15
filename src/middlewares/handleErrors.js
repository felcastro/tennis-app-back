var sequelizeErrors = require("sequelize/lib/errors");
const YupValidationError = require("yup/lib/ValidationError");
const { GeneralError } = require("../helpers/errors");

function errorsFilter(errors) {
  return errors.map((e) => ({
    path: e.path,
    value: e.value,
    message: e.message,
  }));
}

function handleError(res, status, type, message, errors = []) {
  return res.status(status).json({
    type,
    errors: errorsFilter(errors),
    message,
  });
}

function handleErrors(err, req, res, next) {
  if (err instanceof GeneralError) {
    return handleError(res, err.getCode(), err.name, err.message);
  }
  if (err instanceof sequelizeErrors.ForeignKeyConstraintError) {
    console.log(err.stack);
    return handleError(
      res,
      422,
      "UnprocessableEntityError",
      "Um erro inesperado ocorreu"
    );
  }
  if (err instanceof sequelizeErrors.UniqueConstraintError) {
    return handleError(res, 409, "ConflictError", err.message, err.errors);
  }
  if (err instanceof sequelizeErrors.ValidationError) {
    return handleError(res, 400, "ValidationError", err.message, err.errors);
  }
  if (err instanceof YupValidationError) {
    return handleError(res, 400, "ValidationError", err.message, err.inner);
  }

  console.log(err.stack);
  return handleError(res, 500, "Error", "Um erro inesperado ocorreu");
}

module.exports = handleErrors;
