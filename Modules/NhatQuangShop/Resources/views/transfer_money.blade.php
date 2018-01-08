@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        <form action="/manage/transfermoney" method="post">
            @if(count($errors) > 0)
                @include("errors.validate")
            @endif
            <h4><span style="font-weight:bold">Báo chuyển khoản</span></h4>
            <br>
            <div class="media-body collapse" style="margin-bottom: 100px" id="form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="date" class="form-control border-input" placeholder="Ngày chuyển"
                                   name="transfer_day">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <select class="form-control" data-style="btn btn-default" name="account_transfer"
                                    style="display: block !important;" onchange="report(this.value)">
                                <option disabled="" selected="">Số tài khoản</option>
                                @foreach ($bankaccounts as $bankaccount)
                                    <option value="{{$bankaccount->bank_name}}">Ngân hàng : {{$bankaccount->bank_name}},
                                        Chủ tài khoản : {{$bankaccount->bank_account_name}}</option>
                                @endforeach
                            </select></div>
                        <div id="bank"></div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control border-input" placeholder="Số tiền đã chuyển"
                           name="money_transfer">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control border-input" placeholder="Số hóa đơn">
                </div>
                <textarea class="form-control border-input" placeholder="Nội dung..." name="note"
                          rows="6"></textarea>
                <button type="submit" style="margin-top: 20px" class="btn">Gửi thông tin chuyển tiền</button>
            </div>
        </form>
        <button type="button" class="btn btn-twitter" data-toggle="collapse" data-target="#form">Thêm chuyển khoản</button>
        <div class="table-responsive" style="margin-top: 20px">
            <table class="table">
                <tr>
                    <th class="text-left">Ngày chuyển</th>
                    <th class="text-right">Số tiền(VNĐ)</th>
                    <th class="text-right">Ngân hàng</th>
                    <th class="text-right">Nội dung</th>
                    <th class="text-right">Trạng thái</th>
                </tr>
                <tbody>
                @foreach($transfers as $transfer)
                    <tr>
                        <td class="text-left">{{$transfer->transfer_day}}</td>
                        <td class="text-right">{{$transfer->money_transfer}}</td>
                        <td class="text-right">{{$transfer->account_transfer}}</td>
                        <td class="text-right">{{$transfer->note}}</td>
                        <td class="text-right">Wait</td>
                    </tr>
                @endforeach
                </tbody>

            </table>
        </div>
    </div>
@endsection
