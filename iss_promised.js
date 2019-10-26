const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  const url = 'https://ipvigilante.com/json/' + ip;
  return request(url);
};
const fetchISSFlyOverTimes = function(location) {
  let data = JSON.parse(location).data;
  const lat = data.latitude;
  const long = data.longitude;
  const url = 'http://api.open-notify.org/iss-pass.json?lat=' + lat + '&' + 'lon=' + long;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const arrayOfFlyovers = JSON.parse(data).response;
      return arrayOfFlyovers;
    });
};

module.exports = { nextISSTimesForMyLocation };

