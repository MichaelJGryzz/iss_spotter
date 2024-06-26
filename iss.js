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
  const url = `https://api.ipify.org?formal=json`;

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

    // the body contains the IP address sent back from the ipify API server, parse it
    const ip = body;

    // pass the IP address to the callback function
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };