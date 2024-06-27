// the code below is temporary and can be commented out.
// require (import) fetchMyIP and fetchCoordsByIP function
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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
  });
});
