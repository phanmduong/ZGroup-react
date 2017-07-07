@extends('layouts.app')

@section('title','Quét QR code')

@section('content')

    <style type="text/css">
        #result {
            width: 100%;
            text-align: center;
        }

        img {
            border: 0;
        }

        #mainbody {
            background: white;
            width: 100%;
            display: none;
        }

        #v {
            width: 100%;
            height: 100%;
        }

        #qr-canvas {
            display: none;
        }

        .selector {
            margin: 0;
            padding: 0;
            cursor: pointer;
            margin-bottom: -5px;
        }

        #outdiv {
            width: 100%;
            height: 340px;
        }

        #result {
            border: solid;
            border-width: 1px 1px 1px 1px;
            padding: 20px;
            width: 100%;
        }


    </style>


    <script type="text/javascript" src="{{url('js/qrcode/llqrcode.js')}}"></script>
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
    <script type="text/javascript" src="{{url('js/qrcode/webqr.js')}}"></script>
    <div class="row">
        <div class="col s12">
            <select class="browser-default" id="video-source-select">
            </select>
        </div>

    </div>

    <div class="row">

        <div class="col s12 m6 push-m3">
            <div id="mainbody">
                <div id="outdiv">
                    <video id="v" autoplay></video>
                </div>


            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12" style="text-align: center">
            <a class="waves-effect waves-light btn red darken-4 white-text" id="reset-qrcode" onclick="reset_qrcode()">Scan</a>
        </div>
    </div>
    <div class="row">
        <div id="result"></div>
    </div>
    <div id="student-result">

    </div>
    <canvas id="qr-canvas" width="800" height="600"></canvas>
    <script type="text/javascript">
        function read(a) {
//            var html="<br>";
//            if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
//                html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
//            html+="<b>"+htmlEntities(a)+"</b><br><br>";
            document.getElementById("result").innerHTML = a;
            $('#student-result').html("<div class='row blue-text' style='text-align: center;' >Đang lấy thông tin học viên...</div>");
            $.post(
                    '{{url('ajax/getattendancesbycode')}}',
                    {
                        _token: '{{csrf_token()}}',
                        code: a
                    },
                    function (data, status) {
                        $('#student-result').html(data);
                    }
            );
            $('#reset-qrcode').show();
        }
    </script>
    <script type="text/javascript">load();</script>
    <script>
        function change_attend_status(attendance_id) {
            $.post('{{url('manage/changeattendstatus')}}', {
                '_token': '{{csrf_token()}}',
                'attendance_id': attendance_id
            }, function (data, status) {
                console.log(data);
            });
        }

        $('#reset-qrcode').hide();
        function reset_qrcode() {
            $('#reset-qrcode').hide();
            $('#result').html('-scanning-');
            $('#student-result').html("");
            setTimeout(captureToCanvas, 500);
        }
        var videoElement = document.querySelector('video');

        navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        function successCallback(stream) {
            var videoElement = document.querySelector('video');
            window.stream = stream; // make stream available to console
            videoElement.src = window.URL.createObjectURL(stream);
            videoElement.play();

        }

        function errorCallback(error) {
            console.log('navigator.getUserMedia error: ', error);
        }
        function sourceSelected(videoSource) {

            if (window.stream) {
                videoElement.src = null;
                window.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            var constraints = {
                video: {
                    optional: [{sourceId: videoSource}]
                }
            };

            navigator.getUserMedia(constraints, successCallback, errorCallback);
        }


        MediaStreamTrack.getSources(function (sourceInfos) {
            var videoSource = null;

            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === 'video') {
//                    videoSource = sourceInfo.id;
                    console.log(sourceInfo.id, sourceInfo.label || 'camera');
                    console.log(i);
                    if (videoSource == null) {
                        $('#video-source-select').append("<option selected value='" + sourceInfo.id + "'>" + sourceInfo.label + "</option>");
                        videoSource = sourceInfo.id;
                    } else {
                        $('#video-source-select').append("<option value='" + sourceInfo.id + "'>" + sourceInfo.label + "</option>");
                    }


                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }

            sourceSelected(videoSource);
        });


        $(document).ready(function () {
            $("#video-source-select").on("change", function (e) {
                var sourceId = $(this).val();
                sourceSelected(sourceId);
            });
        })
    </script>

@endsection
