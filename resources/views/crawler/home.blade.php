@extends('layouts.crawl_layout')

@section('head')
    <title>học thiết kế đồ hoạ - Trường học thiết kế colorME - thiết kế cho người mới bắt đầu</title>
    <meta property="fb:app_id" content="1787695151450379"/>
    <meta property="og:type" content="website"/>
    <meta name="google-site-verification" content="-lAwthvhsEnsNeRWhg_J7gAXVPz-X0Jt8Ms_OEBhwEM"/>
    <meta property="og:url" content="http://colorme.vn/"/>
    <meta property="og:description"
          content="Nếu bạn đang muốn cần một nơi để bắt đầu con đường học thiết kế đồ hoạ của mình, thì colorME chính là thứ mà bạn đang tìm kiếm. Sau gần 2 năm hoạt động, colorME đang được biết đến như một trong những trung tâm đào tạo đồ hoạ lớn nhất Hà Nội. Với kinh nghiệm đào tạo hơn 5000 học viên, colorME đang ngày một hoàn thiện sản phẩm của mình để đưa được đến cho người dùng những trải nghiệm tuyệt vời nhất."/>
    <meta property="og:title" content="Color ME - Trường học thiết kế Color ME"/>
    <meta property="og:image" content="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo.jpg"/>
@endsection

<body>
@section('body')
    <div class="row">
        <div class="col-sm-12">
            <img class="logo" id="logo" src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo.jpg"/>
            <h1 class="title" id="title">học thiết kế đồ hoạ Color ME - Trường học thiết kế Color ME</h1>
            <p class="description" id="description">
                Nếu bạn đang muốn cần một nơi để bắt đầu con đường học thiết kế đồ hoạ của mình, thì colorME chính là
                thứ mà bạn
                đang tìm kiếm. Sau gần 2 năm hoạt động, colorME đang được biết đến như một trong những trung tâm đào tạo
                đồ hoạ
                lớn
                nhất Hà Nội. Với kinh nghiệm đào tạo hơn 5000 học viên, colorME đang ngày một hoàn thiện sản phẩm của
                mình để
                đưa
                được đến cho người dùng những trải nghiệm tuyệt vời nhất.
            </p>
        </div>
    </div>

    @foreach($products as $product)
        <div class="col-sm-12">
            <a href="{{url('/post/'.convert_vi_to_en($product->description).'-'.$product->id)}}">
                <img style="width:100%" src="{{$product->url}}" alt="học thiết kế đồ hoạ hà nội học thiết kế đồ hoạ học thiết kế đồ họa tp hcm color me {{$product->description}}">
                <h1 id="title" class="title">{{$product->description}}</h1>
            </a>
            <div id="content" class="content">{!!$product->content!!}</div>
            <a href="{{url('/profile/'.$product->author->username)}}">
                <div id="author" class="author">{{$product->author->name}}</div>
            </a>

        </div>
    @endforeach
@endsection

</body>
