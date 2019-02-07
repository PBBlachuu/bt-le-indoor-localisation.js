const config = require('./config');

let lastScanned = 0;
let distances = [0, 0, 0];

const getBeaconDistances = function(beacons){
    src = process.env.SRC || 'one'
    if (src === 'rand') return _fakeBeaconsRand(beacons);
    if (src === 'one') return _fakeBeaconsOne(beacons);
    if (src === 'real') return _realBeacons(beacons);
}

const _fakeBeaconsRand = function(beacons){
    return beacons.map(() => (Math.random(50, 100) * (1)).toFixed(4));
}

const _fakeBeaconsOne = function(beacons){
    return beacons.map(() => 1)
}

const _realBeacons = function(beacons){  
    return distances;
}

const _calculateDistance = function(n, rssi){
    if (rssi < 0) {
        // Calculate the distance
        let distance = Math.pow(10, (-43 - rssi) / (10 * 2.5));
        distances[n] = distance;
    }
}

const scan = function(beacons){
    if (process.env.SRC === 'real') {
        const noble = require('noble');

        noble.on('stateChange', scan);

        function scan(state){
            if (state === 'poweredOn') {
                noble.startScanning();
                console.log('Started scanning');   
            } else {
                noble.stopScanning();
                console.log('Is Bluetooth on?');
            }
        }

        noble.on('discover', discoverPeripherals);

        function discoverPeripherals(peripheral) {
            if (lastScanned == 3) lastScanned = 0;
            if ((peripheral.advertisement.localName == beacons[lastScanned].name)) {
                console.log(`Found my device: ${peripheral.advertisement.localName}`);
                noble.stopScanning();               
                
                //save peripheral  to a variable
                myPeripheral = peripheral;
                myPeripheral.connect((err) => {
                    myPeripheral.updateRssi((error, rssi) => {
                        if(rssi < 0) console.log(`RSSI ${peripheral.advertisement.localName}: ${rssi}`);
                        _calculateDistance(lastScanned, rssi);
                        lastScanned++;
                        myPeripheral.disconnect((err) => {
                            setTimeout(() => {
                                noble.startScanning();
                            }, 100);
                        });
                    });
                });
            }
        }

    }
}

module.exports = {getBeaconDistances: getBeaconDistances, scan: scan};