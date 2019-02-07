const config = require('./server/config.js');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);


app.use(express.static(path.join(__dirname, 'client/static/css')));
app.use(express.static(path.join(__dirname, 'client/static/js')));

server.listen(config.port);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// app.listen(config.port, function(){ 
//     console.log(`bt-le-indoor-localisation.js server started on port ${config.port}`);
// });

