const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// =============WORKING FUNCTION
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org/?format=json';
  request(url, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};
//=============END OF WORKING FUNCTION

// =====================Second WORKING FUNCTION FETCHES COORDINATES{LONG, LAT} FROM IP
const fetchCoordsByIP = function(ip, callback) {
  let url = 'https://ipvigilante.com/json/' + ip;
  request(url, (err, response, body)=> {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    body = JSON.parse(body);
    let coordinates = {};
    coordinates.latitude = body.data.latitude;
    coordinates.longitude = body.data.longitude;
    // console.log(coordinates);
    return callback(null, coordinates);
  });
};

//==========FUNCTION FETCHES ISS FLYOVER TIMES FROM COORDINATES{LONG, LAT}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = 'http://api.open-notify.org/iss-pass.json?lat=' + coords.latitude + '&' + 'lon=' + coords.longitude;
  request(url, (err, response, body)=> {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    body = JSON.parse(body);
    let flyOver = body.response;
    return callback(null, flyOver);
  });
};

//=================FUNCTION

const nextISSTimesForMyLocation = function(callback) {
  //========FETCH IP======
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    // FETCH LANG LATI WITH IP
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
      //FETCH FLYOVER TIMES WITH ABOVE COORDINATES
      fetchISSFlyOverTimes(coordinates, (error, arrayOfFlyovers) => {
        if (error) {
          return callback(error, null);
        }
        //RETURN FLYOVER TIME ARRAY
        return callback(null, arrayOfFlyovers);
      });
    });
  });
};

module.exports = nextISSTimesForMyLocation;
