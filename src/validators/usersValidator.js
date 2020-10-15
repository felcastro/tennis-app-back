let yup = require("yup");

const user = {
  name: yup.string().min(4).max(100),
  email: yup.string().email(),
  password: yup.string().min(6).max(100),
  birth: yup.date(),
  latitude: yup.number().min(-90).max(90),
  longitude: yup.number().min(-180).max(180),
  placesSearchDistance: yup.number().min(5).max(100),
  levelId: yup.number(),
};

module.exports = {
  get: {
    name: user.name,
    email: user.email,
    birth: user.birth,
    levelId: user.levelId,
  },
  signIn: {
    email: user.email.required(),
    password: user.password.required(),
  },
  create: {
    name: user.name.required(),
    birth: user.birth.required(),
    email: user.email.required(),
    password: user.password.required(),
  },
  update: {
    name: user.name.required(),
    birth: user.birth,
    latitude: user.latitude,
    longitude: user.longitude,
    placesSearchDistance: user.placesSearchDistance,
    levelId: user.levelId,
  },
};
