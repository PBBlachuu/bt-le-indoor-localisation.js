const config = require('./server/config.js');
const express = require('express');
const app = express();

app.listen(config.port, function(){ 
    console.log(`bt-le-indoor-localisation.js server started on port ${config.port}`);
});