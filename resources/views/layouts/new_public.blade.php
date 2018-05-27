<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="keywords" content="">

    <meta name="author" content="">
    <!-- Mobile Specific Metas
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="x-ua-compatible" content="IE=9">
    <!-- Font Awesome -->
    <link href="/colorme-assets/stylesheets/font-awesome.css" rel="stylesheet">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <!--headerIncludes-->
    <!-- CSS
    ================================================== -->
    <link rel="stylesheet" href="/colorme-assets/stylesheets/menu.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/flat-ui-slider.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/base.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/skeleton.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/landings.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/main.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/landings_layouts.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/box.css">
    <link rel="stylesheet" href="/colorme-assets/stylesheets/pixicon.css">
    <link href="/colorme-assets/assets/css/animations.min.css" rel="stylesheet" type="text/css" media="all" />

    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '473665779700860');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=473665779700860&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->
</head>
<body>

@yield('content')

<div class="pixfort_text_4 dark pix_builder_bg" id="section_footer_3_dark" style="outline-offset: -3px;">
    <div class="footer3">
        <div class="container ">
            <div class="five columns alpha pix_text">
                <div class="content_div area_1">
                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513657350X8wypgWgbJFb0eV.jpg"
                         class="pix_footer_logo" alt=""
                         style="border-radius: 0px; border-color: rgb(255, 255, 255); border-style: none; border-width: 1px; width: 50px; height: 50px;">
                    <p class="small_text editContent">COLORME<strong><br>
                            GRAPHICS DESIGN SCHOOL
                        </strong></p>
                    {{--<ul class="bottom-icons">--}}
                    {{--<li><a class="pi pixicon-facebook2" href="https://facebook.com/colorme.hanoi" src="images/uploads/logo1.jpg" style="color: rgb(238, 238, 238); font-size: 18px; background-color: rgba(0, 0, 0, 0);"></a></li>--}}

                    {{--<li><a class="pi pixicon-instagram" href="https://instagram.com/colorme.hanoi" src="images/uploads/logo1.jpg" style="color: rgb(238, 238, 238); font-size: 18px; background-color: rgba(0, 0, 0, 0);"></a></li>--}}
                    {{--</ul>--}}
                </div>
            </div>
            <div class="three columns">
                <div class="content_div area_2">
                    <span class="pix_text"><span class="editContent footer3_title" style="">Điều hướng</span></span>
                    <ul class="footer3_menu">
                        <li><a href="http://colorme.vn" class="pix_text"
                               style="color: rgb(153, 153, 153); font-size: 16px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                        class="editContent" style="">Trang chủ</span></a></li>
                        <li><a href="http://colorme.vn/courses" class="pix_text"
                               style="color: rgb(153, 153, 153); font-size: 16px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                        class="editContent" style="">Các khoá học</span></a></li>
                        <li><a href="http://graphics.vn" class="pix_text"
                               style="color: rgb(153, 153, 153); font-size: 16px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                        class="editContent" style="">Mua sách</span></a></li>
                        <li><a href="http://facebook.com/colorme.hanoi" class="pix_text"
                               style="color: rgb(153, 153, 153); font-size: 16px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                        class="editContent" style="">Fanpage</span></a></li>
                        <li><a href="http://facebook.com/colorme.hanoi" class="pix_text"
                               style="color: rgb(153, 153, 153); font-size: 16px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                        class="editContent" style="">Hỗ trợ</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="four columns">
                <div class="content_div area_3">
                    <span class="pix_text"><span class="editContent big_number" style="">17 345</span></span>
                    <span class="pix_text"><span class="editContent small_bold light_color" style="">HỌC VIÊN TỪNG THEO HỌC</span></span>
                    <h4 class="editContent med_title">KEE EDUCATION</h4>
                    <p class="editContent small_bold">175 Chùa Láng, Đống Đa, Hà Nội, Việt Nam</p>
                </div>
            </div>
            <div class="four columns omega">
                <div class="content_div">
                    <span class="pix_text"><span class="editContent footer3_title" style="">CÁC CƠ SỞ</span></span>
                    <p class="editContent ">CS1: 175 Chùa Láng, Đống Đa, HN<br>
                        CS2: 162 Phương Liệt, HBT, HN<br>
                        CS3: 14/835 Trần Hưng Đạo, Phương 1, Quận 5, HCM<br>
                        CS4: Ngõ 2 Thọ Tháp (Toà nhà Phương Nga), Cầu Giấy, Hà Nội<br>
                        <br></p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<!-- JavaScript
================================================== -->
<script src="/colorme-assets/js-files/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="/colorme-assets/js-files/jquery.easing.1.3.js" type="text/javascript"></script>
<script type="text/javascript" src="/colorme-assets/js-files/jquery.common.min.js"></script>
<script src="/colorme-assets/js-files/ticker.js" type="text/javascript"></script>
<script src="/colorme-assets/js-files/custom1.js" type="text/javascript"></script>
<script src="/colorme-assets/assets/js/smoothscroll.min.js" type="text/javascript"></script>
<script src="/colorme-assets/assets/js/appear.min.js" type="text/javascript"></script>
<script src="/colorme-assets/js-files/jquery.ui.touch-punch.min.js"></script>
<script src="/colorme-assets/js-files/bootstrap.min.js"></script>
<script src="/colorme-assets/js-files/bootstrap-switch.js"></script>
<script src="/colorme-assets/js-files/custom3.js" type="text/javascript"></script>


<script src="/colorme-assets/assets/js/appear.min.js" type="text/javascript"></script>
<script src="/colorme-assets/assets/js/animations.js" type="text/javascript"></script>


<style>.fb-livechat, .fb-widget {
        display: none
    }

    .ctrlq.fb-button, .ctrlq.fb-close {
        position: fixed;
        right: 24px;
        cursor: pointer
    }

    .ctrlq.fb-button {
        z-index: 999;
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGhlaWdodD0iMTI4cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iMTI4cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxyZWN0IGZpbGw9IiMwMDg0RkYiIGhlaWdodD0iMTI4IiB3aWR0aD0iMTI4Ii8+PC9nPjxwYXRoIGQ9Ik02NCwxNy41MzFjLTI1LjQwNSwwLTQ2LDE5LjI1OS00Niw0My4wMTVjMCwxMy41MTUsNi42NjUsMjUuNTc0LDE3LjA4OSwzMy40NnYxNi40NjIgIGwxNS42OTgtOC43MDdjNC4xODYsMS4xNzEsOC42MjEsMS44LDEzLjIxMywxLjhjMjUuNDA1LDAsNDYtMTkuMjU4LDQ2LTQzLjAxNUMxMTAsMzYuNzksODkuNDA1LDE3LjUzMSw2NCwxNy41MzF6IE02OC44NDUsNzUuMjE0ICBMNTYuOTQ3LDYyLjg1NUwzNC4wMzUsNzUuNTI0bDI1LjEyLTI2LjY1N2wxMS44OTgsMTIuMzU5bDIyLjkxLTEyLjY3TDY4Ljg0NSw3NS4yMTR6IiBmaWxsPSIjRkZGRkZGIiBpZD0iQnViYmxlX1NoYXBlIi8+PC9zdmc+) center no-repeat #0084ff;
        width: 60px;
        height: 60px;
        text-align: center;
        bottom: 50px;
        border: 0;
        outline: 0;
        border-radius: 60px;
        -webkit-border-radius: 60px;
        -moz-border-radius: 60px;
        -ms-border-radius: 60px;
        -o-border-radius: 60px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .06), 0 2px 32px rgba(0, 0, 0, .16);
        -webkit-transition: box-shadow .2s ease;
        background-size: 80%;
        transition: all .2s ease-in-out
    }

    .ctrlq.fb-button:focus, .ctrlq.fb-button:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, .09), 0 4px 40px rgba(0, 0, 0, .24)
    }

    .fb-widget {
        background: #fff;
        z-index: 1000;
        position: fixed;
        width: 360px;
        height: 435px;
        overflow: hidden;
        opacity: 0;
        bottom: 0;
        right: 24px;
        border-radius: 6px;
        -o-border-radius: 6px;
        -webkit-border-radius: 6px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
        -webkit-box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
        -moz-box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
        -o-box-shadow: 0 5px 40px rgba(0, 0, 0, .16)
    }

    .fb-credit {
        text-align: center;
        margin-top: 8px
    }

    .fb-credit a {
        transition: none;
        color: #bec2c9;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        text-decoration: none;
        border: 0;
        font-weight: 400
    }

    .ctrlq.fb-overlay {
        z-index: 0;
        position: fixed;
        height: 100vh;
        width: 100vw;
        -webkit-transition: opacity .4s, visibility .4s;
        transition: opacity .4s, visibility .4s;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .05);
        display: none
    }

    .ctrlq.fb-close {
        z-index: 4;
        padding: 0 6px;
        background: #365899;
        font-weight: 700;
        font-size: 11px;
        color: #fff;
        margin: 8px;
        border-radius: 3px
    }

    .ctrlq.fb-close::after {
        content: "X";
        font-family: sans-serif
    }

    .bubble {
        width: 20px;
        height: 20px;
        background: #c00;
        color: #fff;
        position: absolute;
        z-index: 999999999;
        text-align: center;
        vertical-align: middle;
        top: -2px;
        left: -5px;
        border-radius: 50%;
    }

    .bubble-msg {
        width: 120px;
        left: -140px;
        top: 5px;
        position: relative;
        background: rgba(59, 89, 152, .8);
        color: #fff;
        padding: 5px 8px;
        border-radius: 8px;
        text-align: center;
        font-size: 13px;
    }</style>
<div class="fb-livechat">
    <div class="ctrlq fb-overlay"></div>
    <div class="fb-widget">
        <div class="ctrlq fb-close"></div>
        <div class="fb-page" data-href="https://www.facebook.com/colorme.hanoi" data-tabs="messages" data-width="360"
             data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"></div>
        <div class="fb-credit"></div>
        <div id="fb-root"></div>
    </div>
    <a href="https://m.me/colorme.hanoi" title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button">
        <div class="bubble">1</div>
        <div class="bubble-msg">Bạn cần hỗ trợ?</div>
    </a></div>
<script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>$(document).ready(function () {
        function detectmob() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        }

        var t = {delay: 125, overlay: $(".fb-overlay"), widget: $(".fb-widget"), button: $(".fb-button")};
        setTimeout(function () {
            $("div.fb-livechat").fadeIn()
        }, 8 * t.delay);
        if (!detectmob()) {
            $(".ctrlq").on("click", function (e) {
                e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
                    bottom: 0,
                    opacity: 0
                }, 2 * t.delay, function () {
                    $(this).hide("slow"), t.button.show()
                })) : t.button.fadeOut("medium", function () {
                    t.widget.stop().show().animate({bottom: "30px", opacity: 1}, 2 * t.delay), t.overlay.fadeIn(t.delay)
                })
            })
        }
    });</script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/register-cm.js?6868"></script>
</body>
</html>