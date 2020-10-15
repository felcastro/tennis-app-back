const yup = require("yup");

module.exports = ({ shape, path = "query" }) => async (req, res, next) => {
  const schema = yup.object().shape(shape);

  try {
    const validData = await schema.validate(req[path], {
      stripUnknown: true,
      abortEarly: false,
    });
    req[path] = validData;
    next();
  } catch (error) {
    return next(error)
  }
};
