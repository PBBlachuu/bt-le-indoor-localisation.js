const config = require('./server/config.js');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const data = require('./data/beacons');


app.use(express.static(path.join(__dirname, 'client/static/css')));
app.use(express.static(path.join(__dirname, 'client/static/js')));

server.listen(config.port);
console.log(`bt-le-indoor-localisation.js server started on port ${config.port}`);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

const time = setInterval(function() {
    //object.x += 0.5;
    //io.emit('bt', object);
}, 2000);

