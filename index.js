// require (import) nextISSTimesForMyLocation function
const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const printFlyOverTimes = function(flyOverTimes) {
  for (const flyOver of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyOver.risetime);
    const duration = flyOver.duration;
    console.log(`Next flyover at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the details!
  printFlyOverTimes(flyOverTimes);
});
