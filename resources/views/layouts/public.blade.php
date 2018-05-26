<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title')</title>
    <meta property="article:author" content="https://www.facebook.com/ColorME.Hanoi/"/>
    <meta name="google-site-verification" content="xtTa2p_KrROT2c7_IyShaw1KDt3iIvZ9c_bufAvYhvs"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport">

    {{--Facebook share info--}}
    @yield('fb-info')

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.min.css">
    {{--<link rel="stylesheet" href="{{ URL::asset('css/materialize.min.css') }}"/>--}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ URL::asset('css/public_common.css') }}"/>
    {{--<link rel="stylesheet" href="{{ URL::asset('css/loading.css') }}"/>--}}
    <link rel="stylesheet" href="{{ URL::asset('css/hover-min.css') }}"/>
    {{--    <link rel="stylesheet" href="{{ URL::asset('css/zmd.hierarchical-display.min.css') }}"/>--}}
    <link rel="stylesheet" href="{{URL::asset('css/rating.min.css') }}"/>
    <link rel="stylesheet" href="{{URL::asset('css/angular-datepicker.min.css') }}"/>
    <link rel="stylesheet" type="text/css"
          href="https://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/flick/jquery-ui.css">
    <link href="{{url("css/jquery.tagit.css")}}" rel="stylesheet" type="text/css">

    <script src="{{URL::asset('js/jquery-1.12.0.min.js')}}"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="{{URL::asset('js/loading/modernizr.custom.js')}}"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>

    {{--<script src="//fast.eager.io/II2OmwIcNV.js"></script>--}}
    <style>
        #profile-cover-content {
            width: 70%;
            position: absolute;
            /*top: 55%;*/
            bottom: 5px;
            left: 14.40%;
            margin-bottom: 5px;
        }

        #profile-cover {
            margin: 0 auto;
            top: -20px;
            position: relative;
            width: 100%;
            height: 400px;
            background: no-repeat url('{{isset($cover)?$cover:url("../img/banner.jpg")}}');
            -webkit-background-size: cover;
            background-size: cover;
            background-position: center;
            transition: width 1s;
        }
    </style>

    <!-- Global site tag (gtag.js) - Google AdWords: 923433004 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-923433004"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'AW-923433004');
        gtag('config', 'UA-110883203-1');
    </script>


    <!-- Event snippet for Chuyển đổi Photoshop conversion page
    In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
    <script>
        function gtag_report_conversion(url) {
            var callback = function () {
                if (typeof(url) != 'undefined') {
                    window.location = url;
                }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-923433004/TwIhCKXaiHoQrPCpuAM',
                'event_callback': callback
            });
            return false;
        }
    </script>


</head>
<body>
<ul id="faq" class="collapsible" data-collapsible="accordion"
    style="border:none;margin-bottom:0;width:340px;position:fixed;bottom:0;left:0;z-index:9999;">
    <li>
        <div class="collapsible-header"
             style="font-weight:bold;background-color:#c50000;border:1px solid #c50000;color:white"><i
                    class="material-icons">question_answer</i>Hỏi đáp với colorME
        </div>
        <div class="collapsible-body" style="background-color:#f7f7f7">
            <div style="width:340px;height:500px;">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcolorme.hanoi&tabs=messages&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1787695151450379"
                        style="border:none;overflow:hidden;height:100%;width:100%"
                        scrolling="no" frameborder="0" allowTransparency="true">
                </iframe>
            </div>
        </div>
    </li>
</ul>

@include('components/navbar', ['user' => isset($user)?$user:null])

@include('components/liked_users_modal')

<main style="margin-top: 50px;">
    @yield('content')
</main>
@if(isset($user))
    @include('components.fab-btn',['user' => isset($user)?$user:null, 'target_user' => isset($target_user)?$target_user:null])
@endif
{{--<script src="{{URL::asset('js/materialize.min.js')}}"></script>--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
<script src="{{URL::asset('js/jquery.zmd.hierarchical-display.min.js')}}"></script>
{{--<script src="{{URL::asset('js/init.js')}}"></script>--}}
{{--<script src="{{URL::asset('js/jquery.onscreen.min.js')}}"></script>--}}
<script src="{{URL::asset('js/loading/masonry.pkgd.min.js')}}"></script>
<script src="{{URL::asset('js/loading/imagesloaded.js')}}"></script>
<script src="{{URL::asset('js/loading/classie.js')}}"></script>
{{--<script src="{{URL::asset('js/loading/AnimOnScroll.js')}}"></script>--}}
<script src="{{URL::asset('js/rating.min.js')}}"></script>
<script src="{{URL::asset('js/tag-it.js')}}"></script>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>

<script type="text/javascript">
    var preloader =
        '<div style="width:100%;text-align:center;padding-top:15px">' +
        '<div class="preloader-wrapper active">' +
        '<div class="spinner-layer spinner-red-only">' +
        '<div class="circle-clipper left">' +
        '<div class="circle"></div>' +
        '</div><div class="gap-patch">' +
        '<div class="circle"></div>' +
        '</div><div class="circle-clipper right">' +
        '<div class="circle"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var isLoading = false;

    function load_notifications(page) {
        if (!isLoading) {
            isLoading = true;
            $("#notification-loading").html(" Đang tải...");
            $.get("{{url("loadnotifications?p=")}}" + page, function (data) {
                notinumber = 0;
                $("#notificationsBody").append(data);
                $("#notificationsPreloader").html("");
                $("#notification-loading").html("");
                isLoading = false;
            });
        }
    }

    $(document).ready(function () {
        $('#notificationsBody').on('mousewheel', function (e) {
            var event = e.originalEvent,
                d = event.wheelDelta || -event.detail;

            this.scrollTop += (d < 0 ? 1 : -1) * 30;
            e.preventDefault();
        });

        var notificationsPage = 1;
        var isLoading = false;
        $('#notificationsBody').on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - 200)) {
                console.log('end reached');
                // $("#notificationsPreloader").html(preloader);

                load_notifications(notificationsPage);

                notificationsPage += 1;

            }
        });
        $("#notificationsPreloader").html(preloader);
        $("#notificationLink").click(function () {
            $("#notificationContainer").fadeToggle(100);
            notificationsPage = 1;
            $("#notificationsPreloader").html(preloader);
            $("#notificationsBody").html("");
            load_notifications(notificationsPage);
            notificationsPage += 1;
            $('.noti-icon').addClass("no-noti");
            $('.noti').css('display', 'none');
            // $("#notification_count").fadeOut("slow");
            return false;
        });

        //Document Click hiding the popup 
        $(document).click(function () {
            $("#notificationContainer").hide();
            $("#notificationsPreloader").html(preloader);
            $('#notificationsBody').html("");
        });

        //Popup on click
        $("#notificationContainer").click(function (event) {
            console.log("hi");
            event.stopPropagation();
        });

    });
</script>

<script>
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1787695151450379',
            xfbml: true,
            version: 'v2.6'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
<script>


    function submitRating(register_id) {

        $('#btn_send_rating_container' + register_id).html('<strong class="blue-text">Đang gửi đánh giá....</strong>');
        $.post(
            '{{url('ajax/storerating')}}',
            {
                _token: '{{csrf_token()}}',
                rating_teacher: $('#rating_teacher_input' + register_id).val(),
                rating_ta: $('#rating_ta_input' + register_id).val(),
                comment_teacher: $('#comment_teacher' + register_id).val(),
                comment_ta: $('#comment_ta' + register_id).val(),
                register_id: register_id
            },
            function (data, status) {
                $('#rating-container' + register_id).html(data);
            }
        )
    }

    function toggle_like(product_id) {

        var total_likes = parseInt($('#total_likes' + product_id).html());
        $('#btn-like-' + product_id).toggleClass('liked');
        if ($('#btn-like-' + product_id).hasClass('liked')) {
            $('#total_likes' + product_id).html(total_likes + 1);

        } else {
            $('#total_likes' + product_id).html(total_likes - 1);

        }

        $('#btn-full-image-like').toggleClass('liked');
        if ($('#btn-full-image-like').hasClass('liked')) {
            $('#full-image-total-like').html(total_likes + 1);
        } else {
            $('#full-image-total-like').html(total_likes - 1);
        }


        $.post(
            '{{url('storelike')}}',
            {
                product_id: product_id,
                _token: '{{csrf_token()}}',
            }
            ,
            function (data, status) {
//                        $('#total_likes'+product_id).html(data);
                var return_data = JSON.parse(data);
                var total_likes = return_data.total_likes;
                like_id = return_data.like_id;
                $('#total_likes' + product_id).html(total_likes);
                $('#full-image-total-like').html(total_likes);
            }
        )
        ;
    }


    function displayNoti(data) {
        $('.noti').css('display', 'inline');
        $('.noti-icon').removeClass("no-noti");
        $('.noti').text(data);
    }

    var notinumber = 0;

    function getNotifications() {
        $.post(
            '{{url('notifications/count')}}',
            {
                _token: '{{csrf_token()}}'
            },
            function (data, status) {
                if (data > 0) {
                    displayNoti(data);
                    notinumber = data;
                }
            }
        );
    }

    $(document).ready(function () {

        getNotifications();
//        setInterval(function () {
//            getNotifications();
//        }, 3000);

    });

    //Detect Navbar
    $(document).ready(function () {
        var scrWidth = window.innerWidth;
        if (scrWidth > 800) {
            $('#new-nav-small-screen').css('display', 'none');
        } else {
            $('#new-nav').css('display', 'none');
        }
    });
    $(window).bind('resize', function () {
        if (window.innerWidth < 993) {
            $('#new-nav').css('display', 'none');
            $('#new-nav-small-screen').css('display', 'initial');
        } else {
            $('#new-nav-small-screen').css('display', 'none');
            $('#new-nav').css('display', 'initial');
        }
    });

    //Trigger dropdown
    $(".dropdown-button-new").click(function () {
        if ($("#new-nav").is(':visible')) {
            $("#dropdown2").toggle(200);
        } else if ($("#new-nav-small-screen").is(':visible')) {
            $("#dropdown3").toggle(200);
        }
    });
    $("body").click(function (e) {
//        alert(e.target + e.target.id + e.target.className);
            if (e.target.className !== "fa fa-sort-down" && e.target.className !== "dropdown-item") {
                $("#dropdown2").hide(200);
                $("#dropdown3").hide(200);
            }
        }
    );
    var masonry;

    function initGallery() {
        if ($('.product-item').length) {
            masonry = new Masonry('.product-list', {
                // options...
                itemSelector: '.product-item'
            });
        }
    }

    //FAB Toggle function
    $(document).ready(function () {
        setFABtoggle();
    });

    $(window).resize(function () {
        if (window.innerWidth < 993) {
            $('.fixed-action-btn').addClass('click-to-toggle');
        } else {
            $('.fixed-action-btn').removeClass('click-to-toggle');
        }
    });

    var setFABtoggle = function () {
        if (window.innerWidth < 993) {
            $('.fixed-action-btn').addClass('click-to-toggle');
        } else {
            $('.fixed-action-btn').removeClass('click-to-toggle');
        }
    };

    //Remove FAQ-section when mobile
    function set_faq() {
        if (window.innerWidth < 600) {
            $('#faq').css('display', 'none');
        } else {
            $('#faq').css('display', 'block');
        }
        console.log;
    }

    $(window).resize(function () {
        set_faq();
    });

    $(document).ready(function () {
        set_faq();
    });


    //Fixed Navigation trang giao trinh
    function fixNavigation() {
        var top = $(window).scrollTop();
        $('#navigation').css('margin-top', top);
//        console.log(top);
    }

    function removeFixNavigation() {
        $('#navigation').css('margin-top', 0);
    }

    $(document).ready(function () {
        if ($(window).innerWidth() > 600) {
            $(window).bind("scroll", function () {
                fixNavigation();
            });
        }
    });

    $(window).bind("resize", function () {
        if ($(window).innerWidth() < 600) {
            $(window).unbind("scroll");
            removeFixNavigation();
        } else {
            $(window).bind("scroll", function () {
                fixNavigation();
            });
        }
    });


</script>

@if(isset($user))
    <script>
        var user_id = {{$user->id}};
        var socket = io('http://colorme.vn:3000/');
        //        var socket = io('http://localhost:3333');
        socket.on("colorme-channel:notification", function (data) {
            console.log(data);
            if (user_id && user_id == data.receiver_id) {
                notinumber += 1;
                Materialize.toast("<a style='color:white' href='" + data.link + "'>" + data.message + "</a>", 5000);
                displayNoti(notinumber);
            }
        });
    </script>
@endif
<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-74966893-1', 'auto');
    ga('send', 'pageview');


</script>

<!-- Facebook Pixel Code -->
<script>
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '296964117457250');
    fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
               src="https://www.facebook.com/tr?id=296964117457250&ev=PageView&noscript=1"
    /></noscript>
<!-- End Facebook Pixel Code -->


<script type="text/javascript">
    /* <![CDATA[ */
    var google_conversion_id = 923433004;
    var google_custom_params = window.google_tag_params;
    var google_remarketing_only = true;
    /* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
    <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt=""
             src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/923433004/?guid=ON&amp;script=0"/>
    </div>
</noscript>

</body>
</html>
