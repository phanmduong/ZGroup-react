@extends('layouts.app')

@section('title','Thu tiền học')

@section('content')
    <h3 class="header">
        Thu tiền học
    </h3>
    @if(isset($newest_code))
        <p>Mã học viên mới nhất hiện tại: <strong>{{$newest_code}}</strong></p>
    @endif
    <p></p>
    <div class="row">
        <form class="col s12">
            <div class="input-field">
                <input id="student_email" type="text" class="search">
                <label for="student_email">Email hoặc tên hoặc số điện thoại học viên</label>
            </div>
        </form>
    </div>
    <div class="preloader-wrapper active big" id="loader" style="display: none">
        <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
    <div class="row" id="students-container">


    </div>
    <script>
        function initCollapsible() {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        }
        var is_submitted = false;
        function confirmMoney(registerId, getstatus, isFull, message) {

            function processMoney() {
                if (confirm('Bạn hãy kiểm tra lại thông tin lần nữa!!!') && !is_submitted) {
                    is_submitted = true;
                    var isChecked = $('#received_id_card' + registerId).is(':checked');
//                    console.log(isChecked);
                    $('#loading-text' + registerId).fadeIn();
                    $('#containbutton' + registerId).children('button').hide();
                    $.post("{{url('manage/getmoney')}}",
                        {
                            _token: '{{csrf_token()}}',
                            id: registerId,
                            received_id_card: isChecked ? 1 : 0,
                            money: $('#money' + registerId).val(),
                            code: $('#code' + registerId).val(),
                            'status': getstatus,
                            note: $('#note' + registerId).val()
                        },
                        function (data) {
                            $('#containbutton' + registerId).children('button').show();
                            $('#loading-text' + registerId).fadeOut();
//                        $('#students-container').html(data);
                            var data = JSON.parse(data);
                            console.log(data);
                            if (data['status'] == 1) {
                                alert("Mã học viên này đã tồn tại.");
                            } else {
                                $('#containtime' + registerId).html(data['paid_time']);

                                $('#code' + registerId).prop('disabled', true);
                                if (getstatus == 1) {
                                    $('#money' + registerId).prop('disabled', true);
                                    $('#containbutton' + registerId).html('<strong class="green-text">Đã nộp đủ</strong>');
                                } else {
                                    $('#containbutton' + registerId).append("<strong>Đã lưu</strong>");


                                }
                                $('#loading-text' + registerId).fadeOut();
                            }
                            is_submitted = false;
                        }).fail(function (error) {
                        alert('Không thể lưu, Có lỗi xảy ra');
                        console.log(error.responseText);
                    });

                }

            }

            if (isFull) {
                if (confirm(message)) {
                    processMoney();
                }
            } else {
                processMoney();
            }
        }
        $(function () {

            $(document).ready(function () {
                initCollapsible();
            });
            $('.search').on('input', function (e) {
                // Do action
                var input = $('#student_email').val();
                $('#loader').fadeIn();
                window.stop();
                $.post("{{url('manage/searchstudent')}}",
                    {
                        _token: '{{csrf_token()}}',
                        search: input
                    },
                    function (data, status) {
                        console.log(data);
                        $('#students-container').html(data);
                        initCollapsible();
                        $('#loader').fadeOut();
                    }
                ).fail(function (error) {
                    console.log(error.responseText);
                });

            });
//            $('.search').each(function () {
//                var elem = $(this);
//
//                // Save current value of element
//                elem.data('oldVal', elem.val());
//
//                // Look for changes in the value
//                elem.bind("propertychange change click keyup input paste", function (event) {
//                    // If value has changed...
//                    if (elem.data('oldVal') != elem.val()) {
//                        // Updated stored value
//                        elem.data('oldVal', elem.val());
//
//
//
//                    }
//                });
//            });

        });
    </script>
@endsection
