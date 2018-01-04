@extends('layouts.2018-public')

@section('content')
    <div>
        <div class="container-fluid">
            <div class="row au-first right-image"
                 style="height: 300px; background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1514537631EPRwirbr8QZ5zP5.png')">
            </div>
            <div class="row" id="bl-routing-wrapper">
                <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                    <a class="routing-bar-item" href="#first-after-nav"
                       style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Thông
                        tin</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#pick-class"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Đăng
                        kí</a>
                </div>
            </div>
            <br> <br>
        </div>
        <div class="container" id="first-after-nav">
            <div class="row">
                <div class="col-md-1">
                </div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="landing-title">This is a sample title</h1>
                            <p>This is a sample description</p>
                            <br>
                        </div>
                        <div class="col-md-8">
                            <style>.embed-container {
                                    position: relative;
                                    padding-bottom: 56.25%;
                                    height: 0;
                                    overflow: hidden;
                                    max-width: 100%;
                                    height: auto;
                                }

                                .embed-container iframe, .embed-container object, .embed-container embed {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                }</style>
                            <div class='embed-container'>
                                <iframe src='https://player.vimeo.com/video/249530029'
                                        frameborder='0' webkitAllowFullScreen mozallowfullscreen
                                        allowFullScreen></iframe>
                            </div>

                            <h2 style="font-size: 20px;font-weight:600; color:#424242;">This is a sample title</h2>
                            <br>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English. Many desktop publishing packages and web
                                page editors now use Lorem Ipsum as their default model text, and a search for 'lorem
                                ipsum' will uncover many web sites still in their infancy. Various versions have evolved
                                over the years, sometimes by accident, sometimes on purpose (injected humour and the
                                like).</p>
                        </div>
                        <div class="col-md-4">
                            <div>
                                <a data-toggle="collapse" href="#collapse1" class="collapsed" aria-expanded="false">
                                    <div style="background:#138edc; color:white; padding:10px">
                                        <div class="row">
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600; font-size:18px">Lesson 1</p>
                                                <p style="font-weight: 200;">This is a sample description</p>
                                            </div>
                                            <div class="col-xs-1">
                                                <i style="font-size:25px" class="fa fa-angle-down"
                                                   aria-hidden="true"></i>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                                <br>
                                <div id="collapse1" aria-expanded="false" class="collapse" style="height: 0px;">
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a data-toggle="collapse" href="#collapse2" class="collapsed" aria-expanded="false">
                                    <div style="background:#138edc; color:white; padding:10px">
                                        <div class="row">
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600; font-size:18px">Lesson 1</p>
                                                <p style="font-weight: 200;">This is a sample description. This is a
                                                    sample description</p>
                                            </div>
                                            <div class="col-xs-1">
                                                <i style="font-size:25px" class="fa fa-angle-down"
                                                   aria-hidden="true"></i>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                                <br>
                                <div id="collapse2" aria-expanded="false" class="collapse" style="height: 0px;">
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a data-toggle="collapse" href="#collapse3" class="collapsed" aria-expanded="false">
                                    <div style="background:#138edc; color:white; padding:10px">
                                        <div class="row">
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600; font-size:18px">Lesson 1</p>
                                                <p style="font-weight: 200;">This is a sample description</p>
                                            </div>
                                            <div class="col-xs-1">
                                                <i style="font-size:25px" class="fa fa-angle-down"
                                                   aria-hidden="true"></i>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                                <br>
                                <div id="collapse3" aria-expanded="false" class="collapse" style="height: 0px;">
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <a href="" style="color:black">
                                            <div class="col-xs-1" style="font-size:20px;color:#138edc">
                                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                            </div>
                                            <div class="col-xs-10">
                                                <p style="font-weight: 600">Lesson 1</p>
                                                <p>This is a sample description</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
        </div>


        <div style="background: white">
            <div class="container">
                <br> <br><br>
                <div>
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-10">
                        <div class="row">
                            <div class="row">


                            </div>
                        </div>
                        <br><br><br>
                    </div>

                </div>

            </div>

        </div>
    </div>
@endsection