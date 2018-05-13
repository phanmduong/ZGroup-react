@extends('trongdongpalace::layouts.master')

@section('content')
    <div id="gdlr-header-substitute"></div>
    <!-- is search -->
    <div class="gdlr-page-title-wrapper">
        <div class="gdlr-page-title-overlay"></div>
        <div class="gdlr-page-title-container container">
            <h1 class="gdlr-page-title">{{$room->name}}</h1>
            <span class="gdlr-page-caption">{{$room->base->name}}</span>
        </div>
    </div>
    <div class="content-wrapper">
        <div class="gdlr-content">

            <div class="with-sidebar-wrapper">
                <div class="with-sidebar-container container gdlr-class-no-sidebar">
                    <div class="with-sidebar-left twelve columns">
                        <div class="with-sidebar-content twelve columns">
                            <div class="gdlr-item gdlr-item-start-content">
                                <div id="room-3595"
                                     class="post-3595 room type-room status-publish has-post-thumbnail hentry room_category-room room_tag-luxury room_tag-room room_tag-superior">

                                    <div class="gdlr-room-main-content">
                                        <div class="gdlr-room-thumbnail gdlr-single-room-thumbnail">
                                            <div class="flexslider" data-pausetime="7000" data-slidespeed="600"
                                                 data-effect="fade">
                                                <ul class="slides">
                                                    <li class=""
                                                        style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                                        <img src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-7-750x330.jpg"
                                                             alt="" width="750" height="330" draggable="false"></li>
                                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"
                                                        class="flex-active-slide"><a
                                                            href="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-3.jpg"
                                                            data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img
                                                            src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-3-750x330.jpg"
                                                            alt="" width="750" height="330" draggable="false"></a></li>
                                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
                                                        class=""><a
                                                            href="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-4.jpg"
                                                            data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img
                                                            src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-4-750x330.jpg"
                                                            alt="" width="750" height="330" draggable="false"></a></li>
                                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
                                                        class=""><a
                                                            href="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-5.jpg"
                                                            data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img
                                                            src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-5-750x330.jpg"
                                                            alt="" width="750" height="330" draggable="false"></a></li>
                                                    <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
                                                        class=""><a
                                                            href="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-1.jpg"
                                                            data-fancybox-group="gdlr-gal-1" data-rel="fancybox"><img
                                                            src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-1-750x330.jpg"
                                                            alt="" width="750" height="330" draggable="false"></a></li>
                                                </ul>
                                                <ul class="flex-direction-nav">
                                                    <li><a class="flex-prev" href="#"><i
                                                            class="icon-angle-left"></i></a></li>
                                                    <li><a class="flex-next" href="#"><i
                                                            class="icon-angle-right"></i></a></li>
                                                </ul>
                                            </div>
                                            <ul class="gdlr-flex-thumbnail-control" id="gdlr-flex-thumbnail-control">
                                                <li><img
                                                        src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-7-150x150.jpg"
                                                        alt="" width="150" height="150" class=""></li>
                                                <li><img
                                                        src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-3-150x150.jpg"
                                                        alt="" width="150" height="150" class="flex-active"></li>
                                                <li><img
                                                        src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-4-150x150.jpg"
                                                        alt="" width="150" height="150" class=""></li>
                                                <li><img
                                                        src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-5-150x150.jpg"
                                                        alt="" width="150" height="150" class=""></li>
                                                <li><img
                                                        src="http://demo.goodlayers.com/hotelmaster/dark/wp-content/uploads/2015/03/single-room-slider-1-150x150.jpg"
                                                        alt="" width="150" height="150" class=""></li>
                                            </ul>
                                        </div>
                                        <div class="gdlr-room-title-wrapper">
                                            <h3 class="gdlr-room-title">{{$room->name}} - {{$room->base->name}}</h3>
                                            <div class="gdlr-room-price"><span class="gdlr-head">Start From</span><span
                                                    class="gdlr-tail">$80.00 / Night</span></div>
                                            <div class="clear"></div>
                                        </div>
                                        <div class="gdlr-hotel-room-info">
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Bed</span><span
                                                    class="gdlr-tail">2 Double Beds</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Max</span><span
                                                    class="gdlr-tail">4 People</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">View</span><span
                                                    class="gdlr-tail">City</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Room Size</span><span
                                                    class="gdlr-tail">70 sqm.</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Wifi</span><span
                                                    class="gdlr-tail">Yes</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Breakfast Included</span><span
                                                    class="gdlr-tail">Yes</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Room Service</span><span
                                                    class="gdlr-tail">Yes</span></div>
                                            <div class="gdlr-room-info"><i
                                                    class="fa fa-check-square-o icon-check"></i><span class="gdlr-head">Airport Pickup Service</span><span
                                                    class="gdlr-tail">No</span></div>
                                            <div class="clear"></div>
                                        </div>
                                        <div class="gdlr-room-content"><p>Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Sed posuere consectetur est at lobortis. Nullam quis
                                            risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et
                                            magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio,
                                            dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus
                                            varius blandit sit amet non magna.</p>
                                            <p>Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis
                                                interdum. Donec id elit non mi porta gravida at eget metus. Vestibulum
                                                id ligula porta felis euismod semper. Maecenas faucibus mollis interdum.
                                                Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio
                                                dui.</p>
                                            <div class="clear"></div>

                                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                                                lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue.
                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                                Etiam porta sem malesuada magna mollis euismod. Etiam porta sem
                                                malesuada magna mollis euismod. Sed posuere consectetur est at
                                                lobortis.</p>
                                            <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
                                                vestibulum. Nulla vitae elit libero, a pharetra augue. Morbi leo risus,
                                                porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus
                                                magna, vel scelerisque nisl consectetur et. Aenean eu leo quam.
                                                Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                                        </div>
                                        <a class="gdlr-button with-border"
                                           href="/register/{{$room->id}}">Đặt phòng này <i class="fa fa-long-arrow-right icon-long-arrow-right"></i></a>
                                    </div>
                                </div><!-- #room -->

                                <div class="clear"></div>
                            </div>
                        </div>

                        <div class="clear"></div>
                    </div>

                    <div class="clear"></div>
                </div>
            </div>

        </div><!-- gdlr-content -->
        <div class="clear"></div>
    </div>
@endsection