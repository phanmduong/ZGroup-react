<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title')</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    {{--<link rel="stylesheet" href="{{ URL::asset('css/materialize.min.css') }}"/>--}}

<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ URL::asset('css/common.css') }}?3"/>

    <link rel="stylesheet" href="{{ URL::asset('css/animate.css') }}"/>

    <link rel="stylesheet" href="{{ URL::asset('css/zmd.hierarchical-display.min.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/jquery.timepicker.css') }}"/>
    <script src="{{URL::asset('js/jquery-1.12.0.min.js')}}">
    </script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

    <link rel="stylesheet" type="text/css"
          href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/flick/jquery-ui.css">
    <link href="{{url('css/jquery.tagit.css')}}" rel="stylesheet" type="text/css">

    {{--<script src="//fast.eager.io/II2OmwIcNV.js"></script>--}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <script src="{{URL::asset('js/pickadate/lib/picker.js')}}"></script>
    <script src="{{URL::asset('js/pickadate/lib/picker.date.js')}}"></script>
    <script src="{{URL::asset('js/pickadate/lib/picker.time.js')}}"></script>
    <script src="{{URL::asset('js//jquery.timepicker.min.js')}}"></script>
    <script src="{{url('js/ckeditor/ckeditor.js')}}"></script>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
</head>
<body>
@section('sidebar')
    <header>
        <ul id="slide-out" class="side-nav fixed">
            @foreach($tabs as $tab)
                @if($tab->url=='#')
                    <li class="no-padding full-width" style="padding:0px">
                        <ul class="collapsible collapsible-accordion">
                            <li>
                                <a style="margin-left: 0;margin-right: 0;padding-left: 30px;"
                                   class="collapsible-header waves-effect waves-red">{{$tab->name}}</a>
                                <div class="collapsible-body">
                                    <ul>
                                        @foreach($tabs as &$c_tab)
                                            @if($c_tab->parent_id == $tab->id)
                                                <li class="{{($current_tab==$c_tab->id)?"tab-active":""}}"><a
                                                            style="margin-left: 0;margin-right: 0;padding-left: 45px;"
                                                            class="waves-effect waves-red"
                                                            href="{{url($c_tab->url)}}">{{$c_tab->name}}</a></li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                @else
                    @if($tab->parent_id==0)
                        <li style="padding:0px" class="full-width {{($current_tab==$tab->id)?"tab-active":""}}"><a
                                    style="margin-left: 0;margin-right: 0;padding-left: 30px;"
                                    class="waves-effect waves-red" href="{{ url($tab->url) }}">{{$tab->name}}</a>
                        </li>
                    @endif
                @endif
            @endforeach
        </ul>
        <nav>
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">toc</i></a>
            <ul class="right">

                <!-- Authentication Links -->
                @if (Auth::guest())
                    <li><a href="{{ url('/login') }}">Login</a></li>
                    <li><a href="{{ url('/register') }}">Register</a></li>
                @else
                    <li>
                        <a role="button" aria-expanded="false" href="{{url('/')}}">
                            Hi, {{ Auth::user()->name }} <span class="caret"></span>
                        </a>
                    </li>
                    <li><a href="{{ url('/logout') }}">Logout</a></li>
                @endif
            </ul>
        </nav>
    </header>
@show


<main>
    @yield('content')
</main>


{{--<script src="{{URL::asset('js/materialize.min.js')}}">--}}
{{--</script>--}}

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/js/materialize.min.js"></script>

<script src="{{URL::asset('js/jquery.zmd.hierarchical-display.min.js')}}">

</script>

<script type="text/javascript">
    $(document).ready(function () {
        $("li.tab-active").parents(".collapsible-body").prev().click();
        $(".button-collapse").sideNav();
//        $('.modal').modal();
    });
</script>
<script src="{{URL::asset('js/tag-it.js')}}"></script>
</body>
</html>
