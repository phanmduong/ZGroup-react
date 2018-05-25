@extends('trongdongpalace::layouts.master')
@section('content')
    <div id="gdlr-header-substitute"></div>
    <!-- is search -->
    <div class="gdlr-page-title-wrapper">
        <div class="gdlr-page-title-overlay"></div>
        <div class="gdlr-page-title-container container">

            <div class="gdlr-reservation-field gdlr-resv-combobox " style="display:inline">

                <div class="gdlr-combobox-wrapper" style="display:inline">
                    <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);" name="gdlr-night" style="background: #b89f80;color: white;min-width: 213px;height: 40px;border: none!important;margin: 10px; font-size:14px; font-family:'Open Sans'; padding:10px">
                    <option value="#" selected="">
                        @if($base_id)
                            {{\App\Base::find($base_id)->name}}
                        @else
                            Cơ sở
                        @endif
                    </option>
                    <option value="/booking?page=1&room_type_id={{$room_type_id}}">Tất cả</option>
                    @foreach($bases as $base)
                        <option value="/booking?page=1&base_id={{$base->id}}&room_type_id={{$room_type_id}}">{{$base->name}}</option>
                    @endforeach
                </select></div>
                <div class="gdlr-combobox-wrapper"  style="display:inline">
                    <select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);" name="gdlr-night" style="background: #b89f80;color: white;min-width: 213px;height: 40px;border: none!important;margin: 10px; font-size:14px; font-family:'Open Sans'">
                        <option value="#" selected="">
                            @if($room_type_id)
                                {{\App\RoomType::find($room_type_id)->name}}
                            @else
                                Loại phòng
                            @endif
                        </option>
                            <option value="/booking?page=1&base_id={{$base_id}}">Tất cả</option>

                            @foreach($room_types as $room_type)
                                <option value="/booking?page=1&base_id={{$base_id}}&room_type_id={{$room_type->id}}">
                                    {{$room_type->name}}
                                </option>
                            @endforeach
                    </select></div>
            </div>
        </div>
    </div>
    <div class="content-wrapper">
        <div class="gdlr-content">

            <!-- Above Sidebar Section-->

            <!-- Sidebar With Content Section-->
            <div class="with-sidebar-wrapper">
                <section id="content-section-1">
                    <div class="section-container container">
                        <div class="room-item-wrapper type-modern" style="margin-bottom: 20px;">
                            <div class="room-item-holder ">
                                <div class="clear"></div>
                                @foreach($rooms as $room)
                                    <div class="four columns">
                                        <div class="gdlr-item gdlr-room-item gdlr-modern-room">
                                            <div class="gdlr-ux gdlr-modern-room-ux">
                                                <!-- <div class="gdlr-room-thumbnail"><a
                                                        href="/room/{{$room->id}}{{$last_part}}"><img
                                                        src="{{generate_protocol_url($room->avatar_url)}}"
                                                        alt="" width="700" height="400" style="transform: scale(1, 1);"></a>
                                                </div> -->
                                                <a href="/room/{{$room->id}}{{$last_part}}">
                                                    <div class="product-item">
                                                        <div style="background-image: url({{generate_protocol_url($room->avatar_url)}}); background-size: cover; background-position: center center; padding-bottom: 70%">
                                                        </div>
                                                    </div>
                                                </a>
                                                <br>
                                                <h3 class="gdlr-room-title"><a
                                                        href="/room/{{$room->id}}{{$last_part}}">{{$room->name}}</a></h3><a
                                                    href="/room/{{$room->id}}{{$last_part}}"
                                                    class="gdlr-room-detail">Xem chi tiết<i
                                                    class="fa fa-long-arrow-right icon-long-arrow-right"></i></a></div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </section>
            </div>

            <!-- Below Sidebar Section-->


        </div><!-- gdlr-content -->
        <div class="clear"></div>
    </div>
@endsection