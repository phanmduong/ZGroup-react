var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var htmlToText = require('html-to-text');
var env = require('./socketEnv');

var redis = new Redis(env.REDIS_PORT, env.REDIS_HOST);
redis.subscribe(env.CHANNEL, function (err, count) {
});
redis.on('message', function (channel, message) {
    // console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
    if (message.event === 'notification' && message.data && message.data.receiver_id) {
        sendNotificationUser(message.data);
        sendNotification(message.data, env.NOTI_APP_MANAGE_ID, env.NOTI_APP_MANAGE_KEY);
        sendNotification(message.data, env.NOTI_APP_ID, env.NOTI_APP_KEY);
    }
});
http.listen(env.SOCKET_PORT, function () {
    console.log('Listening on Port ' + env.SOCKET_PORT);
});


var sendNotificationUser = function (notification) {
    switch (notification.type) {
        case 'social':
            notification.device_type = 'social';
            notification.url = env.PROTOCOL + env.DOMAIN + notification.link;
            return sendNotification(notification, env.NOTI_APP_ID, env.NOTI_APP_KEY);
        case 'mobile_social':
            notification.device_type = 'mobile_social';
            notification.url = '';
            return sendNotification(notification, env.NOTI_APP_ID, env.NOTI_APP_KEY);
        case 'manage':
            notification.device_type = 'manage';
            notification.url = env.PROTOCOL + 'manage.' + env.DOMAIN + notification.link;
            return sendNotification(notification, env.NOTI_APP_MANAGE_ID, env.NOTI_APP_MANAGE_KEY);
        case 'mobile_manage':
            notification.device_type = 'mobile_manage';
            notification.url = '';
            return sendNotification(notification, env.NOTI_APP_MANAGE_ID, env.NOTI_APP_MANAGE_KEY);
        default:
            return;
    }
};
var sendNotification = function (notification, appID, appKey) {
    var text = htmlToText.fromString(notification.message, {
        wordwrap: 130
    });

    var filter = [
        {"field": "tag", "key": "user_id", "relation": "=", "value": notification.receiver_id}
    ]

    if (notification.device_type) {
        filter.push(
            {"field": "tag", "key": "device_type", "relation": "=", "value": notification.device_type}
        );
    }

    var data = {
        app_id: appID,
        contents: {"en": text, "vi": text},
        filters: filter,
        url: notification.url
    };

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + appKey
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
            console.log(data);
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};