@extends('layouts.app')

@section('title','Danh sách đăng kí học')

@section('content')
    <h3 class="header">
        Sửa khoá học
    </h3>
    <div class="row">
        <form method="post" action="{{url('manage/storeeditgen')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <input type="hidden" name="gen_id" value="{{$gen->id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="name" type="text" value="{{$gen->name}}" class="validate">
                    <label for="name">Tên khoá</label>
                </div>
                <div class="input-field col s12">
                    <input id="description" name="description" type="text" value="{{$gen->description}}"
                           class="validatảte">
                    <label for="description">Mô tả</label>
                </div>
                <div class="input-field col s12">
                    <input id="start_time" name="start_time" type="text" class="datepicker"
                           value="{{format_date_to_mysql($gen->start_time)}}">
                    <label for="start_time">Thời gian bắt đầu</label>
                </div>
                <div class="input-field col s12">
                    <input id="end_time" name="end_time" type="text" class="datepicker"
                           value="{{format_date_to_mysql($gen->end_time)}}">
                    <label for="end_time">Thời gian kết thúc</label>
                </div>
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Cover</span>
                            <input name="cover" type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" value="{{$gen->cover_name}}" type="text">
                        </div>
                    </div>
                    @if($isEdit)
                        <img src="{{$gen->cover_url}}" height="350"/>
                    @else
                        <img src="https://placehold.it/1130x350" height="350"/>
                    @endif
                </div>
                <div class="input-field col s12">
                    <textarea name="detail" id="detail">{{$gen->detail}}</textarea>
                </div>

                <div class="col s12" style="padding-bottom: 20px">
                    <label>Đặt làm khoá tuyển sinh hiện tại</label>
                    <!-- Switch -->
                    <div class="switch">
                        <label>
                            Off
                            <input name="status" type="checkbox" {{($gen->status==1)?"checked":""}}>
                            <span class="lever"></span>
                            On
                        </label>
                    </div>
                </div>

                <div class="col s12" style="padding-bottom: 20px">
                    <label>Đặt làm khoá giảng dạy hiện tại</label>
                    <!-- Switch -->
                    <div class="switch">
                        <label>
                            Off
                            <input name="teach_status" type="checkbox" {{($gen->teach_status==1)?"checked":""}}>
                            <span class="lever"></span>
                            On
                        </label>
                    </div>
                </div>

                <div class="col s12">
                    <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                           id="submit"/>
                </div>


            </div>
        </form>

    </div>
    <script>
        $(document).ready(function () {
            $('.datepicker').datepicker();
            CKEDITOR.replace('detail', {
                allowedContent: true
            });
        });
    </script>

@endsection
