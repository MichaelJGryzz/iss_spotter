// import "needle" library
const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  // fetch the IP address data from ipify API in JSON
  return needle('get', `https://api.ipify.org?format=json`)
  .then((response) => {
    // retrieve the body value from the response object
    const body = response.body;
    // the body contains the IP address sent back from the ipify API server
    const ip = body.ip;
    // return the IP address
    return ip;
  });
};


/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(ip) {
  // fetch the coordinates for the IP address from ipwho.is API
  return needle('get', `http://ipwho.is/${ip}`)
  .then((response) => {
    // the body contains the coordinates sent back from the ipwho.is API server
    const body = response.body;
    // retrieve latitude and longitude from the body
    const latitude = body.latitude;
    const longitude = body.longitude;
    // return the cooordinates
    return{ latitude, longitude };
  });
};


const fetchISSFlyOverTimes = function(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  // fetch the upcoming ISS flyover times for the provided coordinates from iss-flyover.herokuapp API in JSON
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  .then((response) => {
    // the body contains the flyover times sent back from the iss-flyover.herokuapp API server
    const body = response.body;
    // retrieve flyover times from the body
    const flyOverTimes = body.response;
    // pass the flyover times to the callback function
    return flyOverTimes;
  });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then((flyOverTimes) => {
    return flyOverTimes;
  });
};


// export nextISSTimesForMyLocation function
module.exports = { nextISSTimesForMyLocation };
