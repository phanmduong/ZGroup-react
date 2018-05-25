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


        <div class="card card-contact no-transition" style="width: 600px;margin:0 auto; margin-top: 100px">
            <h3 class="card-title text-center">Nhập mã học viên để kiểm tra</h3>
            <div id="container-form-register">

                        <form role="form" id="contact-form" method="post"
                              action="{{url('/check')}}">
                            {{csrf_field()}}
                            <div class="card-block">
                                <div class="form-group label-floating">
                                    <label class="control-label">Mã đăng ký khóa học</label>
                                    <input type="text" name="code" class="form-control"
                                           placeholder="Ví dụ: AB1234">
                                    @if($errors->has('code'))
                                        <strong class="red-text">Xin bạn vui lòng điền mã</strong>
                                    @endif
                                    @if($errors->has('register'))
                                        <strong class="red-text">Không tồn tại đăng ký vui lòng điền
                                            lại mã</strong>
                                    @endif
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                    </div>
                                    <div class="col-md-6">
                                        <button type="submit" class="btn btn-primary pull-right">Kiểm
                                            tra
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>



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

<script type="text/javascript">
    (function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        new IsoGrid(document.querySelector('.isolayer--deco1'), {
            transform: 'translateX(33vw) translateY(-340px) rotateX(45deg) rotateZ(45deg)',
            stackItemsAnimation: {
                properties: function (pos) {
                    return {
                        translateZ: (pos + 1) * 30,
                        rotateZ: getRandomInt(-4, 4)
                    };
                },
                options: function (pos, itemstotal) {
                    return {
                        type: dynamics.bezier,
                        duration: 500,
                        points: [{"x": 0, "y": 0, "cp": [{"x": 0.2, "y": 1}]}, {
                            "x": 1,
                            "y": 1,
                            "cp": [{"x": 0.3, "y": 1}]
                        }],
                        delay: (itemstotal - pos - 1) * 40
                    };
                }
            }
        });
    })();
</script>
</html>