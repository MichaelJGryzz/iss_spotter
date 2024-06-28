// the code below is temporary and can be commented out.
// require (import) fetchMyIP, fetchCoordsByIP and etchISSFlyOverTimes functions
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// testing fetchMyIP function
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  // testing fetchCoordsByIP function
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    console.log('It worked! Returned coordinates:' , coords);

    // testing fetchISSFlyOverTimes function
    fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }

      console.log('It worked! Returned flyover times:' , flyOverTimes);
    });
  });
});
