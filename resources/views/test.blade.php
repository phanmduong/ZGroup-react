@extends('layouts.master')

@section('content')
    <p id="power">0</p>
@stop

@section('footer')
    <script src="{{ asset('js/socket.io-1.4.5.js') }}"></script>
    <script>
        var socket = io('http://colorme.vn:3000/');
        //        var socket = io('http://192.168.10.10:3000');
        socket.on("test-channel:test", function (data) {
            // increase the power everytime we load test route
            console.log(data);
            $('#power').text(parseInt($('#power').text()) + parseInt(data.power));
        });
    </script>
@stop