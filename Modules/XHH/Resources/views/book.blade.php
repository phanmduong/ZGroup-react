@extends('xhh::layouts.master')

@section('content')
    <div class="container">
        <br><br><br><br><br><br>
        <br><br><br>

        <div class="row">
            <div class="col-md-4">
                <img src="{{$book->avatar_url}}" style="width:100%">
            </div>
            <div class="col-md-8">
                <h2 class="title">{{$book->name}}</h2>
                <h5 class="description">{{$book->description}}</h5>
                <div class="rating" style="font-size:20px; color:#ffc448">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                </div>
                <div class="info-horizontal">
                    <br>
                    <div class="description">
                        <p><b><b>Author:</b></b> {{$author}}</p>
                        <p><b><b>Language:</b></b> {{$language}}</p>
                        <p><b><b>Publisher:</b></b> {{$publisher}}</p>
                    </div>
                </div>

                <br>
                <a href="{{$book->download}}" class="btn btn-round btn-google">
                    <i class="fa fa-download" aria-hidden="true"></i> Download · 753
                </a>
                <a href="" class="btn btn-round btn-facebook">
                    <i class="fa fa-facebook" aria-hidden="true"></i> Share · 753
                </a>
            </div>
        </div>
        <br><br>
        <div class="col-md-12">
            <h3>
                <b>Sách liên quan </b>
            </h3>
            <a href="/all-books" style="color:#c50000!important"><b>Xem thêm</b></a>


        </div>

        <div id="vuejs1" class="row">
            @foreach($newestBooks as $book)
                <div class="col-md-3">
                    <div class="card card-profile" style="border-radius: 0px;">
                        <div style="padding: 3%;">
                            <div style="background-image: url('{{$book->avatar_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                        </div>
                        <div>
                            <div class="container text-left" style="min-height: 130px;"><br>
                                <p style="font-weight: 600;">{{$book->name}}</p> <br>
                                <p>{{$book->description}}</p></div>

                        </div>
                        <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                            <div style="text-align: right;">
                                <a class="btn btn-google" href="/book/{{$book->id}}"
                                   style="padding: 3px; margin: 3px; font-size: 10px;">
                                    Tải sách <i class="fa fa-download"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>


    <br><br><br>
@endsection