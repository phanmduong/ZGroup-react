@extends('elight::layouts.master') @section('content')
<link rel="stylesheet" href="/mediaelementplayer/mediaelementplayer.css">
<div class="container">
    <br>
    <br>
    <br>
    <br>
    <div class="row">
        <div class="col-md-8">
            <h1 style="font-size: 30px;font-weight:600; color:#424242;">{{$lesson->name}}</h1>
            <p>{{$lesson->description}}</p>
            <br>
            <div id="lesson_image" style="width: 100%;
                            background: url({{$lesson->image_url}});
                            background-size: cover;
                            background-position: center;
                            padding-bottom: 70%;">
            </div>
            <div class="media-wrapper">
                <audio id="player2" preload="none" controls style="max-width:100%;">
                    <source src="{{'https://api.soundcloud.com/tracks/'.$track_id.'/stream' . '?client_id='.config("app.sound_cloud_client_id")}}" type="audio/mp3">
                </audio>
            </div>
            <br>
            <div class="article-content">
                {!! $lesson->detail_content !!}
            </div>
        </div>
        <div class="col-md-4">
            <div class="dropdown">
                <input placeholder="Tìm kiếm" class="typeahead" data-provide="typeahead" id="search_lesson" style="width:100%; padding:20px; margin:15px 0 15px 0; border:none; font-size:15px"
                    type="text" />
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="dropdown">
                        <button type="button" data-toggle="dropdown" class="btn btn-round dropdown-toggle btn-block" aria-expanded="false" style="background-color: #0275d8; color: white; border-color: #0275d8; text-align: center;">
                            @if($term_id) {{\App\Term::find($term_id)->name}} @else Bài học @endif
                            <span class="caret" style="font-size=15px"></span>
                        </button>
                        <ul class="dropdown-menu" style="overflow: scroll; height: 450px;background: white; box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 10px -4px; border-radius: 5px !important; margin-top:6px">
                            @foreach($terms as $term)
                            <a href="/book/{{$course->id}}/{{$term->id}}" class="dropdown-item" style="padding: 10px 15px !important; border-radius: 0px !important;text-align: left">
                                {{$term->name}}
                            </a>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                @foreach (\App\Term::find($term_id)->lessons as $less)
                <div class="col-md-6">
                    <div style="margin-top:6px">
                        @if($less->id == $lesson->id)
                        <a href="/book/{{$course->id}}/{{$term->id}}/{{$less->id}}" class="not-active btn btn-round btn-block" aria-expanded="false"
                            style="background-color: #59b2ff!important; color: white; border-color: #59b2ff!important; text-align: center;">
                            {{$less->name}}
                        </a>
                        @else
                        <a href="/book/{{$course->id}}/{{$term_id}}/{{$less->id}}" class="btn btn-round btn-block" aria-expanded="false" style="background-color: white; color: black; border-color: #59b2ff; text-align: center;">
                            {{$less->name}}
                        </a>
                        @endif
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        <br>
        <br>
    </div>
    <br>
    <br>
    <br>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-8">
            <hr>
            <h3 class="card-title text-center">Đánh giá chất lượng</h3>
            <div>
                <div role="form" id="contact-form" method="post" action="#">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="card-block">

                        <div class="form-group label-floating">
                            <label class="control-label">
                                <strong style="font-weight:600">Đánh giá</strong>
                            </label>
                            <br>
                            <div class="row">
                                <div class="col-md-3">
                                    <label class="radio-inline">
                                        <input type="radio" name="optradio" value="Rất tốt"> Rất tốt
                                    </label>
                                </div>
                                <div class="col-md-3">
                                    <label class="radio-inline">
                                        <input type="radio" name="optradio" value="OK"> OK
                                    </label>
                                </div>
                                <div class="col-md-3">
                                    <label class="radio-inline">
                                        <input type="radio" name="optradio" value="Trung bình"> Trung bình
                                    </label>
                                </div>
                                <div class="col-md-3">
                                    <label class="radio-inline">
                                        <input type="radio" name="optradio" value="Kém"> Kém
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                <strong style="font-weight:600">Góp ý cho Elight</strong>
                            </label>
                            <input id="message" type="text" name="message" class="form-control" placeholder="Để lại góp ý, nhận xét của bạn nhé">
                        </div>
                        <div class="form-group label-floating">
                            <label class="control-label">
                                <strong style="font-weight:600">Số điện thoại hoặc email</strong>
                            </label>
                            <input id="email" type="text" name="email" class="form-control" placeholder="Để lại nếu bạn cần Elight hỗ trợ thêm">
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div id="alert"> </div>
                            </div>
                        </div>
                        <!-- <div class="pull-right">
                                <button id="submit" type="button" class="btn btn-primary" data-dismiss="modal" style="background-color:#138edc; border-color:#138edc ">Gửi</button>
                            </div> -->
                        <div class="row">
                            <div class="col-md-2">
                            </div>
                            <div class="col-md-8">
                                <a id="submit" class="btn btn-success btn-round" style="color:white; display: flex;align-items: center;justify-content: center;">Gửi thông tin </a>
                            </div>
                        </div>

                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <div class="comments media-area" style="z-index:997">
                <div class="fb-comments" data-href="{{config('app.protocol').config('app.domain').'/book/'.$course->id.'/'.$lesson->id}}"
                    data-width="100%" data-numposts="5">
                </div>
            </div>
        </div>
    </div>
</div>
@endsection @push('scripts')
<script>
    $(document).ready(function () {
        $("#submit").click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            var message_str = $('#message').val();
            var email = $('#email').val();
            var radio = $('input[name=optradio]:checked').val();
            var ok = 0;
            if (email.trim() == "" || message_str.trim() == "" || radio.trim() == "") ok = 1;

            if (!message_str || !email || !radio || ok == 1) {
                $("#alert").html(
                    "<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin và kiểm tra lại email</div>"
                );
            } else {
                var message = "Chúng tôi đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
                $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
                var url = "{{ url('book_information') }}";
                var data = {
                    lesson_id: {
                        {
                            $lesson - > id
                        }
                    },
                    message_str: message_str,
                    email: email,
                    radio: radio,
                    _token: "{{csrf_token()}}"
                };
                $.post(url, data, function (data, status) {})
                    .fail(function (error) {
                        console.log(error);
                    });
            }
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function () {
        // Defining the local dataset
        var data = {!!json_encode($lessons) !!
        };

        // Constructing the suggestion engine
        data = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('id', 'name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: data
        });

        data.initialize();

        // Initializing the typeahead
        $('#search_lesson').typeahead({
            hint: true,
            highlight: true,
            /* Enable substring highlighting */
            minLength: 1 /* Specify minimum characters required for showing result */
        }, {
            name: 'lessons',
            display: function (item) {
                return item.name
            },
            source: data.ttAdapter(),

        });
        $('#search_lesson').on('typeahead:selected', function (e, datum) {
            window.open("/book/{{$course->id}}/" + datum.id, "_self");
        });
    });
</script>
@endpush