var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var env = require('./socketEnv');

var redis = new Redis(env.REDIS_PORT, env.REDIS_HOST);
var firebaseApp = require('./firebase');
var firebase = require('firebase');
var axios = require('axios');
var env = require('./socketEnv');
var htmlToText = require('html-to-text');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet

var database = firebaseApp.database();

axios.defaults.baseURL = 'https://fcm.googleapis.com';
axios.defaults.headers.common['Authorization'] = "key=AIzaSyDRmIyGyivUcacVAxmwVpC-VtcH5t_tQnQ";
axios.defaults.headers.post['Content-Type'] = 'application/json';

redis.subscribe(env.CHANNEL, function (err, count) {
});

redis.on('message', function (channel, message) {
    // console.log('Message Recieved: ' + message);
    message = JSON.parse(message);

    if (message.event === 'add_token_browser') {
        addTokenBrowser(message.data.user_id, message.data.token);
    } else {
        io.emit(channel + ':' + message.event, message.data);
        if (message.data && message.data.receiver_id) {
            sendNotificationBrowser(message.data);
        }
    }
});
http.listen(env.SOCKET_PORT, function () {
    console.log('Listening on Port ' + env.SOCKET_PORT);
});


function setNotification(notification, tokenBrowser) {
    var text = htmlToText.fromString(notification.message, {
        wordwrap: 130
    });
    axios.post('/fcm/send', {
        "notification": {
            "title": "Thông báo",
            "body": text,
            "icon": env.LOGO_NOTIFICATION,
            "click_action": env.PROTOCOL + 'manage.' + env.DOMAIN + notification.link
        },
        "to": tokenBrowser
    }).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}

function addTokenBrowser(userId, token) {
    var domain = env.DOMAIN.replace(/\./g, "_");
    var userRef = database.ref(`client/${domain}/user/${userId}`);
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    var key = token;
    userRef.update({
        [key]: {
            token: token,
            timestamp
        }
    });
}

function sendNotificationBrowser(data) {
    var domain = env.DOMAIN.replace(/\./g, "_");
    database.ref(`client/${domain}/user/${data.receiver_id}`).once('value').then(function (snapshot) {
        snapshot.forEach(function (item) {
            setNotification(data, item.val().token);
        });
    });
}