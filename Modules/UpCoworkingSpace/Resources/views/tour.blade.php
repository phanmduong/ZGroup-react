@extends('upcoworkingspace::layouts.master')

@section('content')
    <style>
        .banner{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            height: 400px;
        }
        .flexbox-centering {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .white-text{
            color: #fff;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>contact us</h2>
        </div>
    </div>


@endsection