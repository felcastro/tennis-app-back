let yup = require("yup");

const place = {
  name: yup.string().min(1).max(255),
  address: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  website: yup.string().url(),
  latitude: yup.number().min(-90).max(90),
  longitude: yup.number().min(-180).max(180),
  opensAt: yup.string(),
  closesAt: yup.string(),
  rentTime: yup.number(),
};

module.exports = {
  get: {
    name: place.name,
    email: place.email,
    phone: place.phone,
    website: place.website,
    latitude: place.website,
    longitude: place.website,
    opensAt: place.website,
    closesAt: place.website,
    rentTime: place.website,
  },
  update: {
    name: place.name,
    opensAt: place.opensAt,
    closesAt: place.closesAt,
    email: place.email,
    phone: place.phone,
    website: place.website,
  },
};
