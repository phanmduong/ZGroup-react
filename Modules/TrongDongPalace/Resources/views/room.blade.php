@extends('trongdongpalace::layouts.master')

@section('content')
<style>
    .carousel-control, .carousel-indicators .active {
        background-color:#BA8A45!important;
    }
</style>
<div id='vrview'></div>
<div class="container" style="padding: 50px 100px">
        <div class="row">
                <div class="col-md-7 col-sm-6">

                    <div id="carousel" class="ml-auto mr-auto">
                        <div class="card page-carousel">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
                                <ol class="carousel-indicators">
                                    @foreach($images as $key => $value)
                                <li data-target="#carouselExampleIndicators" data-slide-to="{{$key}}" class=""></li>
                                    @endforeach
                                </ol>
                                <div class="carousel-inner" role="listbox">
                                    @foreach($images as $key => $image)
                                        <div class="carousel-item {{$key == 0 ? "active" : ""}}" 
                                            style="border-radius: 5px; height: 300px;background-image:url('{{$image}}');background-position:center;background-size: cover">
                                            {{--  <img  class="d-block img-fluid" src="{{$image}}" alt="Awesome Item">  --}}
                                            {{--  <div class="carousel-caption d-none d-md-block">
                                                <p>Somewhere</p>
                                            </div>  --}}
                                        </div>
                                    @endforeach
                                    
                                </div>

                                <a 
                                    class="left carousel-control carousel-control-prev" href="#carouselExampleIndicators" 
                                    role="button" data-slide="prev">
                                    <span class="fa fa-angle-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a 
                                    class="right carousel-control carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="fa fa-angle-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div> <!-- end carousel -->

                </div>
                <div class="col-md-5 col-sm-6">
                    <h3>{{$room->name}}</h3>
                    <br/>
                    @if($room->roomType)
                        <span class="label label-default shipping">{{$room->roomType->name}}</span>
                    @endif
                    <hr>
                    <p>Số chỗ ngồi: {{$room->seats_count}}</p>
                    

                    
                    <hr>
                    <div class="row">
                        <div class="col-md-7 col-sm-8">
                            <button class="btn btn-danger btn-block btn-round" 
                            style="background-color: #BA8A45;
                            border-color: #BA8A45;">
                            Đặt ngay &nbsp;<i class="fa fa-chevron-right"></i>
                        </button>
                        </div>
                    </div>
                </div>
            </div>    
               
</div>
<script src="http://storage.googleapis.com/vrview/2.0/build/vrview.min.js"></script>
<script>
    window.addEventListener('load', onVrViewLoad);

    function onVrViewLoad() {
    // Selector '#vrview' finds element with id 'vrview'.
        // console.log("test");
        var vrView = new VRView.Player('#vrview', {
            image: 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1520506226n0z3j3pj8izkKjg.jpg',
            is_stereo: true,
            width: '100%',
            height: 600,
        });
    }
</script>
@endsection
