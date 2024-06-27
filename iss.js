// import "needle" library
const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json`;

  // fetch the IP address data from ipify API
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null); // pass error to callback function
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    // the body contains the IP address sent back from the ipify API server
    const ip = body.ip;

    // pass the IP address to the callback function
    callback(null, ip);
  });
};


/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from JSON API
  const url =  `http://ipwho.is/${ip}`;

  // fetch the coordinates for the IP affress from ipwho.is API
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null); // pass error to callback function
      return;
    }

    //check if "success" is true or not
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // the body contains the coordinates sent back from the ipwho.is API server
    const latitude = body.latitude;
    const longitude = body.longitude;

    // pass the cooordinates to the callback function
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };