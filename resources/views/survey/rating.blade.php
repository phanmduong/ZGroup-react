<div class="row" id="rating-container{{$register->id}}">
    <div class="col s12">
        <h5>Lớp {{$register->studyClass->name}}</h5>
    </div>
    <div class="col s12">
        <table class="striped responsive-table">
            @if($register->studyClass->teach != null)
                <tr>
                    <td>Giảng viên</td>
                    <td>{{$register->studyClass->teach->name}}</td>
                </tr>
                <tr>
                    <td>Đánh giá</td>
                    <td>
                        <div id="rating_teacher{{$register->id}}"></div>
                        <input value="4" id="rating_teacher_input{{$register->id}}" type="hidden"/>
                    </td>
                </tr>
                <tr>
                    <td>Nhận xét</td>
                    <td><input placeholder="Nhận xét giảng viên" type="text" id="comment_teacher{{$register->id}}"/>
                    </td>
                </tr>
            @endif
            @if($register->studyClass->assist != null)
                <tr>
                    <td>Trợ giảng</td>
                    <td>{{$register->studyClass->assist->name}}</td>
                </tr>
                <tr>
                    <td>Đánh giá</td>
                    <td>
                        <div id="rating_ta{{$register->id}}"></div>
                        <input value="4" id="rating_ta_input{{$register->id}}" type="hidden"/>
                    </td>
                </tr>
                <tr>
                    <td>Nhận xét</td>
                    <td><input placeholder="Nhận xét trợ giảng" type="text" id="comment_ta{{$register->id}}"/></td>
                </tr>
            @endif
        </table>
    </div>
    <div class="col s12" id="btn_send_rating_container{{$register->id}}">
        <button onclick="submitRating({{$register->id}})" style="margin-top:10px" class="waves-effect waves-light btn">
            Gửi
        </button>
    </div>

    {{--<div class="col s4">--}}
    {{--Giảng viên--}}
    {{--</div>--}}
    {{--<div class="col s8">--}}
    {{--{{$register->studyClass->teach->name}}--}}
    {{--</div>--}}
    {{--<div class="col s4">--}}
    {{--Đánh giá--}}
    {{--</div>--}}
    {{--<div class="col s8">--}}
    {{--<div id="rating-teacher{{$register->id}}"></div>--}}
    {{--</div>--}}
    {{--<div class="col s4">--}}
    {{--Trợ giảng--}}
    {{--</div>--}}
    {{--<div class="col s8">--}}
    {{--{{$register->studyClass->assist->name}}--}}
    {{--</div>--}}
    {{--<div class="col s4">--}}
    {{--Đánh giá--}}
    {{--</div>--}}
    {{--<div class="col s8">--}}
    {{--<div id="rating-ta{{$register->id}}"></div>--}}
    {{--</div>--}}
</div>
<script>

    $(document).ready(function () {
        @if($register->studyClass->teach != null)
        // target element
        var ratingTeacher{{$register->id}} = document.querySelector('#rating_teacher{{$register->id}}');
        // current rating, or initial rating
        var currentRatingTeacher = 4;
        var currentRatingTa = 4;

        // max rating, i.e. number of stars you want
        var maxRating = 5;

        // callback to run after setting the rating
        var teacherCallback{{$register->id}} = function (rating) {
            $('#rating_teacher_input{{$register->id}}').val(rating);
        };
        // rating instance
        var teacherRating{{$register->id}} = rating(ratingTeacher{{$register->id}}, currentRatingTeacher, maxRating, teacherCallback{{$register->id}});
                @endif
                @if($register->studyClass->assist != null)
        var ratingTa{{$register->id}} = document.querySelector('#rating_ta{{$register->id}}');
        var taCallback{{$register->id}} = function (rating) {
            $('#rating_ta_input{{$register->id}}').val(rating);
        };
        var taRating{{$register->id}} = rating(ratingTa{{$register->id}}, currentRatingTa, maxRating, taCallback{{$register->id}});
        @endif
    });
</script>