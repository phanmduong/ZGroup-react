@extends('trongdongpalace::layouts.master')

@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://trongdongpalace.com/ckfinder/userfiles/images/Edmonton-Wedding-Planner-Wedgewood-Room-Hotel-Macdonald-10.jpg'); height: 350px">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h4 class="description"><b>TRỐNG ĐỒNG PALACE</b></h4>
                        <h1 class="title">ĐẶT PHÒNG
                        </h1>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="col-md-6">
                <div class="row">
                    <div class="dropdown">
                        <button type="button" data-toggle="dropdown" class="btn btn-round dropdown-toggle"
                                aria-expanded="false"
                                style="background-color: #BA8A45; color: white; border-color: #BA8A45; text-align: right;">
                            @if($base_id)
                                {{\App\Base::find($base_id)->name}}
                            @else
                                Cơ sở
                            @endif
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu"
                            style="background: white; box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 10px -4px; border-radius: 0px !important;">
                            <a href="/booking?page=1&room_type_id={{$room_type_id}}" class="dropdown-item"
                               style="padding: 10px 15px !important; border-radius: 0px !important;">
                                Tất cả
                            </a>
                            @foreach($bases as $base)
                                <a href="/booking?page=1&base_id={{$base->id}}&room_type_id={{$room_type_id}}"
                                   class="dropdown-item"
                                   style="padding: 10px 15px !important; border-radius: 0px !important;">
                                    {{$base->name}}
                                </a>
                            @endforeach
                        </ul>
                    </div>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <div class="dropdown">
                        <button type="button" data-toggle="dropdown" class="btn btn-round dropdown-toggle"
                                aria-expanded="false"
                                style="background-color: #BA8A45; color: white; border-color: #BA8A45; text-align: right">
                            @if($room_type_id)
                                {{\App\RoomType::find($room_type_id)->name}}
                            @else
                                Loại phòng
                            @endif
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu"
                            style="background: white; box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 10px -4px; border-radius: 0px !important;">
                            <a href="/booking?page=1&base_id={{$base_id}}" class="dropdown-item"
                               style="padding: 10px 15px !important; border-radius: 0px !important;">
                                Tất cả
                            </a>
                            @foreach($room_types as $room_type)
                                <a href="/booking?page=1&base_id={{$base_id}}&room_type_id={{$room_type->id}}"
                                   class="dropdown-item"
                                   style="padding: 10px 15px !important; border-radius: 0px !important;">
                                    {{$room_type->name}}
                                </a>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                @foreach($rooms as $room)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="/room/{{$room->id}}{{$last_part}}">
                                    <div
                                        style="width: 100%;
                                                border-radius: 15px;
                                                background: url({{generate_protocol_url($room->avatar_url)}});
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"

                                    ></div>
                                </a>
                            </div>
                            <div class="card-block">
                                <h3 class="card-title">
                                    <a href="#">{{$room->base->name}}
                                        : {{$room->name}}</a>
                                </h3>
                                <p class="card-description">
                                    {{$room->roomType ? $room->roomType->name : ""}}
                                </p>
                                <br>
                                <a  onClick="openSubmitModal({{$room->id}})"
                                    style="color:#BA8A45!important">
                                    <b>Đặt phòng</b>
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <hr>
            <div id="pagination-rooms">
                <div class="pagination-area">
                    <ul class="pagination pagination-primary justify-content-center">
                        <li class="page-item">
                            <a href="/booking?page=1&search=" class="page-link">
                                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li v-for="page in pages"
                            v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                            <a v-bind:href="'/booking?page='+page+'&room_type_id={{$room_type_id}}&base_id={{$base_id}}'"
                               class="page-link">
                                @{{page}}
                            </a>
                        </li>
                        <li class="page-item">
                            <a href="/booking?page={{$total_pages}}&search=" class="page-link">
                                <i class="fa fa-angle-double-right" aria-hidden="true">
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
        </div>
</div>
    @include("trongdongpalace::includes.book_room_modal")
@endsection



@push('scripts')
    <script>
        var pagination = new Vue({
            el: '#pagination-rooms',
            data: {
                pages: []
            },
        });
        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
@endpush

