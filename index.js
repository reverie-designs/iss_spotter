// FINAL RESULT SHOULD LIKE:
// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
// const iss = require('./iss');
const nextISSTimesForMyLocation = require('./iss');


const decodePrintTime = function(arrayOfFlyovers) {
  for (let time of arrayOfFlyovers) {
    let seconds = time.duration;
    let risetime = time.risetime;
    let myDate = new Date(risetime * 1000);
    console.log('Next pass on',myDate.toGMTString() , seconds, 'seconds.');
  }
};

nextISSTimesForMyLocation((error, data) => {
  if (error) {
    console.log('Could Not PRINT flyovertime', error);
    return;
  } else {
    decodePrintTime(data);
  }
});


// ERROR CHECKING MODULAR FUNCTIONS============
// // const fetchCoordsByIP = require('./iss.js');
// // let ip = '66.207.199.230';
// let location = { latitude: '43.43630', longitude: '-80.50930' };
// //========================================THIS FUNCTION WORKS
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
//   return ip;
// });
// //===========================================THIS FUNCTION WORKS
// fetchCoordsByIP('99.236.151.171', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {
//     console.log('Your coordinates are:' , coordinates);
//     return coordinates;
//   }
// });

// //========================================NEW FUNCTION
// // function will return an object with key : response that will contain an array of objects with possible "risetime" key and "duration" key  "response": [{"risetime": TIMESTAMP, "duration": DURATION},...]

// fetchISSFlyOverTimes(location, (error, arrayOfFlyovers)=>{
//   if (error) {
//     console.log('Could Not retrieve flyover times', error);
//     return;
//   } else {
//     console.log('Your flyover times are: \n', arrayOfFlyovers);
//     return arrayOfFlyovers;
//   }
// });



// // ================================= NEW FUNCTION
// nextISSTimesForMyLocation((data, error)=>{
//   if (error) {
//     console.log('Could Not PRINT flyovertime', error);
//     return;
//   } else {
//     console.log('Your flyover times are: \n', data);
//     return data;
//   }
// });