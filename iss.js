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
  // fetch the coordinates for the IP address from ipwho.is API
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


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  // fetch the upcoming ISS flyover times for the provided coordinates from iss-flyover.herokuapp API
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null); // pass error to callback function
      return;
    }
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    // the body contains the flyover times sent back from the iss-flyover.herokuapp API server
    const flyOverTimes = body.response;
  
    // pass the flyover times to the callback function
    callback(null, flyOverTimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, cords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(cords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

// export nextISSTimesForMyLocation function which holds the three other nexted functions
module.exports = { nextISSTimesForMyLocation };
