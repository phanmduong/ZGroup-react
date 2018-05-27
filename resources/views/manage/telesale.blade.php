@extends('layouts.app')

@section('title','Telesale')

@section('content')
    <h3 class="header">
        Telesale
    </h3>
    <div class="row" id="tele-search-wrapper">
        <div class="col s8">
            <input placeholder="Email, tên hoặc số điện thoại" type="text" id="telesale-search-student"/>
        </div>
        <div class="col s4">
            <button class="btn red darken-4" id="telesale-search-btn" onclick="searchStudent()">Search</button>
        </div>
        <div class="col s12 red-text darken-4" id="seach-error">
        </div>
        <div class="col s12">
            <h5 id="table-search-name">20 học viên đăng kí gần nhất</h5>
            <table class="striped responsive-table">
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Lớp học</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="search-result-tbody">
                <h5>Đang tải dữ liệu...</h5>
                </tbody>
            </table>
        </div>
    </div>

    <p>Tổng số người chưa gọi: <strong id="uncalled">{{$total_uncalled}}</strong></p>
    <p>Tổng số người đã gọi: <strong id="called">{{$total_called}}</strong></p>
    <button class="waves-effect waves-light btn red "
            {{(isset($calling_telecalls) && $calling_telecalls->count() > 0)?'style=display:none':' '}} id="fetch-student">
        Gọi học viên bất kì
    </button>

    <div class="row">
        <h4 style="font-weight: lighter">Đang gọi</h4>
        <div class="col s12" id="calling-area" style="padding-top: 20px">
            <div class="progress" style="display: none" id="preloader">
                <div class="indeterminate"></div>
            </div>
            @if(isset($calling_telecalls))

                @foreach($calling_telecalls as $calling_telecall)

                    <div class="row">
                        <div class="card">
                            <div class="card-content">
                                <ul class="collapsible" data-collapsible="accordion">
                                    <li>
                                        <div class="collapsible-header"><i
                                                    class="material-icons">filter_drama</i>{{$calling_telecall->student->name}}
                                            : {{$calling_telecall->student->phone}}</div>
                                        <div class="collapsible-body">
                                            <table class="responsive-table">
                                                <thead>
                                                <tr>
                                                    <th>Họ tên</th>
                                                    <th>Email</th>
                                                    <th>Trường</th>
                                                    <th>Nơi làm việc</th>
                                                    <th>Địa chỉ</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{{$calling_telecall->student->name}}</td>
                                                    <td>{{$calling_telecall->student->email}}</td>
                                                    <td>{{$calling_telecall->student->university}}</td>
                                                    <td>{{$calling_telecall->student->work}}</td>
                                                    <td>{{$calling_telecall->student->address}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="collapsible-header"><i
                                                    class="material-icons">filter_drama</i>Thông tin đăng kí học
                                        </div>
                                        <div class="collapsible-body">
                                            <table class="responsive-table">
                                                <thead>
                                                <tr>
                                                    <th>Khoá học</th>
                                                    <th>Số buổi</th>
                                                    <th>Học phí (Chưa có chiết khấu)</th>
                                                    <th>Lớp</th>
                                                    <th>Giờ học</th>
                                                    <th>Giảng viên</th>
                                                    <th>Trợ giảng</th>
                                                    <th>Thời gian đăng kí</th>
                                                    <th>Saler</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                @foreach($calling_telecall->student->registers as $register)
                                                    <tr>
                                                        <td>{{$register->studyClass->course->name}}</td>
                                                        <td>{{$register->studyClass->course->duration}}</td>
                                                        <td>{{currency_vnd_format($register->studyClass->course->price)}}</td>
                                                        <td>{{$register->studyClass->name}}</td>
                                                        <td>{{$register->studyClass->study_time}}</td>
                                                        <td>{{$register->studyClass->teach['name']}}</td>
                                                        <td>{{$register->studyClass->assist['name']}}</td>
                                                        <td>{{format_date($register->created_at)}}</td>
                                                        <td>
                                                            @if($register->saler)
                                                                {{$register->saler->name}}
                                                            @endif
                                                        </td>
                                                    </tr>
                                                @endforeach
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="collapsible-header"><i class="material-icons">place</i>Lịch sử gọi
                                        </div>
                                        <div class="collapsible-body">
                                            <ul class="collection with-header">
                                                @foreach($calling_telecall->student->is_called->sortByDesc('updated_at') as $item)
                                                    <li class="collection-item">
                                                        <div>{{format_date_full_option($item->updated_at)}}</div>
                                                        <div><strong>{{$item->caller->name}}</strong>
                                                            gọi {!!call_status($item->call_status) !!}


                                                        </div>
                                                        <div>Ghi chú: {{$item->note}}</div>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                                <form class="col s12">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <textarea id="note" class="materialize-textarea"></textarea>
                                            <label for="note">Ghi chú</label>
                                        </div>
                                    </div>

                                </form>
                                <div class="card-action">
                                    <a class="green-text"
                                       onclick="callSuccess('{{$calling_telecall->student->id}}','{{$calling_telecall->id}}')">Đã
                                        nghe máy</a>
                                    <a class="red-text"
                                       onclick="callFail('{{$calling_telecall->student->id}}','{{$calling_telecall->id}}')">Không
                                        nghe
                                        máy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
        <h4 style="font-weight: lighter">Lịch sử gọi</h4>
        <div class="col s12" id="calling-history" style="padding-top: 20px">


        </div>
        <div id="load-more">
            <button onclick="get_more_history_call()" class="waves-effect waves-light btn">Tải thêm</button>
        </div>
        <div class="progress" style="display: none" id="preloader-load-more">
            <div class="indeterminate"></div>
        </div>

        <script>
            var start = 0;
            function get_more_history_call() {
                $('#load-more').hide();
                $('#preloader-load-more').show();
                $.post("{{url('manage/getcallhistory')}}",
                    {
                        '_token': '{{csrf_token()}}',
                        caller_id: '{{Auth::user()->id}}',
                        'start': (start + 1)
                    },
                    function (data, status) {
                        $('#load-more').show();
                        $('#preloader-load-more').hide();
                        $('#calling-history').append(data);
                        $('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
            }
            function get_history_call() {

                $.post("{{url('manage/getcallhistory')}}",
                    {
                        '_token': '{{csrf_token()}}',
                        caller_id: '{{Auth::user()->id}}'
                    },
                    function (data, status) {
                        $('#calling-history').html(data);
                        $('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
            }
            function callSuccess(id, telecallid) {
                var note = $('#note').val();
                console.log(note);
                $('#preloader').show();
                $.post("{{url('manage/ajaxchangecallstatus')}}",
                    {
                        id: id,
                        status: 1,
                        _token: '{{csrf_token()}}',
                        caller_id: '{{Auth::user()->id}}',
                        note: note,
                        telecall_id: telecallid
                    },
                    function (data, status) {
                        console.log(data);
                        var call_data = JSON.parse(data);
                        $("#called").html(call_data['total_called']);
                        $("#uncalled").html(call_data['total_uncalled']);
                        $('#preloader').hide();
                        $('#calling-area').html(" ");
                        $('#fetch-student').show();
                        start = 0;
                        get_history_call();
                        $('#tele-search-wrapper').show();
                    });
            }
            function callFail(id, telecallid) {
                var note = $('#note').val();
                console.log(note);
                $('#preloader').show();
                $.post("{{url('manage/ajaxchangecallstatus')}}",
                    {
                        id: id,
                        status: 0,
                        '_token': '{{csrf_token()}}',
                        caller_id: '{{Auth::user()->id}}',
                        note: note,
                        telecall_id: telecallid
                    },
                    function (data, status) {
                        console.log(data);
                        var call_data = JSON.parse(data);
                        $("#called").html(call_data['total_called']);
                        $("#uncalled").html(call_data['total_uncalled']);
                        $('#preloader').hide();
                        $('#calling-area').html(" ");
                        $('#fetch-student').show();
                        start = 0;
                        get_history_call();
                        $('#tele-search-wrapper').show();
                    });
            }
            function call(id) {
                $('#preloader').show();
                $('#fetch-student').hide();
                $('#tele-search-wrapper').hide();
                $('#search-result-tbody').html("");
                $.get("{{url('manage/getstudentforcall?id=')}}" + id, function (data, status) {
                    $('#preloader').hide();
                    $('#calling-area').html(data);
                    $('#fetch-student').hide();
                    $('.collapsible').collapsible({
                        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    });
                });
            }
            function get_searched_student(url) {
                $.get(url, function (data) {
                    $('#search-result-tbody').html("");
                    var students = data.students;
                    console.log(students[0].registers);
                    if (students.length == 0) {
                        $('#seach-error').html("Không có kết quả phù hợp");
                    } else {
                        for (var i = 0; i < students.length; i++) {


                            $('#search-result-tbody').append(
                                "<tr></tr>" +
                                "<td>" + students[i].name + "</td>" +
                                "<td>" + students[i].email + "</td>" +
                                "<td>" + students[i].phone + "</td>" +
                                "<td>" + classesToString(students[i].registers) + "</td>" +
                                "<td><button class='red btn' onclick='call(" + students[i].id + ")'>Gọi</button></td>" +
                                "<tr></tr>"
                            );
                            $('#seach-error').html("");
                        }
                    }
                });
            }

            function classesToString(classes) {
                var str = "";
                for (var i = 0; i < classes.length; i++) {
                    str += classes[i].class_name;
                    if (classes[i].saler_name) {
                        str += " - " + classes[i].saler_name;
                    }
                    if (i != classes.length - 1) {
                        str += "<br/>";
                    }
                }
                return str;
            }

            function searchStudent() {
                $('#table-search-name').html('5 kết quả tìm kiếm gần nhất');
                $('#seach-error').html("Seaching...");
                $('#search-result-tbody').html("");
                var search = $('#telesale-search-student').val();
                if (search && search.length >= 3) {
                    var url = "{{url('api/telesale/search-student?q=')}}" + search;
                    get_searched_student(url);
                } else {
                    $('#seach-error').html("Bạn cần nhập ít nhất 3 kí tự trở lên ");
                }
            }
            $(document).ready(function () {
                var url = "{{url('api/telesale/search-student')}}";
                get_searched_student(url);
                $('#telesale-search-student').keypress(function (e) {
                    if (e.which == 13) {//Enter key pressed
                        $('#telesale-search-btn').click();//Trigger search button click event
                    }
                });

                get_history_call();
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
                $("#fetch-student").click(function () {
                    $('#preloader').show();
                    $('#tele-search-wrapper').hide();
                    $.get("{{url('manage/getstudentforcall')}}", function (data, status) {
                        $('#preloader').hide();
                        $('#calling-area').html(data);
                        $('#fetch-student').hide();
                        $('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
                });
            });
        </script>


@endsection
