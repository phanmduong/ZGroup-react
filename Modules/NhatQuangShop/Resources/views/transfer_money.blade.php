@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        <h4><span style="font-weight:bold">Báo chuyển khoản</span></h4>
        <br>
        <div class="media-body collapse" style="margin-bottom: 100px" id="form">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="date" class="form-control border-input" placeholder="Ngày chuyển">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                            <select class="selectpicker" data-style="btn btn-default" style="display: block !important;">
                                <option disabled="" selected="">Phương thức thanh toán</option>
                                <option value="1">Chuyển khoản</option>
                                <option value="1">Thanh toán trực tiếp</option>
                                <option value="1">Thanh toán trực tiếp tại shop</option>
                            </select></div>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control border-input" placeholder="Số tiền đã chuyển">
            </div>
            <div class="form-group">
                <input type="text" class="form-control border-input" placeholder="Số hóa đơn">
            </div>
            <textarea class="form-control border-input" placeholder="Nội dung..."
                      rows="6"></textarea>
            <div class="media-footer" style="margin-top: 20px">
                <a href="#paper-kit" class="btn btn-info pull-right">Gửi thông báo chuyển tiền</a>
            </div>


        </div>
        <button type="button" class="btn btn-twitter" data-toggle="collapse" data-target="#form">Thêm cái gì đó</button>
        <div class="table-responsive" style="margin-top: 20px">
            <table class="table">
                <tr>
                    <th class="text-left">Ngày chuyển</th>
                    <th>Số tiền(VNĐ)</th>
                    <th class="text-right">Ngân hàng</th>
                    <th class="text-right">Nội dung</th>
                    <th class="text-right">Trạng thái</th>
                </tr>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>


@endsection
