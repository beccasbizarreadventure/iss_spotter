const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('8.8.4.4', (error, data) => {
  // console.log("Error: ", error);
  // console.log("Data: ", data);
});