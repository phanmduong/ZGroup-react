@extends('upcoworkingspace::layouts.master')

@section('content')
    <div class="container-fluid">
        <div class="row au-first right-image"
             style="height: 600px; background-image: url(http://up-co.vn/wp-content/uploads/2016/07/phong-hop-1.jpg);">
        </div>
    </div>
    <div class="container">
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <div>
                        <h5 style="font-weight:600">
                            LÀM VIỆC HIỆU QUẢ VÀ SÁNG TẠO
                        </h5>
                        <h3>TẠI UP COWORKING SPACE</h3><br>
                        <p>
                            Bạn thấy làm việc ở nhà thiếu động lực và cảm hứng, làm việc ở quán café không yên tĩnh và
                            bền vững? StartUp của bạn cảm thấy chật vật với chi phí thuê văn phòng? UP cung cấp không
                            gian làm việc hiện đại, đầy đủ tiện nghi, chuyên nghiệp, truyền cảm hứng sáng tạo với mức
                            giá hỗ trợ tối đa. Tìm hiểu về bảng giá, các gói thành viên của UP.
                        </p>
                        <br>
                        <a class="btn btn-round btn-danger"
                           style="color:white;background-color:#96d21f;border-color:#96d21f"
                           onclick="window.location.href='/courses'"><i class="fa fa-plus"></i> Tìm hiểu thêm </a>
                    </div>
                    <br>
                </div>
            </div>
            {{--<div class="col-md-6">--}}
                {{--<div class="embed-responsive embed-responsive-16by9">--}}
                    {{--<iframe class="embed-responsive-item" src="http://up-co.vn/wp-content/uploads/EDIT-UP-FINALL.mp4?_=1"--}}
                            {{--allowfullscreen></iframe>--}}
                {{--</div>--}}
            {{--</div>--}}
            <div class="col-md-6">
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
                <div class="embed-container">
                    <iframe src="https://player.vimeo.com/video/249153132?title=0&amp;byline=0&amp;portrait=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="projects-3" id="projects-3">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 text-center">
                    <div class="space-top"></div>
                    <h6 class="category">Our work</h6>
                    <h2 class="title">Some of Our Awesome Projects - 3</h2>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://www.creative-tim.com/product/paper-kit">
                                <img class="img" src="http://up-co.vn/wp-content/uploads/IMG_0116-600x400.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Productivity tools</h6>
                            <h4 class="card-title">Beautiful Desktop for Designers</h4>
                            <p class="card-description">
                                As this technology matures it will be cool to see what hackers are able to do with it.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 ">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://www.creative-tim.com/product/paper-kit">
                                <img class="img" src="http://up-co.vn/wp-content/uploads/IMG_0047-600x400.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Web Design</h6>
                            <h4 class="card-title">Famous Website Redesign Implementation</h4>
                            <p class="card-description">
                                Streaming services once again top the list of this year’s Emmy nominations
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://cafebiz.cafebizcdn.vn/thumb_w/600/2017/gettyimages-181792553-1506307802870-142-0-1642-2400-crop-1506307809997.jpg">
                                <img class="img" src="http://cafebiz.cafebizcdn.vn/thumb_w/600/2017/gettyimages-181792553-1506307802870-142-0-1642-2400-crop-1506307809997.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Marketing tools</h6>
                            <h4 class="card-title">The Best Productivity Applications</h4>
                            <p class="card-description">
                                Dietary supplements don’t need approval from the Food and Drug Administration.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://www.creative-tim.com/product/paper-kit">
                                <img class="img" src="http://up-co.vn/wp-content/uploads/IMG_1828-HDR-1024x576-1-600x338.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Website</h6>
                            <h4 class="card-title">Behance Redesign</h4>
                            <p class="card-description">
                                The HDR rollout is being enabled via support from two major studio partners.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://www.creative-tim.com/product/paper-kit">
                                <img class="img" src="http://up-co.vn/wp-content/uploads/NMH_0007-600x400.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Android App</h6>
                            <h4 class="card-title">Analytics for Android</h4>
                            <p class="card-description">
                                Google did not offer an estimate as to when HDR support reaches its other global markets.
                            </p>
                        </div>
                    </div>

                </div>

                <div class="col-md-4">
                    <div class="card card-profile card-plain">
                        <div class="card-img-top">
                            <a href="http://www.creative-tim.com/product/paper-kit">
                                <img class="img" src="https://i-kinhdoanh.vnecdn.net/2017/08/17/HOSE-trao-ky-niem-chuong-cho-V-3177-2420-1502941041.jpg">
                            </a>
                        </div>
                        <div class="card-block">
                            <h6 class="card-category">Material</h6>
                            <h4 class="card-title">How to find the contacts.</h4>
                            <p class="card-description">
                                Boom, the invitations start flying and Brella makes it easy to accept/decline
                            </p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
