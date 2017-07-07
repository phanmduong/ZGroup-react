var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/pki/tls/private/www_colorme_vn.key'),
    cert: fs.readFileSync('/etc/pki/tls/certs/www_colorme_vn.crt')
};
var app = require('express')();
var https = require('https').Server(options, app);
var http = require('http').Server(app);

var io = require('socket.io')(https);
var Redis = require('ioredis');
var redis = new Redis(6379, 'redis1.d3zfqq.0001.apse1.cache.amazonaws.com');

redis.subscribe('colorme-channel', function (err, count) {
});
redis.on('message', function (channel, message) {
    console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

// This line is from the Node.js HTTPS documentation.

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://colorme.vn");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//     next();
// });

// // Create an HTTP service.
// http.createServer(app).listen(3030);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(3000, function () {
//     console.log('Listening on Port 3000');
// });

https.listen(3000, function () {
    console.log('Listening on Port 3000');
});