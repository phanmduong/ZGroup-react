<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Techkids</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    {{--<link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/bootstrap.min.css" rel="stylesheet"/>--}}
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<title>Techkids</title>
</head>
<body>
@include('techkids::layouts.nav-bar')
@yield('content')
@include('techkids::layouts.footer')

</body>
</html>

{{--<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/bootstrap.min.js"--}}

{{--<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/paper-kit.js?v=2.0.0"></script>--}}
{{--<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-ui-1.12.1.custom.min.js"></script>--}}
<link rel="stylesheet" href="/assets/css/slick.css">
<link rel="stylesheet" href="/assets/css/slick-theme.css">
<link rel="stylesheet" href="/assets/css/techkids-normalize.css">
<link rel="stylesheet" href="/assets/css/techkids-normalize?ver=1.0.css">
<link rel="stylesheet" href="/assets/css/techkids-style?ver=1.0.css">
<link rel="stylesheet" href="/assets/css/techkids-style.css">

<script src="/assets/js/slick.min.js"></script>
<script src="/assets/js/techkids-main.js"></script>
<script src="/assets/js/techkids-bootstrap.min.js"></script>
<script src="/assets/js/techkids-scripts?ver=1.0.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet" href="/assets/css/techkids.css">
<link rel="stylesheet" href="/assets/css/nga.all.min.css">
@stack('scripts')
