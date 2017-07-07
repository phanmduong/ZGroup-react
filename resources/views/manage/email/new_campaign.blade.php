@extends('layouts.app')

@section('title','Tạo chiến dịch')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">Tạo chiến dịch</h3>
        </div>
    </div>
    <div class="row">
        <form method="post" action="{{url('manage/campaign/store_campaign')}}">
            {{csrf_field()}}
            <div class="input-field col s12">
                <input name="name" id="name" type="text" class="validate">
                <label for="name">Name</label>
            </div>
            <div class="input-field col s12">
                <input name="subject" id="subject" type="text" class="validate">
                <label for="subject">Subject</label>
            </div>
            <input name="edit" value="0" type="hidden">
            <div class="col s12">
                <label>Danh sách</label>
                <input id="list_id" name="list_id" type="hidden">
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
            $('select').material_select();
            var tags = {!! $tags!!};
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
