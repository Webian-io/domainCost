const http = require('http');
const express = require('express');
const path = require('path');
var domain = require('./routes/domain');
const app = express();
var config = require('./config.json');

// Set our api routes
app.use('/api', [domain]);

// Point static path to dist
app.use(express.static(path.join(__dirname, '..')));

// Catch all other routes and return the index file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = config.port;
http.createServer(app).listen(port, '127.0.0.1',  function() {
  console.log('port', port);
});
