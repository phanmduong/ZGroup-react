@extends('graphics::layouts.master')


@section('content')
    <div class="page-header page-header-xs" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035547Sn5EuAfrqhekuNS.png');">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h1 class="title"><b>Tạp chí Graphics</b></h1>
                        <h5 class=description">Cung cấp cho bạn những kiến thức về ngành thiết kế đồ hoạ. Đồng hành cùng bạn trên chặng đường dài.</h5>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>



    <div class="container" id="bookinfo">
        <br><br>
        <div class="row">
            <div class="col-md-12 ">
                <div class="shadow">
                    <input placeholder="Tìm kiếm" style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                        <br><a href="#pablo" class="btn btn-link btn-success" style="padding:0!important; margin:0!important">Xem tất cả <i class="fa fa-angle-right"></i></a><br><br>
                    </div>
                    <br>
                </div>

            </div>

        </div>

        <div class="row">
            @foreach($books as $book)
            <div class="col-md-6 book-item">
                <div class="card card-profile" style="border-radius:0">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card card-profile card-plain">
                                    <img class="card-book-image" src="{{$book['avatar']}}">
                                </div>
                            </div>
                            <div class="col-md-8 text-left">
                                <br>
                                <h5 style="font-weight:600">{{$book['name']}}</h5>
                                <h6>{{$book['short_description']}}</h6><br>
                                <p>{{$book['description']}}</p>
                                <h5>{{$book['price']}}đ</h5><br>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                        <div style="display:flex;flex-direction:row;justify-content:space-between;">
                            <div>
                                <a href="http://graphics.vn/book/{{$book['id']}}" class="btn btn-link btn-success">Xem thêm</a>
                                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-sm btn-success">Đặt mua ngay <i class="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>



    <div class="subscribe-line subscribe-line-transparent" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613rkf2In1CptDJTfI.png')">

        <div class="content-center">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-profile card-plain">
                            <img class="card-img-top" src="/assets/img/mockup1.png">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <div class="description-light">
                                <h1 class="big-title">
                                    Tạp chí đồ hoạ <br> GRAPHHICS<br>
                                </h1>
                                <br><h5>ISSUE #02 - DRAW THE LINE</h5><br>

                                <p>Bất cứ ai khi học Tiếng Anh đều xuất phát từ những nhu cầu quan trọng trong cuộc sống. Với cuốn sách Tiếng Anh Cơ Bản, Elight mong muốn người học sẽ có một chỗ dựa vững chắc và một nền tảng kiến thức đủ tốt để biến ngôn ngữ Tiếng Anh trở thành công cụ mạnh nhất giúp bạn tiến nhanh tới mọi mục tiêu mà bạn mong muốn !</p>
                                <br>
                                <p>Bất cứ ai khi học Tiếng Anh đều xuất phát từ những nhu cầu quan trọng trong cuộc sống. Với cuốn sách Tiếng Anh Cơ Bản, Elight mong muốn người học sẽ có một chỗ dựa vững chắc và</p>
                                <br>
                                <button type="button" class="btn btn-outline-neutral btn-round">
                                    <i class="fa fa-shopping-cart"></i>
                                    Đặt mua ngay
                                </button>
                            </div>
                            <br>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container" id="bookinfo1">
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                        <br><a href="#pablo" class="btn btn-link btn-success" style="padding:0!important; margin:0!important">Xem tất cả <i class="fa fa-angle-right"></i></a><br><br>
                    </div>
                    <br>
                </div>

            </div>

        </div>
        <div class="row">
            @foreach($books as $book)
                <div class="col-md-6 book-item">
                    <div class="card card-profile" style="border-radius:0">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card card-profile card-plain">
                                        <img class="card-book-image" src="{{$book['avatar']}}">
                                    </div>
                                </div>
                                <div class="col-md-8 text-left">
                                    <br>
                                    <h5 style="font-weight:600">{{$book['name']}}</h5>
                                    <h6>{{$book['short_description']}}</h6><br>
                                    <p>{{$book['description']}}</p>
                                    <h5>{{$book['price']}}đ</h5><br>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="display:flex;flex-direction:row;justify-content:space-between;">
                                <div>
                                    <a href="http://graphics.vn/book/{{$book['id']}}" class="btn btn-link btn-success">Xem thêm</a>
                                    <button data-toggle="modal" data-target="#modalBuy" class="btn btn-sm btn-success">Đặt mua ngay <i class="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>


    <div class="subscribe-line subscribe-line-transparent" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613rkf2In1CptDJTfI.png')">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 text-center">
                    <h2 class="big-title description-light">Đội ngũ tác giả</h2><br><br>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="card card-profile">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15080356132lM4YvbGXc1oObP.jpg" alt="...">
                                    <h4 class="card-title">Eric Thomson</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                                A group becomes a team when each member is sure enough of himself and his contribution to praise the skill of the others. No one can whistle a symphony. It takes an orchestra to play it.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-dribbble"><i class="fa fa-dribbble"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-instagram"><i class="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-profile">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15080356135P12dr5zi9Mj56H.jpg" alt="...">
                                    <h4 class="card-title">Sophia West</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                                The strength of the team is each individual member. The strength of each member is the team. If you can laugh together, you can work together, silence isn’t golden, it’s deadly.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-dribbble"><i class="fa fa-dribbble"></i></a>
                            <a href="#pablo" class="btn btbtn-pinterest"><i class="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-profile">
                        <div class="card-block">
                            <div class="card-avatar">
                                <a href="#avatar">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035613AfNXUWyphuCbQOZ.jpg" alt="...">
                                    <h4 class="card-title">Lucas Andrew</h4>
                                </a>
                            </div>
                            <p class="card-description text-center">
                                Great teams do not hold back with one another. They are unafraid to air their dirty laundry. They admit their mistakes, their weaknesses and their concerns without fear of reprisal.
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <a href="#pablo" class="btn btn-just-icon btn-youtube"><i class="fa fa-youtube"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-twitter"><i class="fa fa-twitter"></i></a>
                            <a href="#pablo" class="btn btn-just-icon btn-instagram"><i class="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="bookinfo2">
        <br><br>
        <div class="row">

            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="big-title">
                            Tạp chí đồ hoạ <br> GRAPHHICS<br>
                        </h1>
                        <br><h5>ISSUE #02 - DRAW THE LINE</h5><br>

                        <p>Bất cứ ai khi học Tiếng Anh đều xuất phát từ những nhu cầu quan trọng trong cuộc sống. Với cuốn sách Tiếng Anh Cơ Bản, Elight mong muốn người học sẽ có một chỗ dựa vững chắc và một nền tảng kiến thức đủ tốt để biến ngôn ngữ Tiếng Anh trở thành công cụ mạnh nhất giúp bạn tiến nhanh tới mọi mục tiêu mà bạn mong muốn !</p>
                        <br>
                        <button type="button" class="btn btn-outline-default btn-round">
                            <i class="fa fa-shopping-cart"></i>
                            Đặt mua ngay
                        </button>
                    </div>
                    <br>
                </div>

            </div>

            <div class="col-md-6">
                <div class="card card-profile card-plain">
                    <img class="card-img-top" src="/assets/img/mockup1.png">
                </div>

            </div>
        </div>
        <div id="modalBuy" class="modal fade" role="dialog">
            <div class="modal-dialog modal-large">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="medium-title">Giỏ hàng</h2>
                    </div>
                    <div class="modal-body">
                        <br>
                        <div>
                            <div class="row" style="margin-bottom:20px;">
                                <div class="col-md-1 h-center">
                                    <img class="shadow-image" src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035612VsAtwZU2JjcAcPV.jpg">
                                </div>
                                <div class="col-md-4">
                                    <p><b style="font-weight:600;">GRAPHICS ISSUE #1</b></p>
                                    <p>Connect the dots</p>
                                </div>
                                <div class="col-md-3 h-center">
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-minus"></i></button>&nbsp
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-plus"></i></button>&nbsp
                                    <b style="font-weight:600;"> 5 </b>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p>200.000đ</p>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p><b style="font-weight:600;">1.000.000đ</b></p>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom:20px;">
                                <div class="col-md-1 h-center">
                                    <img class="shadow-image" src="http://d1j8r0kxyu9tj8.cloudfront.net/files/150803561227NTDh8jKOY8HHO.jpg">
                                </div>
                                <div class="col-md-4">
                                    <p><b style="font-weight:600;">GRAPHICS ISSUE #1</b></p>
                                    <p>Connect the dots</p>
                                </div>
                                <div class="col-md-3 h-center">
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-minus"></i></button>&nbsp
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-plus"></i></button>&nbsp
                                    <b style="font-weight:600;"> 5 </b>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p>200.000đ</p>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p><b style="font-weight:600;">1.000.000đ</b></p>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom:20px;">
                                <div class="col-md-1 h-center">
                                    <img class="shadow-image" src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035535JwwD3G0CaSSwqa4.jpg">
                                </div>
                                <div class="col-md-4">
                                    <p><b style="font-weight:600;">GRAPHICS ISSUE #1</b></p>
                                    <p>Connect the dots</p>
                                </div>
                                <div class="col-md-3 h-center">
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-minus"></i></button>&nbsp
                                    <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-plus"></i></button>&nbsp
                                    <b style="font-weight:600;"> 5 </b>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p>200.000đ</p>
                                </div>
                                <div class="col-md-2 h-center">
                                    <p><b style="font-weight:600;">1.000.000đ</b></p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-4">
                                    <h4 class="text-left"><b>Tổng</b></h4>
                                </div>
                                <div class="col-md-8">
                                    <h4 class="text-right"><b>2.000.000đ</b></h4>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <!--<a href="http://colorme.000webhostapp.com/" class="btn btn-link btn-success">Xem thêm</a>-->
                        <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success" style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                        <button data-dismiss="modal" data-toggle="modal" data-target="#modalPurchase" class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Thanh toán <i class="fa fa-angle-right"></i></button>
                    </div>
                </div>

            </div>
        </div>
        <div id="modalPurchase" class="modal fade" role="dialog">
            <div class="modal-dialog modal-large">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="medium-title">Thanh toán</h2>
                    </div>
                    <div class="modal-body">
                        <form class="register-form ">
                            <h6>Họ và tên</h6>
                            <input type="text" class="form-control" placeholder="Họ và tên"><br>
                            <h6>Số điện thoại</h6>
                            <input type="text" class="form-control" placeholder="Số điện thoại"><br>
                            <h6>Địa chỉ nhận sách</h6>
                            <input type="text" class="form-control" placeholder="Địa chỉ nhận sách"><br>
                            <h6>Phương thức thanh toán</h6>
                            <input type="text" class="form-control" placeholder="Phương thức thanh toán"><br>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <!--<a href="http://colorme.000webhostapp.com/" class="btn btn-link btn-success">Xem thêm</a>-->
                        <button data-dismiss="modal" class="btn btn-link btn-success" style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                        <button data-toggle="modal" data-target="#modalPurchase" class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Thanh toán <i class="fa fa-angle-right"></i></button>
                    </div>
                </div>

            </div>
        </div>
    </div>

@endsection
