@extends('graphics::layouts.master')


@section('content')
    <div class="wrapper" id="vuejs3">
        <div class="page-header page-header-small" style="background-image: url('{{$properties['cover']}}');">
            <div class="filter"></div>
            <div class="content-center">
                <div class="container">
                    <h1 style="font-weight:600; text-transform: uppercase">{{$properties['product_type']}}
                        <br>
                        {{$properties['name']}}
                        </br>
                    </h1>
                    <h5>{{$properties['short_description']}}</h5><br>
                    <button v-on:click="openModalBuy({{$book_id}})"
                            type="button"
                            class="btn btn-outline-neutral btn-round">
                        <i class="fa fa-shopping-cart"></i>
                        Đặt mua ngay
                    </button>
                </div>
            </div>
        </div>
        <div class="profile-content section">
            <div class="container">
                <div class="row">
                    <div class="profile-picture">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                            <div class="fileinput-new img-no-padding">
                                <center><img src="{{$properties['avatar']}}" alt="..."></center>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row" style="background:#b9b9b9">
                    <img height="10px"/>
                </div>

            </div>
        </div>
        <div class="container" id="bookinfo" style="background: white">

            <div class="row">

                <div class="col-md-6">
                    <div>
                        <div class="description">
                            <h1 class="big-title">
                                {{$properties['title1']}}<br>
                            </h1>
                            <br><h5>{{$properties['subtitle1']}}</h5><br>

                            <p>
                                {{$properties['content1']}}
                            </p>

                            <br>
                            <button type="button"
                                    v-on:click="openModalBuy({{$book_id}})"
                                    class="btn btn-outline-default btn-round">
                                <i class="fa fa-shopping-cart"></i>
                                Đặt mua ngay
                            </button>
                        </div>
                        <br>
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <img class="card-img-top" src="{{$properties['img_url1']}}">
                    </div>

                </div>
            </div>
        </div>




        <div class="subscribe-line subscribe-line-transparent" style="background-image: url('{{$properties['cover1']}}')">

            <div class="content-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-profile card-plain">
                                <img class="card-img-top" src="{{$properties['img_url2']}}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div>
                                <div class="description-light">
                                    <h1 class="big-title">
                                        {{$properties['title2']}}
                                    </h1>
                                    <br><h5>{{$properties['subtitle2']}}</h5><br>
                                    <p>{{$properties['content2']}}</p>
                                    <br>
                                    <button
                                            v-on:click="openModalBuy({{$book_id}})"
                                            type="button" class="btn btn-outline-neutral btn-round">
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


        <div class="container" id="bookinfo1" style="background: white">
            <br><br>
            <div class="row">

                <div class="col-md-6">
                    <div>
                        <div class="description">
                            <h1 class="big-title" style="color:{{$properties['main_color']}}!important">
                                {{$properties['counter1']}}
                            </h1>

                            <p>{{$properties['counter1_content']}}</p>
                            <br>
                            <h1 class="big-title" style="color:{{$properties['main_color']}}!important">
                                {{$properties['counter2']}}
                            </h1>

                            <p>{{$properties['counter2_content']}}</p>
                            <br>
                            <h1 class="big-title" style="color:{{$properties['main_color']}}!important">
                                {{$properties['counter3']}}
                            </h1>

                            <p>{{$properties['counter3_content']}}</p>
                            <br>
                            <button v-on:click="openModalBuy({{$book_id}})"
                                    type="button"
                                    class="btn btn-outline-default btn-round">
                                <i class="fa fa-shopping-cart"></i>
                                Đặt mua ngay
                            </button>
                        </div>
                        <br>
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <img class="card-img-top" src="{{$properties['img_url3']}}">
                    </div>
                    <br><br>
                </div>
            </div>
        </div>


        <div class="subscribe-line subscribe-line-transparent" style="background-image: url('{{$properties['cover3']}}')">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h2 class="big-title description-light">{{$properties['name']}}</h2><br><br>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-profile">
                            <div class="card-block">
                                <div class="card-avatar">
                                    <a href="#avatar">
                                        <img src="{{$properties['author1_avt_url']}}" alt="...">
                                        <h4 class="card-title">{{$properties['author1']}}</h4>
                                    </a>
                                </div>
                                <h4>{{$properties['author1']}}</h4><br>
                                <p class="card-description text-center">
                                    {{$properties['author1_comment']}}
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
                                        <img src="{{$properties['author2_avt_url']}}" alt="...">
                                        <h4 class="card-title">{{$properties['author2']}}</h4>
                                    </a>
                                </div>
                                <h4>{{$properties['author2']}}</h4><br>
                                <p class="card-description text-center">
                                    {{$properties['author2_comment']}}
                                </p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#pablo" class="btn btn-just-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
                                <a href="#pablo" class="btn btn-just-icon btn-dribbble"><i class="fa fa-dribbble"></i></a>
                                <a href="#pablo" class="btn btn-just-icon btn-pinterest"><i class="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card card-profile">
                            <div class="card-block">
                                <div class="card-avatar">
                                    <a href="#avatar">
                                        <img src="{{$properties['author3_avt_url']}}" alt="...">
                                        <h4 class="card-title">{{$properties['author3']}}</h4>
                                    </a>
                                </div>
                                <h4>{{$properties['author3']}}</h4><br>
                                <p class="card-description text-center">
                                    {{$properties['author3_comment']}}
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


        <div class="container" id="bookinfo2" style="background: white">
            <br><br>
            <div class="row">

                <div class="col-md-6">
                    <div>
                        <div class="description">
                            <h1 class="big-title">
                                {{$properties['title4']}}
                            </h1>
                            <br><h5>{{$properties['subtitle4']}}</h5><br>

                            <p>{{$properties['content4']}}</p>
                            <br>
                            <button v-on:click="openModalBuy({{$book_id}})"
                                    type="button"
                                    class="btn btn-outline-default btn-round">
                                <i class="fa fa-shopping-cart"></i>
                                Đặt mua ngay
                            </button>
                        </div>
                        <br>
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <img class="card-img-top" src="{{$properties['img_url4']}}">
                    </div>
                </div>
            </div>
        </div>
        <hr style="margin: 0!important;">
    </div>
    <div class="container">
        <div class="row">
            {!! $properties['preview'] !!}
        </div>
    </div>
@endsection
