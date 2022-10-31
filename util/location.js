const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "Gacx01RSSTp2ebW06gAdsDUEitPvgRgV";

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `http://open.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${encodeURIComponent(
      address
    )}
    `
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for this particular address",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].locations[0].latLng;
  return coordinates;
};

module.exports = getCoordsForAddress;
