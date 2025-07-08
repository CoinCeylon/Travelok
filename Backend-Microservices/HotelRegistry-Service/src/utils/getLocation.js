const axios = require("axios");

async function getCoordinates(location) {
    const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
            q: location,
            key: process.env.OPENCAGE_API_KEY
        }
    });

    const { lat, lng } = res.data.results[0].geometry;
    return { lat, lng };
}

module.exports = { getCoordinates };