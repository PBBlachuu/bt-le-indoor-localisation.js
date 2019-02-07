const config = require('./config');

const getBeaconDistances = function(beacons){
    if (config.env === 'development-mac') return _fakeBeacons(beacons);
    else return _realBeacons();
}

const _fakeBeacons = function(beacons){
    return beacons.map(() => (Math.random(50, 100) * (1)).toFixed(4));
}

const _realBeacons = function(beacons){
    return true;
}

module.exports = {getBeaconDistances: getBeaconDistances};