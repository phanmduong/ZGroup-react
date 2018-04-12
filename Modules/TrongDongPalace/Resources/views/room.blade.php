@extends('trongdongpalace::layouts.master')

@section('content')
<style>
    .carousel-control, .carousel-indicators .active {
        background-color:#BA8A45!important;
    }
</style>    
@if($room->cover_type == "360_STEREO" || $room->cover_type == "360")
    <div style="margin-top: 70px;" id='vrview'></div>
@endif

@if($room->cover_type == "")
    <div style="margin-top: 70px;background-image:url('{{$room->cover_url}}');background-size:cover;background-position:center;height:600px">                
    </div>
@endif
<div class="container" style="padding: 50px 100px">
        <div class="row">
                
                <div class="col-sm-7 col-md-8">

                    <div id="carousel" class="ml-auto mr-auto" style="width:100%">
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
                    {!! $room->detail !!}
                </div>

                <div class="col-sm-5 col-md-4">
                        <h3>{{$room->name}}</h3>
                        <br/>
                        @if($room->roomType)
                            <span class="label label-default shipping">{{$room->roomType->name}}</span>
                        @endif
                        <hr>
                        <p>Số chỗ ngồi: {{$room->seats_count}}</p>             
                        <p>{{$room->description}}</p>                           
                        <hr>
                        <div class="row">
                            <div class="col-md-7 col-sm-8">
                            <button onClick="openSubmitModal({{$room->id}})" class="btn btn-danger btn-block btn-round" 
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

@if($room->cover_type == "360_STEREO" || $room->cover_type == "360")
    <script>
        window.addEventListener('load', onVrViewLoad);

        function onVrViewLoad() {
        // Selector '#vrview' finds element with id 'vrview'.
            // console.log("test");
            var vrView = new VRView.Player('#vrview', {
                image: '{{$room->cover_url}}',
                is_stereo: {{$room->cover_type == "360" ? "false" : "true"}},
                width: '100%',
                height: 600,
            });
        }
    </script>
@endif

@include("trongdongpalace::includes.book_room_modal")

@endsection
