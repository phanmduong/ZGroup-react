@extends('layouts.app')

@section('title',$cam->name)

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">{{isset($cam)?'Sửa':'Tạo'}} chiến dịch</h3>
        </div>
    </div>
    <div class="row">
        <form method="post" action="{{url('manage/campaign/store_campaign')}}">
            {{csrf_field()}}
            <div class="input-field col s12">
                <input name="name" id="name" value="{{$cam->name}}" type="text" class="validate">
                <label for="name">Name</label>
            </div>
            <input name="edit" value="1" type="hidden">
            <input name="cam_id" type="hidden" value="{{$cam->id}}"/>
            <div class="input-field col s12">
                <input name="subject" id="subject" value="{{$cam->subject}}" type="text" class="validate">
                <label for="subject">Subject</label>
            </div>
            {{--<div class="input-field col s12">--}}
            {{--<select name="list_id">--}}
            {{--<option value="" disabled selected>Choose your option</option>--}}
            {{--@foreach($lists as $l)--}}
            {{--@if($l->id == $cam->list_id)--}}
            {{--<option selected value="{{$l->id}}">{{$l->name}}</option>--}}
            {{--@else--}}
            {{--<option value="{{$l->id}}">{{$l->name}}</option>--}}
            {{--@endif--}}
            {{--@endforeach--}}
            {{--</select>--}}
            {{--<label>Danh sách</label>--}}
            {{--</div>--}}
            <div class="col s12">
                <label>Danh sách</label>
                <input id="list_id" name="list_id" value="{{isset($cam)?$cam->lists:''}}" type="hidden">
                <ul id="list_id_tag">
                </ul>
            </div>
            <div class="col s12" style="padding-bottom: 20px">
                <p style="color: #c50000;" id="message"></p>
            </div>
            <div class="col s12">
                <input class="btn" type="submit"/>
            </div>
        </form>
    </div>
    <script>
        $(document).ready(function () {
            var tags = {!! $tags!!};
            $('select').material_select();
            $("#list_id_tag").tagit({
                availableTags: tags,
                singleField: true,
                singleFieldNode: $('#list_id'),
                beforeTagAdded: function (event, ui) {
                    // do something special
                    var label = ui.tagLabel;
                    var a = tags.indexOf(label);
                    if (a === -1) {
                        $('#message').html('Danh sách bạn nhập không tồn tại. Lưu ý: bạn hãy gõ tên danh sách bắt đầu từ chữ cái đầu tiên và hệ thông sẽ gợi ý');
                        return false;
                    }
                }
            });

        });
    </script>
@endsection
