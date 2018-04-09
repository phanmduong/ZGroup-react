@extends('upcoworkingspace::layouts.en-master')


@section('en-content')
    <style>
        .banner {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
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

        .white-text {
            color: #fff;
        }
        .green-text {
            color: #96d21f;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>contact us</h2>
        </div>
    </div>
    <br/>
    <br/>
    <div class="container">
        <p>
            <h3 class="font-weight-bold">COME & VISIT</h3>
            <br/>
            <b>Address:</b> Level 8, No. 1 Luong Yen street, Hanoi Creative City Building, 1 Luong Yen Stress, Hai Ba Trung, Hanoi.
            <br/>
            <b>Phone:</b> (+84)4 7 308 0668
            <br/>
            <b>Email:</b> info@up-co.vn
            <br/><br/>
            <h3 class="font-weight-bold">HOW TO COME UP COWORKING SPACE? </h3>
            <br/>
            UP coworking space is nearly the center of Hanoi City, if you want go to Up, you only need to:
        </p>
        <ul>
            <li>
                    3 minutes from Hanoi Opera House
            </li>
            <li>
                    5 minutes from Chuong Duong Bridge
            </li>
            <li>
                    5 minutes from Times City
            </li>
            <li>
                    6 minutes from Hanoi Technology University
            </li>
        </ul>
        <br/><br/>
    </div>


@endsection