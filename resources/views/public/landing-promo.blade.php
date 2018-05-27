<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="canonical" href="{{url('/landing/hoc-thiet-ke-photoshop-colorme')}}"/>
    <meta property="og:url" content="{{url('/landing/hoc-thiet-ke-photoshop-colorme')}}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="Học {{$course->name}} cùng colorME"/>
    <meta property="og:description" content="{{$course->description}}"/>
    <meta property="og:image" content="{{url("/img/logo.jpg")}}"/>
    <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>

    <title>colorME - {{$course->name}}</title>

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="{{ URL::asset('css/bootstrap.min.css') }}"/>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ URL::asset('css/course-promo.css') }}"/>

    <!-- Custom Fonts -->
    {{--<link href="{{ URL::asset('css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">--}}
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css" rel="stylesheet"
          type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet'
          type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Select Form Styling JS -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css">


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top" class="index" data-spy="scroll" data-target=".navbar-fixed-top">

<!-- Navigation -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand page-scroll" href="#page-top"><img src="{{url('/img/logo-text.png')}}" width="80"
                                                                      id="logo"></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li class="hidden">
                    <a href="#page-top"></a>
                </li>
                <li>
                    <a class="page-scroll" href="#reason">Vì sao?</a>
                </li>
                <li>
                    <a class="page-scroll" href="#demo-product-section">Bài học viên</a>
                </li>
                <li>
                    <a class="page-scroll" href="#timeline">Timeline</a>
                </li>
                <li>
                    <a class="page-scroll" href="#feedback">Phản hồi học viên</a>
                </li>
                <li>
                    <a class="page-scroll" href="#register-section"
                       style="background-color: #fed136; border-radius: 5px; color: #333333; margin: 0 5px;font-weight: bolder;">Đăng
                        ký</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>

<!-- Header -->
<header style="{{($landing->cover_promo_url != null)?"background-image: url(".$landing->cover_promo_url.")":''}}">
    <div class="container">
        <div class="intro-text">
            {{--<div class="intro-lead-in">Học thiết kế bằng photoshop với colorME</div>--}}
            {{--<div class="intro-heading">Học thiết kế bằng Photoshop với colorME</div>--}}
            {{--<a href="{{url('/courses')}}" class="page-scroll btn btn-xl">Đăng ký học ngay</a>--}}
            <div id="head-image"></div>
        </div>
    </div>
</header>

<section id="intro-video">
    <div class="text-center"><h2 class="section-heading">GIỚI THIỆU VỀ COLORME</h2></div>
    <div id="intro-video-wrapper">
        <div id="intro-video-frame">
            {!! $landing->video_url !!}
        </div>
    </div>
</section>

<!-- Reason Section -->
<section id="reason">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">VÌ SAO BẠN NÊN CHỌN COLORME?</h2>
                <h3 class="section-subheading text-muted">Không cần tìm đâu xa nữa, colorME chính là trường học thiết kế
                    mà bạn tìm kiếm bấy lâu!
                </h3>
            </div>
        </div>
        <div class="row text-center">
            @for($k = 1;$k <= 3; $k++)
                <div class="col-md-4">
                    <img src="{{$reasons['reason_img_url'.$k]}}">
                    <h4 class="service-heading">{{$reasons['reason_name'.$k]}}</h4>
                    <p class="text-muted">{{$reasons['reason_detail'.$k]}}
                    </p>
                </div>
            @endfor
            {{--<div class="col-md-4">--}}
            {{--<img src="{{url("/img/landingps/icon1.jpg")}}">--}}
            {{--<h4 class="service-heading">Nhanh</h4>--}}
            {{--<p class="text-muted">Khoá học của colorME thường chỉ kéo dài trong 1 tháng, giúp bạn nhanh chóng nhận--}}
            {{--được những kiến thức cực kì quan trọng trong thiết kế.--}}
            {{--</p>--}}
            {{--</div>--}}

            {{--<div class="col-md-4">--}}
            {{--<img src="{{url("/img/landingps/icon2.jpg")}}">--}}
            {{--<h4 class="service-heading">Rẻ</h4>--}}
            {{--<p class="text-muted">Với mức giá chỉ bằng 1/3 thị trường, colorME giúp cho bạn có thể dễ dàng theo học--}}
            {{--với chính sách Bảo Hành Trọn Đời.</p>--}}
            {{--</div>--}}
            {{--<div class="col-md-4">--}}
            {{--<img src="{{url("/img/landingps/icon3.jpg")}}">--}}
            {{--<h4 class="service-heading">Tốt</h4>--}}
            {{--<p class="text-muted">ColorME đang được đánh giá là một trong những trung tâm đào tạo thiết kế tốt nhất--}}
            {{--hiện nay trên Thị Trường. Với hơn 250 học viên theo học mỗi tháng, ColorME cam kết đem lại những--}}
            {{--khoá học có chất lượng tốt nhất cho cộng đồng.</p>--}}
            {{--</div>--}}
        </div>
    </div>
</section>

{{--<!-- Beautiful Design Section -->--}}
{{--<section id="demo-product-section">--}}
{{--<div class="container">--}}
{{--<div class="row">--}}
{{--<div class="col-sm-12 text-center" style="padding-bottom: 50px;">--}}
{{--<h2>Bài mẫu của học viên</h2>--}}
{{--</div>--}}
{{--<div class="col-sm-6 col-md-4 portfolio-item">--}}
{{--<img src="{{url('/img/landingps/homework1.png')}}" class="demo-product">--}}
{{--<div class="portfolio-caption">--}}
{{--<p class="demo-product-text"><b>Do Son Tung</b></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="col-sm-6 col-md-4 portfolio-item">--}}
{{--<img src="{{url('/img/landingps/homework2.jpg')}}" class="demo-product">--}}
{{--<div class="portfolio-caption">--}}
{{--<p class="demo-product-text"><b>Do Son Tung</b></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="col-sm-6 col-md-4 portfolio-item">--}}
{{--<img src="{{url('/img/landingps/homework3.jpg')}}" class="demo-product">--}}
{{--<div class="portfolio-caption">--}}
{{--<p class="demo-product-text"><b>Do Son Tung</b></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="col-sm-6 col-md-4 portfolio-item">--}}
{{--<img src="{{url('/img/landingps/homework4.png')}}" class="demo-product">--}}
{{--<div class="portfolio-caption">--}}
{{--<p class="demo-product-text"><b>Do Son Tung</b></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="col-sm-6 col-md-4 portfolio-item">--}}
{{--<img src="{{url('/img/landingps/homework5.png')}}" class="demo-product">--}}
{{--<div class="portfolio-caption">--}}
{{--<p class="demo-product-text"><b>Do Son Tung</b></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</section>--}}

<section id="demo-product-section" class="bg-light-gray">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">BÀI TẬP CỦA HỌC VIÊN</h2>
                <h3 class="section-subheading text-muted">Cùng xem học viên colorME có thể làm được những gì chỉ
                    trong {{$landing->class_number}}
                    buổi học nhé!</h3>
            </div>
        </div>
        <div class="row">
            @for($j = 1; $j <= 6; $j++)
                <div class="col-md-4 col-sm-6 portfolio-item">
                    <a href="#portfolioModal{{$j}}" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src="{{$demos['demo_preview'.$j]}}" class="img-responsive" alt="">
                    </a>
                    <div class="portfolio-caption">
                        <h4>{{$demos['demo_author'.$j]}}</h4>
                        <p class="text-muted">{{$demos['demo_author_gen'.$j]}}</p>
                    </div>
                </div>
            @endfor
        </div>
    </div>
</section>

<!-- Timeline Section -->
<section id="timeline">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">TIMELINE KHOÁ HỌC</h2>
                <h3 class="section-subheading text-muted">Vậy bạn sẽ học gì ở colorME, trong mỗi buổi? Cùng nghía qua
                    chương trình học của chúng ta một tí nhé.</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <ul class="timeline">
                    <?php $loop = $landing->class_number?>
                    @for($i = 1; $i <= $loop ; $i++)
                        <li {{($i%2 == 0)?'class=timeline-inverted':''}}>
                            <div class="timeline-image">
                                <img class="img-circle img-responsive" src="{{$timeline['class_img_url'.$i]}}" alt="">
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4 class="subheading">{{$timeline['class_name'.$i]}}</h4>
                                </div>
                                <div class="timeline-body">
                                    <p class="text-muted">{{$timeline['class_detail'.$i]}}</p>
                                </div>
                            </div>
                        </li>
                    @endfor
                    <li class="timeline-inverted">
                        <div class="timeline-image" style="background-color: #C00002">
                            <h4 style="padding-top: 30px;">Tốt nghiệp</h4>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Feedback Hoc Vien -->
<section id="feedback" class="bg-light-gray">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">Feedback Học viên cũ</h2>
                <h3 class="section-subheading text-muted"></h3>
            </div>
        </div>
        <div class="row">
            @for($k = 1; $k <= 3;$k++)
                <div class="col-sm-4">
                    <div class="team-member">
                        <img src="{{$feedbacks['feedback_ava_url'.$k]}}" class="img-responsive img-circle" alt=""
                             width="250">
                        <h4>{{$feedbacks['feedback_author'.$k]}}</h4>
                        <br>
                        <p class="feedback-text">{{$feedbacks['feedback_detail'.$k]}}</p>
                    </div>
                </div>
            @endfor
        </div>
        {{--<div class="row">--}}
        {{--<div class="col-lg-8 col-lg-offset-2 text-center">--}}
        {{--<p class="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque,--}}
        {{--laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>--}}
        {{--</div>--}}
        {{--</div>--}}
    </div>
</section>

{{--<aside class="clients">--}}
{{--<div class="container">--}}
{{--<div class="row">--}}
{{--<div class="col-md-3 col-sm-6">--}}
{{--<a href="#">--}}
{{--<img src="{{url('/img/user.png')}}" class="img-responsive img-centered" alt="">--}}
{{--</a>--}}
{{--</div>--}}
{{--<div class="col-md-3 col-sm-6">--}}
{{--<a href="#">--}}
{{--<img src="{{url('/img/user.png')}}" class="img-responsive img-centered" alt="">--}}
{{--</a>--}}
{{--</div>--}}
{{--<div class="col-md-3 col-sm-6">--}}
{{--<a href="#">--}}
{{--<img src="{{url('/img/user.png')}}" class="img-responsive img-centered" alt="">--}}
{{--</a>--}}
{{--</div>--}}
{{--<div class="col-md-3 col-sm-6">--}}
{{--<a href="#">--}}
{{--<img src="{{url('/img/user.png')}}" class="img-responsive img-centered" alt="">--}}
{{--</a>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</aside>--}}

{{--<section id="contact">--}}
{{--<div class="container">--}}
{{--<div class="row">--}}
{{--<div class="col-lg-12 text-center">--}}
{{--<h2 class="section-heading">Contact Us</h2>--}}
{{--<h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="row">--}}
{{--<div class="col-lg-12">--}}
{{--<form name="sentMessage" id="contactForm" novalidate>--}}
{{--<div class="row">--}}
{{--<div class="col-md-6">--}}
{{--<div class="form-group">--}}
{{--<input type="text" class="form-control" placeholder="Your Name *" id="name" required--}}
{{--data-validation-required-message="Please enter your name.">--}}
{{--<p class="help-block text-danger"></p>--}}
{{--</div>--}}
{{--<div class="form-group">--}}
{{--<input type="email" class="form-control" placeholder="Your Email *" id="email" required--}}
{{--data-validation-required-message="Please enter your email address.">--}}
{{--<p class="help-block text-danger"></p>--}}
{{--</div>--}}
{{--<div class="form-group">--}}
{{--<input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required--}}
{{--data-validation-required-message="Please enter your phone number.">--}}
{{--<p class="help-block text-danger"></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="col-md-6">--}}
{{--<div class="form-group">--}}
{{--<textarea class="form-control" placeholder="Your Message *" id="message" required--}}
{{--data-validation-required-message="Please enter a message."></textarea>--}}
{{--<p class="help-block text-danger"></p>--}}
{{--</div>--}}
{{--</div>--}}
{{--<div class="clearfix"></div>--}}
{{--<div class="col-lg-12 text-center">--}}
{{--<div id="success"></div>--}}
{{--<button type="submit" class="btn btn-xl">Send Message</button>--}}
{{--</div>--}}
{{--</div>--}}
{{--</form>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</section>--}}

        <!-- Register Section -->
<section id="register-section" style="padding-top: 100px; margin-top: 50px">
    <div class="container">
        <div class="text-center">
            <h2 class="section-heading">Đăng ký học ngay</h2>
            <h3 class="section-subheading text-muted">{{$landing->policy}}</h3>
        </div>
        <form action="{{url('landing/register')}}" method="post">
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">
            <div class="row" style="margin-bottom: 50px;">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="class_id">Chọn lớp học</label>
                        <select class="form-control selectpicker show-tick" id="class_id" name="class_id"
                                title="Chọn một lớp học"
                                data-size="10"
                                required>
                            @foreach($bases as $base)
                                <optgroup label="{{$base->name.' : '.$base->address}}">
                                    @foreach($classes as $class)
                                        @if($class->base_id == $base->id)
                                            <option style="font-weight: bolder;"
                                                    data-content="Lớp: {{$class->name}}<br>Thời gian: {{$class->study_time}}<br>
                                    Khai giảng: {{$class->description}} {{($class->status == 0)?"<span style='color: red;'>(Đã ngừng tuyển sinh)</span>":""}}"
                                                    {{($class->status == 0)?"disabled":""}}
                                                    value="{{$class->id}}">
                                            </option>
                                        @endif
                                    @endforeach
                                </optgroup>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="name">Họ và tên</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Nguyễn Văn A"
                               required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="gender">Giới tính</label>
                        <select class="form-control selectpicker" id="gender" name="gender" required>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Khác</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">

                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="example@gmail.com"
                               required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="phone">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" name="phone" placeholder="0912345678"
                               required>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="dob">Ngày sinh</label>
                        <input type="date" class="form-control" id="dob" name="dob" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="university">Trường học</label>
                        <input type="text" class="form-control" id="university" name="university"
                               placeholder="ĐH KTQD, ĐH Ngoại thương..." required>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">

                        <label for="work">Nơi làm việc (Không bắt buộc)</label>
                        <input type="text" class="form-control" id="work" name="work"
                               placeholder="Vietcombank, Sinh viên,...">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="address">Địa chỉ</label>
                        <input type="text" class="form-control" id="address" name="address"
                               placeholder="153 Chùa Láng..."
                               required>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="how_know">Lý do bạn biết đến colorME</label>
                        <select class="form-control selectpicker" id="how_know" name="how_know" required>
                            <option value="1">Facebook</option>
                            <option value="6">Instagram</option>
                            <option value="2">Người quen</option>
                            <option value="3">Google</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="coupon">Mã giảm giá</label>
                        <input type="text" class="form-control" id="coupon" name="coupon" placeholder="Không bắt buộc">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="facebook">Link Facebook</label>
                        <input type="text" class="form-control" id="facebook" name="facebook"
                               placeholder="Ví dụ: facebook.com/hung7495" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="leader_phone">Số điện thoại nhóm trưởng</label>
                        <input type="text" class="form-control" id="leader_phone" name="leader_phone"
                               placeholder="Không bắt buộc">
                    </div>
                </div>

            </div>
            <div class="row text-center" style="margin: 20px 0;">
                <button type="submit" class="btn" id="submit-btn">ĐĂNG KÝ NGAY</button>
            </div>
        </form>
    </div>
</section>
<footer>
    <div style="width: 90%; margin: 0 auto;">
        <div class="row">
            <div class="col-md-4">
                <ul class="list-inline social-buttons">
                    <li><a href="https://www.facebook.com/ColorME.Hanoi"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="https://www.instagram.com/colorme.hanoi/"><i class="fa fa-instagram"></i></a>
                    </li>
                    {{--<li><a href="#"><i class="fa fa-linkedin"></i></a>--}}
                    {{--</li>--}}
                </ul>
            </div>
            <div class="col-md-4">
                <span class="copyright"><span style="font-size: 20px; position: relative;top: 15px;">colorME</span><br>Lớp học thiết kế cho tất cả mọi người</span>
            </div>
            <div class="col-md-4">
                {{--<ul class="list-inline quicklinks">--}}
                {{--<li><a href="#">Privacy Policy</a>--}}
                {{--</li>--}}
                {{--<li><a href="#">Terms of Use</a>--}}
                {{--</li>--}}
                {{--</ul>--}}
                <div id="other-info">
                    <p>Cơ sở 1: 175 Chùa Láng - Đống Đa - Hà Nội</p>
                    <p>Cơ sở 2: 601 Giải Phóng - Hai Bà Trưng - Hà Nội</p>
                    <p>Mọi câu hỏi thắc mắc, bạn vui lòng gọi đến số:
                        0163.580.1118 (Gặp Trang)</p>
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- Portfolio Modals -->
<!-- Use the modals below to showcase details about your portfolio projects! -->

<!-- Portfolio Modal 1 -->
@for($l = 1; $l <=6;$l++)
    <div class="portfolio-modal modal fade" id="portfolioModal{{$l}}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <div class="modal-body">
                            <div style="width: 600px; margin: 0 auto;" class="modal-content-wrapper">
                                {!! $demo_contents[$l] !!}
                            </div>
                            <button type="button" class="btn btn-primary" data-dismiss="modal"><i
                                        class="fa fa-times"></i>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endfor

    {{--<!-- Portfolio Modal 2 -->--}}
    {{--<div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">--}}
    {{--<div class="modal-content">--}}
    {{--<div class="close-modal" data-dismiss="modal">--}}
    {{--<div class="lr">--}}
    {{--<div class="rl">--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container">--}}
    {{--<div class="row">--}}
    {{--<div class="col-lg-8 col-lg-offset-2">--}}
    {{--<div class="modal-body">--}}
    {{--<h2>ASERNAL DREAMTEAM | DESCAMP#4</h2>--}}
    {{--<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/14615309660S6444YbKkyt1qe.jpg"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461531178EXaVqEDHUiXzX6I.jpg"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461531196AlFKL1KX4UJw9nw.jpg"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461531218Xv7rSTBk3jyd55V.jpg"--}}
    {{--alt="">--}}
    {{--<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i>--}}
    {{--Đóng--}}
    {{--</button>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}

    {{--<!-- Portfolio Modal 3 -->--}}
    {{--<div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">--}}
    {{--<div class="modal-content">--}}
    {{--<div class="close-modal" data-dismiss="modal">--}}
    {{--<div class="lr">--}}
    {{--<div class="rl">--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container">--}}
    {{--<div class="row">--}}
    {{--<div class="col-lg-8 col-lg-offset-2">--}}
    {{--<div class="modal-body">--}}
    {{--<!-- Project Details Go Here -->--}}
    {{--<h2>SÁNG TẠO ĐƯỜNG PHỐ | DESCAMP#3</h2>--}}
    {{--<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>--}}
    {{--<img class="img-responsive img-centered" src="http://i.imgur.com/zSD4Dwm.jpg" alt="">--}}
    {{--<img class="img-responsive img-centered" src="http://i.imgur.com/95g6WQG.jpg" alt="">--}}
    {{--<img class="img-responsive img-centered" src="http://i.imgur.com/txOUSqa.jpg" alt="">--}}
    {{--<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i>--}}
    {{--Đóng--}}
    {{--</button>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}

    {{--<!-- Portfolio Modal 4 -->--}}
    {{--<div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" role="dialog" aria-hidden="true">--}}
    {{--<div class="modal-content">--}}
    {{--<div class="close-modal" data-dismiss="modal">--}}
    {{--<div class="lr">--}}
    {{--<div class="rl">--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container">--}}
    {{--<div class="row">--}}
    {{--<div class="col-lg-8 col-lg-offset-2">--}}
    {{--<div class="modal-body">--}}
    {{--<!-- Project Details Go Here -->--}}
    {{--<h2>[DESIGN CAMP 4][G-DRAGON]</h2>--}}
    {{--<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>--}}

    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/14616710222yKf9yJ6LLpdcj8.png"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461670899SlWHIGPOKfJ4Nn6.png"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/14616709364qaAMol6LE0Dv05.png"--}}
    {{--alt="">--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461670837HHIhzVBLT9YoeQq.png"--}}
    {{--alt="">--}}
    {{--<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i>--}}
    {{--Đóng--}}
    {{--</button>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}

    {{--<!-- Portfolio Modal 5 -->--}}
    {{--<div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" role="dialog" aria-hidden="true">--}}
    {{--<div class="modal-content">--}}
    {{--<div class="close-modal" data-dismiss="modal">--}}
    {{--<div class="lr">--}}
    {{--<div class="rl">--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container">--}}
    {{--<div class="row">--}}
    {{--<div class="col-lg-8 col-lg-offset-2">--}}
    {{--<div class="modal-body">--}}
    {{--<!-- Project Details Go Here -->--}}
    {{--<h2>Project Name</h2>--}}
    {{--<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461477544DiO0ORWYvY8IOf7.png"--}}
    {{--alt="">--}}

    {{--<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i>--}}
    {{--Đóng--}}
    {{--</button>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}

    {{--<!-- Portfolio Modal 6 -->--}}
    {{--<div class="portfolio-modal modal fade" id="portfolioModal6" tabindex="-1" role="dialog" aria-hidden="true">--}}
    {{--<div class="modal-content">--}}
    {{--<div class="close-modal" data-dismiss="modal">--}}
    {{--<div class="lr">--}}
    {{--<div class="rl">--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container">--}}
    {{--<div class="row">--}}
    {{--<div class="col-lg-8 col-lg-offset-2">--}}
    {{--<div class="modal-body">--}}
    {{--<!-- Project Details Go Here -->--}}
    {{--<h2>DESIGNCAMP - ROUND2</h2>--}}
    {{--<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>--}}
    {{--<img class="img-responsive img-centered"--}}
    {{--src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1461486204n11jfZZYv2UngfJ.jpg"--}}
    {{--alt="">--}}
    {{--<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i>--}}
    {{--Đóng--}}
    {{--</button>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}

            <!-- jQuery -->
    <script src="{{URL::asset('js/jquery-1.12.0.min.js')}}"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="{{ URL::asset('js/bootstrap.min.js') }}"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="{{ URL::asset('js/classie.js') }}"></script>
    <script src="{{ URL::asset('js/cbpAnimatedHeader.js') }}"></script>
    <!-- Latest compiled and minified JavaScript for Dropdown-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/js/bootstrap-select.min.js"></script>
    {{--<script src="{{ URL::asset('js/bootstrap-dropdown.min.js') }}"></script>--}}

    {{--<!-- Contact Form JavaScript -->--}}
    {{--<script src="js/jqBootstrapValidation.js"></script>--}}
    {{--<script src="js/contact_me.js"></script>--}}

            <!-- Custom Theme JavaScript -->
    <script src="{{ URL::asset('js/course-promo.js') }}"></script>
    <script>
        window.history.replaceState(null, null, '/landing/{{(($landing->seo_url != null)?$landing->seo_url:'hoc-thiet-ke-colorme-'.$course->name).'?id='.$landing->id}}');
    </script>

</body>

</html>
