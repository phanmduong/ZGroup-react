<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title')</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ URL::asset('css/materialize.min.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/login_common.css') }}"/>
    <script src="{{URL::asset('js/jquery-1.12.0.min.js')}}">
    </script>
</head>
<body>

@yield('content')


<script src="{{URL::asset('js/materialize.min.js')}}">
</script>
@yield('custom_script')
</body>
</html>
