@extends('layouts/public')
@section('title', "colorME")
@section('fb-info')
    <meta property="og:url" content="colorme.vn"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="colorME"/>
    <meta property="og:description"
          content="Liên hệ với chúng tôi qua email colorme.idea@gmail.com.Chúng tôi sẽ liên lạc lại nhanh nhất khi có thể"/>
    {{--        <meta property="og:image" content="{{($target_user->avatar_url!=null)?$target_user->avatar_url:url('img/logo.jpg')}}"/>--}}
    <meta property="og:image" content="{{url('/img/logo.jpg')}}"/>
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 center z-depth-1"
                 style="background: center url('https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458361329EXbcUzltjlm7ydw.jpg');background-size:cover;height: 400px; width: 100%;">
                <h4 style="color: white; padding-top: 120px; font-weight: bolder;text-shadow: 2px 1px rgba(0,0,0,0.5);">
                    HỌC THIẾT KẾ CÙNG VỚI COLORME</h4>
                <a href="{{url('courses')}}" id="register-now-btn" class="btn hvr-buzz-out"
                   style="width: 250px; background-color: #c00002;">ĐĂNG KÝ HỌC
                    NGAY</a>
                <ul>
                    @foreach(\App\Course::all() as $course)
                        <a href="{{url('classes/'.$course->id)}}">
                            <img src="{{\App\Course::find($course->id)->icon_url}}"
                                 style="border-radius: 50%; width: 40px; margin: 0 5px;">
                        </a>
                    @endforeach
                    <a href="{{url('courses')}}" class="center">
                        <i class="material-icons"
                           style="border-radius: 50%; width: 40px; height: 40px;
                       font-size: 40px; color:grey; background-color: white;
                       margin: 0 5px;">
                            add
                        </i>
                    </a>
                </ul>
            </div>
        </div>


        <div class="col s12">
            <h4 style="color: #c50000;padding-top: 20px;padding-bottom: 10px" class=" center">Bài tập học viên</h4>
        </div>

        <div class="row">

            {{--<div class="grid-landing" style="width: 100%;margin: 0">--}}
            <ul class="grid effect-2" id="grid">
                @foreach($products as $product)
                    @include('components.newsfeed_item', ['product' => $product])
                @endforeach
            </ul>
            {{--</div>--}}
        </div>
    </div>
    <!--FOOTER-->
    @include('components/footer')
            <!--END OF FOOTER-->

    <script src="{{URL::asset('js/materialize.min.js')}}"></script>
    <script src="{{URL::asset('js/jquery.zmd.hierarchical-display.min.js')}}"></script>
    <script src="{{url('js/masonry.pkgd.min.js')}}"></script>
    {{--<script src="{{url('js/imagesloaded.js')}}"></script>--}}
    {{--<script src="{{url('js/classie.js')}}"></script>--}}
    {{--<script src="{{url('js/AnimOnScroll.js')}}"></script>--}}
    <script src="{{URL::asset('js/init.js')}}"></script>
    @include('components.full_image_modal');

    <!--END OF FOOTER-->
    <script>
        //    var elem = document.querySelector('.m-p-g');
        //    document.addEventListener('DOMContentLoaded', function () {
        //        var gallery = new MaterialPhotoGallery(elem);
        //    });
        //    $(document).ready(function () {
        //        $(".button-collapse").sideNav();
        //    });
        function initGallery() {
            $('.grid-landing').masonry({
                itemSelector: '.grid-item-landing',
                percentPosition: true
            });

        }


        $(window).on('load', function () {
            initGallery();
        });

        $(document).ready(function () {

            $('#register-now-btn').addClass('infinite');
            setInterval(function () {
                if ($('#register-now-btn').hasClass('infinite')) {
                    $('#register-now-btn').removeClass('infinite');
                } else {
                    $('#register-now-btn').addClass('infinite');
                }

            }, 3000);

            initGallery();
            $('a').click(function () {
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 800);
                return false;
            });
        });
        //    $(document).ready(function () {
        //        $('.slider').slider({full_width: true, indicators: false, height: 450});
        //    });
        //    Validate Form
        $(document).ready(function () {
            $("#submit-btn").click(function (e) {
                if ($("#guess-email").val() != "" && $("#guess-email").val().indexOf("@") > -1 && $("#guess-message").val() != "") {
                    e.preventDefault();
                    var form_data = {
                        guessEmail: $("#guess-email").val(),
                        guessMessage: $("#guess-message").val()
                    };
                    $("#contact-form").hide();
                    $("#success-message").removeClass("hide");
                }
            })
            ;
        });
        //   End of Validate Form

    </script>
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
@endsection