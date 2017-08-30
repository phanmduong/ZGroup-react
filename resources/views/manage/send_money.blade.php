@extends('layouts.app')

@section('title','Chuyển tiền')

@section('content')
    <h3 class="header">
        Chuyển tiền
    </h3>
    <p>Tổng số tiền đang có: <strong id="current_money">{{currency_vnd_format($current_money)}}</strong></p>
    @if($is_pending)
        <div>
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
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

                <div class="spinner-layer spinner-red">
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

                <div class="spinner-layer spinner-yellow">
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

                <div class="spinner-layer spinner-green">
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
            <h5>Đang chờ xác nhận</h5>
        </div>
    @else

        <div class="row">
            <div class="input-field col s12">
                <input id="search" type="text" class="validate">
                <label for="search">Tên,số điện thoại hoặc Email Người nhận</label>
            </div>

            <div class="col s12">
                <p><strong style="font-size: 120%">Người Nhận</strong></p>
                <p>Họ tên: <span id="name" style="font-weight: bold"> </span></p>
                <p>Email: <span id="email" style="font-weight: bold"> </span></p>
                <p>Số điện thoại: <span id="phone" style="font-weight: bold"></span></p>

            </div>
            <div class="col s12">
                <form method="post" id="form-send-money" action="{{url('manage/storesendmoney')}}">
                    <input type="hidden" name="receiver_id" id="receiver_id"/>
                    {{csrf_field()}}

                </form>
                <div id="form-send">

                </div>
            </div>
        </div>
    @endif
    <div class="row">
        <h3 class="header">Danh sách giao dịch nhận</h3>
        <table>
            <thead>
            <tr>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Khoản tiền</th>
                <th>Thời gian gửi</th>
                <th>Thời gian nhận</th>
                <th>Trạng thái</th>

            </tr>
            </thead>

            <tbody>
            @foreach($receive_transactions as $transaction)
                <tr>
                    <td>{{$transaction->sender ? $transaction->sender->name : "Không có"}}</td>
                    <td>{{$transaction->receiver ? $transaction->receiver->name : "Không có" }}</td>
                    <td>{{currency_vnd_format($transaction->money)}}</td>
                    <td>{{format_date_full_option($transaction->created_at)}}</td>
                    <td>{{format_date_full_option($transaction->updated_at)}}</td>
                    @if($transaction->status != 0)
                        <td>{!!  transaction_status($transaction->status)!!}</td>
                    @else
                        <td id="contain{{$transaction->id}}">
                            <button onclick="confirm_transaction('{{$transaction->id}}',1)"
                                    class="waves-effect waves-light btn blue">Xác nhận
                            </button>
                            <button onclick="confirm_transaction('{{$transaction->id}}',-1)"
                                    class="waves-effect waves-light btn red">Huỷ
                            </button>
                        </td>
                    @endif
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <div class="row">
        <h3 class="header">Danh sách giao dịch gửi đi</h3>
        <table>
            <thead>
            <tr>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Khoản tiền</th>
                <th>Thời gian gửi</th>
                <th>Thời gian nhận</th>
                <th>Trạng thái</th>

            </tr>
            </thead>

            <tbody>
            @foreach($send_transactions as $transaction)
                <tr>
                    <td>{{$transaction->sender->name}}</td>
                    <td>{{$transaction->receiver->name}}</td>
                    <td>{{currency_vnd_format($transaction->money)}}</td>
                    <td>{{format_date_full_option($transaction->created_at)}}</td>
                    <td>{{format_date_full_option($transaction->updated_at)}}</td>
                    <td>{!!  transaction_status($transaction->status)!!}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <script>
        var user_id = {{$user->id}};
        var socket = io('http://colorme.vn:3000/');
        //    var socket = io('http://localhost:3000');
        socket.on("colorme-channel:notification", function (data) {
            console.log(data);
            if (user_id && user_id == data.receiver_id) {
                $('#contain' + data.transaction.id).html(data.transaction.status);
            }
        });

        var is_submitted = false;

        function confirm_transaction(id, status) {
            if (!is_submitted) {
                is_submitted = true;
                $.post("{{url('manage/confirmtransaction')}}",
                    {
                        'id': id,
                        'status': status,
                        '_token': '{{csrf_token()}}'
                    },
                    function (data, status) {
                        console.log("Data: " + data + "\nStatus: " + status);
                        var arr = JSON.parse(data);
                        $('#contain' + id).html(arr['status']);
                        $('#current_money').html(arr['money']);
                        is_submitted = false;
                    });
            }
        }

        function sendMoney() {
//            $('#btn-send-money').click(function () {
            $('#btn-send-money').prop('disabled', true);
            $('#form-send-money').submit();
//            });
        }

        $(function () {

            $("#search").autocomplete({
                minLength: 0,
                source: '{{url('manage/autostaff')}}',
                focus: function (event, ui) {
                    $("#search").val(ui.item.name);
                    return false;
                },
                select: function (event, ui) {
                    $("#name").html(ui.item.name);
                    $("#email").html(ui.item.email);
                    $("#phone").html(ui.item.phone);
                    $("#receiver_id").val(ui.item.id);
                    $('#form-send').html('<button id="btn-send-money" onclick="sendMoney()"  class="btn blue">Chuyển</button>');
                    return false;
                }
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li style='border-bottom: 1px solid black'>")
                    .append("<a><strong style='font-weight: bold'>" + item.name + "</strong><br>" + item.email + "<br>" + item.phone + "</a>")
                    .appendTo(ul);
            };
        });

    </script>
@endsection
