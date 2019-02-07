// Business logic
const config = require('./server/config.js');
const data = require('./data/beacons');
const bluetooth = require('./server/bluetooth');
const trilateration = require('./server/trilateration');

// Dependencies
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Express giving access to static dependencies
app.use(express.static(path.join(__dirname, 'client/static/css')));
app.use(express.static(path.join(__dirname, 'client/static/js')));

server.listen(config.port);
console.log(`bt-le-indoor-localisation.js server started on port ${config.port}`);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

const time = setInterval(function() {
    const distances = bluetooth.getBeaconDistances(data.beacons);
    const beacons = data.beacons.map((element, index) => Object.assign({}, element, {distance: distances[index]}));
    io.emit('bt', beacons);
}, 1000);

