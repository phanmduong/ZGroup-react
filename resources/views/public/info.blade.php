<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png"
          href="http://d1j8r0kxyu9tj8.cloudfront.net/files/1511179246c69k0Hp02GbKewW.png" cph-ssorder="0">
    <link rel="icon" type="image/png" href="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>Color Me</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>


    <link href="/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">

</head>
<body class="profile" style="background:#d9d9d9">

    <div class="container" style="width: 1100px;margin:0 auto; margin-top: 100px; padding">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-contact" style="padding-bottom: 30px;">
                    <h3 class="card-title text-center" style="padding-bottom: 30px">Học
                        viên {{$user->name}}</h3>
                    <div class="col-md-9 row" style="margin: auto;">
                        <p>
                            <img src="{{$course->icon_url}}" style="border-radius: 50%; height: 50px">
                            &nbsp&nbsp
                            <span style="font-weight: 900">Tên lớp: </span>
                            {{$studyClass->name}}
                            &nbsp&nbsp
                            <span style="font-weight: 900">Thời gian: </span>
                            {{format_vn_short_datetime(strtotime($register->updated_at))}}
                            &nbsp&nbsp
                            <span style="font-weight: 900">Số tiền: </span>
                            {{$register->money}}
                            &nbsp&nbsp
                            @if($register->status == 1)
                                <strong style="color: green;">(Hoàn thành)</strong>
                            @else
                                <strong style="color: #761c19;">(Chưa hoàn thành)</strong>
                            @endif
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<!--  Plugins -->
<!-- Core JS Files -->
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-3.2.1.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-ui-1.12.1.custom.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/tether.min.js" type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/demo.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

<!--  Plugins for presentation page -->
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/main.js"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/jquery.sharrre.js"></script>

<script async defer src="https://buttons.github.io/buttons.js"></script>
</html>