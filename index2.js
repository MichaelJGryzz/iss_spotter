// require (import) nextISSTimesForMyLocation function
const { nextISSTimesForMyLocation } = require('./iss_promised');

// require (import) printFlyOverTimes function
const { printFlyOverTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((flyOverTimes) => printFlyOverTimes(flyOverTimes))
  .catch((error) => console.log("It didn't work: ", error.message));
