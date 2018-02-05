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
                        <ul class="dropdown-menu dropdown-menu-right"
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
                        <ul class="dropdown-menu dropdown-menu-right"
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
                                <a href="{{'/booking/'.$room->id}}">
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
                                    <a href="{{'/booking/'.$room->id}}">{{$room->base->name}}
                                        : {{$room->name}}</a>
                                </h3>
                                <p class="card-description">
                                    {{$room->roomType->name}}
                                </p>
                                <br>
                                <a href=""
                                   data-target="#submitModal"
                                   data-toggle="modal"
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
    <div id="submitModal" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    <div class="container">
                        <form class="register-form ">
                            <h6>Họ và tên</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>
                            <h6>Số điện thoại</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
                            <h6>Email</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="email" type="text" class="form-control" placeholder="Địa chỉ email"><br>
                            <h6>Lời nhắn</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="message" type="text" class="form-control" placeholder="Lời nhắn"><br>
                        </form>
                    </div>
                    <div class="alert alert-danger" v-if="alert"
                         style="margin-top: 10px"
                         id="purchase-error">
                        @{{ alert }}
                    </div>
                </div>
                <div v-if="isLoading" style="text-align: center;width: 100%;;padding: 15px;">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-purchase" class="btn btn-sm btn-main"
                            style="margin: 10px 10px 10px 0px !important; background-color: #BA8A45; border-color: #BA8A45"
                            v-on:click="submit">
                        Xác nhận</i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalSuccess" class="modal fade">
        <div class="modal-dialog modal-large">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2 class="medium-title">Chúc mừng bạn đã đăng ký thành công</h2>
                </div>
                <div class="modal-body">
                    {{--<img class="vc_single_image-img " src="http://up-co.vn/wp-content/uploads/2016/08/384x176logo_03-120x120.png" width="120" height="120" alt="384x176logo_03-120x120" title="384x176logo_03-120x120">--}}
                    <div style='text-align: center'>
                        Up đã nhận được đăng ký của bạn, bạn vui lòng kiểm tra email.<br>
                        Up sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        var submitModal = new Vue({
            el: '#submitModal',
            data: {
                name: '',
                email: '',
                phone: '',
                message: '',
                alert: '',
                isLoading: false
            },
            methods: {
                submit: function () {
                    if (this.name === '' || this.email === '' || this.phone === '' || this.message === '') {
                        this.alert = 'Bạn vui lòng nhập đủ thông tin';
                        return;
                    }
                    this.isLoading = true;
                    axios.post(window.url + '/api/contact', {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        message: this.message,
                        _token: window.token
                    })
                        .then(function (response) {
                            this.name = "";
                            this.phone = "";
                            this.email = "";
                            this.message = "";
                            this.isLoading = false;
                            $("#submitModal").modal("hide");
                            $("#modalSuccess").modal("show");
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
        var pagination = new Vue({
            el: '#pagination-rooms',
            data: {
                pages: []
            },
        });
        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
@endpush

