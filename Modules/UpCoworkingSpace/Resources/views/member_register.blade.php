@extends('upcoworkingspace::layouts.master')

@section('content')
    <div id="memberRegister" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    <div class="container">
                        <form class="register-form ">                               
                                                        
                            <h6>Họ và tên</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Họ và tên"><br>
                            <h6>Số điện thoại</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Số điện thoại"><br>
                            <h6>Email</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Địa chỉ email"><br>
                            <h6>Địa chỉ</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Địa chỉ"><br>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-purchase" class="btn btn-sm btn-main"
                            v-on:click="submit"
                            style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="page-header page-header-xs"
         style="background-image: url('http://up-co.vn/wp-content/uploads/revslider/homevi/126A6996.jpg'); height: 350px">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h4 class="description"><b>UP CO-WORKING SPACE</b></h4>
                        <h1 class="title">
                            Gói thành viên
                        </h1>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="row">
                @foreach($userPacks as $userPack)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="{{'/conference-room/'.$userPack->id}}">
                                    <div
                                            style="width: 100%;
                                                    border-radius: 15px;
                                                    background: url({{generate_protocol_url($userPack->avatar_url)}});
                                                    background-size: cover;
                                                    background-position: center;
                                                    padding-bottom: 70%;"

                                    ></div>
                                </a>
                            </div>
                            <div class="card-block">
                                <h3 class="card-title">
                                    <a href="{{'/conference-room/'.$userPack->id}}">{{$userPack->name}}</a>
                                </h3>
                                {{--  <p class="card-description">
                                    {{$room->roomType->name}}
                                </p>  --}}
                                <br/>
                                <a href=""
                                   data-target="#memberRegister"
                                   data-toggle="modal"
                                   class="btn btn-primary"
                                   style="background-color:#96d21f;border-color:#96d21f; color:white!important;">
                                    <b>Đặt phòng</b>
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
            <hr>            
    </div>

@endsection

@push('scripts')
    <script>
        var memberRegister = new Vue({
            el: '#memberRegister',
            data: {
                campaignId: {{$campaignId}},
                userId: {{$userId}}                
            },
            methods: {
                submit: function () {
                    $("#memberRegister").modal("hide");
                    $("#modalSuccess").modal("show");
                }
            }
        })
    </script>
@endpush

