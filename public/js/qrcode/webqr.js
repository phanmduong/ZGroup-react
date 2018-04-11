// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c = 0;
var stype = 0;
var gUM = false;
var webkit = false;
var moz = false;
var v = null;

var vidhtml = '<video id="v" autoplay></video>';


function initCanvas(w, h) {
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if (stype != 1)
        return;
    if (gUM) {
        try {
            gCtx.drawImage(v, 0, 0);
            try {
                qrcode.decode();
            }
            catch (e) {
                console.log(e);
                setTimeout(captureToCanvas, 500);
            }
        }
        catch (e) {
            console.log(e);
            setTimeout(captureToCanvas, 500);
        }
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// function read(a)
// {
//     var html="<br>";
//     if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
//         html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
//     html+="<b>"+htmlEntities(a)+"</b><br><br>";
//     document.getElementById("result").innerHTML=html;
// }

function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
function success(stream) {
    // v.src = window.URL.createObjectURL(stream);
    gUM = true;
    setTimeout(captureToCanvas, 500);
}

function error(error) {
    gUM = false;

}

function load() {
    if (isCanvasSupported() && window.File && window.FileReader) {
        initCanvas(800, 600);
        qrcode.callback = read;
        document.getElementById("mainbody").style.display = "inline";
        setwebcam();
    }
    else {
        document.getElementById("mainbody").style.display = "inline";
        document.getElementById("mainbody").innerHTML = '<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>' +
            '<br><p id="mp2">sorry your browser is not supported</p><br><br>' +
            '<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
    }
}


function setwebcam() {
    document.getElementById("result").innerHTML = "- scanning -";
    if (stype == 1) {
        setTimeout(captureToCanvas, 500);
        return;
    }
    var n = navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v = document.getElementById("v");

    if (n.getUserMedia)
        n.getUserMedia({video: true, audio: false}, success, error);
    else if (n.mediaDevices.getUserMedia)
        n.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false})
            .then(success)
            .catch(error);
    else if (n.webkitGetUserMedia) {
        webkit = true;
        n.webkitGetUserMedia({video: true, audio: false}, success, error);
    }
    else if (n.mozGetUserMedia) {
        moz = true;
        n.mozGetUserMedia({video: true, audio: false}, success, error);
    }

    //document.getElementById("qrimg").src="qrimg2.png";
    //document.getElementById("webcamimg").src="webcam.png";

    // document.getElementById("qrimg").style.opacity=0.2;
    // document.getElementById("webcamimg").style.opacity=1.0;

    stype = 1;
    setTimeout(captureToCanvas, 500);
}
