const {nextISSTimesForMyLocation} = require('./iss_promised');

const decodePrintTime = function(arrayOfFlyovers) {
  for (let time of arrayOfFlyovers) {
    let seconds = time.duration;
    let risetime = time.risetime;
    let myDate = new Date(risetime * 1000);
    console.log('Next pass on',myDate.toGMTString() , seconds, 'seconds.');
  }
};
nextISSTimesForMyLocation()
  .then(arrayOfFlyovers => {
    decodePrintTime(arrayOfFlyovers);
  })
  .catch((error) => {
    console.log('Oops something didn\'t work', error.message);
  });

// .then(coordinates => console.log(coordinates))