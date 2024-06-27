// the code below is temporary and can be commented out.
// require (import) fetchMyIP function
const { fetchMyIP } = require('./iss');

// testing fetchMyIP function
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
