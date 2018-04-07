<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png" href="http://up-co.vn/wp-content/uploads/2016/06/384x176logo_03.png"
          cph-ssorder="0">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta name="robots" content="noindex, nofollow">

    @yield("meta")

    <title>UP COWORKING SPACE</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="/assets/css/up-co.css" rel="stylesheet">


    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
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
        }
        .dropdown-menu:after, .dropdown-menu:before {
            left: 12px !important;
            right: auto !important;
            border: none !important;
        }
        .dropdown-menu .dropdown-item{
            padding: .25rem 1.5rem !important;
            background: #ffffff;
        }
        .dropdown.show .dropdown-menu{
            transform: translate3d(0px, -15px, 0px) !important;
        }

    </style>

    <link rel="stylesheet prefetch" href="./css/fullcalendar.css">

</head>
<body style="background-color: #f9f9f9">
    <nav class="navbar navbar-toggleable-md fixed-top">
        <div class="container">
            <div class="navbar-translate">
                <button class="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse"
                        data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar"></span>
                    <span class="navbar-toggler-bar"></span>
                    <span class="navbar-toggler-bar"></span>
                </button>
                <div class="navbar-header">
                    <a class="navbar-brand" href="/" style="padding:0!important">
                        <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1517116042kHCSmDQWbcFqvbI.png" height="40px"
                             style="margin:10px 0"/>
                    </a>
                </div>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="dropdown nav-item">
                        <a class="nav-link hover-change dropdown-toggle" data-scroll="true" data-toggle="dropdown">VỀ
                            UP</a>
                        <div class="dropdown-menu">
                            <a href="/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space" class="dropdown-item">Tầm nhìn - sứ mệnh</a>
                            <a href="/doi-tac-chien-luoc-cua-up" class="dropdown-item">Đối tác</a>
                            <a href="/doi-tac-truyen-thong-cua-up" class="dropdown-item">Truyền thông</a>
                            <a href="/nhung-cau-hoi-thuong-gap" class="dropdown-item">Những câu hỏi thường gặp</a>
                            <a href="/thong-tin-tuyen-dung" class="dropdown-item">Tuyển dụng</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hover-change" href="/goi-thanh-vien-up-coworking-space" data-scroll="true">GÓI THÀNH
                            VIÊN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hover-change" href="/su-kien" data-scroll="true">SỰ
                            KIỆN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hover-change" href="/phong-hop" data-scroll="true">Phòng họp</a>
                    </li>
                    <li class="dropdown nav-item">
                        <a class="nav-link hover-change dropdown-toggle" data-toggle="dropdown" data-scroll="true">Cộng đồng up</a>
                        <div class="dropdown-menu">
                            <a href="/up-founders/" class="dropdown-item">Đội ngũ sáng lập</a>
                            <a href="/up-s-mentors/" class="dropdown-item">UP Mentor</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hover-change" href="/tin-tuc-startup" data-scroll="true">Tin tức</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link hover-change" href="/lien-he-voi-up-co-working-space/" data-scroll="true">Liên hệ</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-round btn-danger"
                           style="background-color:#96d21f;border-color:#96d21f; color:white!important;"
                           href="/dang-ky-trai-nghiem/">TRẢI NGHIỆM</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>