var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var env = require('./socketEnv');

var redis = new Redis(env.REDIS_PORT, env.REDIS_HOST);
redis.subscribe(env.CHANNEL, function (err, count) {
});
redis.on('message', function (channel, message) {
    // console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});
http.listen(env.SOCKET_PORT, function () {
    console.log('Listening on Port ' + env.SOCKET_PORT);
});