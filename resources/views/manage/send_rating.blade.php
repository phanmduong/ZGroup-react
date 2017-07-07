@extends('layouts.app')

@section('title','Gửi đánh giá')

@section('content')

    <div class="row">
        <form method="get">
            <div class="input-field col s6">
                <select name="gen_id">
                    <option value="" disabled selected>Choose your option</option>
                    @foreach($gens as $item)
                        <option value="{{$item->id}}"
                                {{($gen->id == $item->id)?'selected':''}}>Khoá {{$item->name}}</option>
                    @endforeach
                </select>
                <label>Khoá</label>
            </div>
            <div class="col s6" style="padding-top: 30px">
                <input type="submit" class="btn" value="Chọn"/>
            </div>
        </form>
    </div>
    <div class="row">
        <div class="col s12 m8">
            <ul class="collection with-header">
                @foreach($gen->studyclasses as $class)
                    <li class="collection-item">
                        <div>Lớp {{$class->name}} - <span style="color:#a2a2a2">{{$class->study_time}}</span>
                            <span class=" secondary-content" id="btn-send-container{{$class->id}}">
                                @if($class->rating_sended == 0)
                                    <a onclick="sendSurvey({{$class->id}})" href="#!">Gửi</a></span>
                            @else
                                <i class=" teal-text material-icons">done</i>
                            @endif
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
    <script>
        function sendSurvey(class_id) {
            $('#btn-send-container' + class_id).html('Đang gửi...');
            $.post(
                    '{{url('ajax/sendrating')}}',
                    {
                        _token: '{{csrf_token()}}',
                        class_id: class_id,
                    },
                    function (data, status) {
                        $('#btn-send-container' + class_id).html(data);
                    }
            )
        }
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection
