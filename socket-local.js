var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var htmlToText = require('html-to-text');
var redis = new Redis('6379', '192.168.10.10');
var env = require('./socketEnv');
redis.subscribe('colorme-channel', function (err, count) {
});
redis.on('message', function (channel, message) {
    console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
    if (message.data && message.data.receiver_id) {
        sendNotification(message.data);
    }
});
http.listen(3333, function () {
    console.log('Listening on Port 3333');
});

var sendNotification = function (notification) {
    var text = htmlToText.fromString(notification.message, {
        wordwrap: 130
    });

    var data = {
        app_id: env.NOTI_APP_ID,
        contents: {"en": text},
        filters: [
            {"field": "tag", "key": "user_id", "relation": "=", "value": notification.receiver_id}
        ]
    };

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + env.NOTI_APP_KEY
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};