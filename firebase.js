var firebase = require('firebase') ;

var configFirebase = {
    apiKey: "AIzaSyDUlqBwvFM7FkfHx4RQAqz2BJBa6EyLI7k",
    authDomain: "notificationkeetoolclient.firebaseapp.com",
    databaseURL: "https://notificationkeetoolclient.firebaseio.com",
    projectId: "notificationkeetoolclient",
    storageBucket: "notificationkeetoolclient.appspot.com",
    essagingSenderId: "829044054793"
};

module.exports = firebase.initializeApp(configFirebase);