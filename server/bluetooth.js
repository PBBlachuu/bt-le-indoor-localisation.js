const config = require('./config');

let lastScanned = 0;

const getBeaconDistances = function(beacons){
    if (config.env === 'development-mac') return _fakeBeaconsRand(beacons);
    else return _realBeacons(beacons);
}

const _fakeBeaconsRand = function(beacons){
    return beacons.map(() => (Math.random(50, 100) * (1)).toFixed(4));
}

const _realBeacons = function(beacons){  
    return beacons.map(() => (Math.random(50, 100) * (1)).toFixed(4));
}

const scan = function(beacons){
    if (config.env !== 'development-mac') {
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
            let peripheralName = peripheral.advertisement.localName;

            if ((peripheralName == beacons[0].name) || (peripheralName == beacons[1].name) || (peripheralName == beacons[2].name)) {
                console.log(`Found my device: ${peripheralName}`);
                noble.stopScanning();               
                
                //save peripheral  to a variable
                myPeripheral = peripheral;
                myPeripheral.connect((err) => {
                    myPeripheral.updateRssi((error, rssi) => {
                        if(rssi < 0) console.log(`RSSI ${peripheralName}: ${rssi}`);
                        myPeripheral.disconnect((err) => {
                            setTimeout(() =>{
                                noble.startScanning();
                            }, 500);
                        });
                    });
                });
            }
        }

    }
}

module.exports = {getBeaconDistances: getBeaconDistances, scan: scan};