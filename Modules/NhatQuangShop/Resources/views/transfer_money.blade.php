@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        <form action="/manage/transfermoney" method="post" enctype="multipart/form-data">
            @if(count($errors) > 0)
                @include("errors.validate")
                <script>
                    $(document).ready(function () {
                        $('.collapse').collapse();
                        var bankId = $("#bank-account").val();
                        $("#bank" + bankId).css("display", "block");
                    });
                </script>
            @endif

            @if (session('message'))
                <div class="alert alert-success">
                    {{ session('message') }}
                </div>
            @endif

            <h4><span style="font-weight:bold">Báo chuyển khoản</span></h4>
            <br>
            <div class="media-body collapse" style="margin-bottom: 100px" id="form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input value="{{old("transfer_day")}}" type="date"
                                   class="form-control border-input"
                                   placeholder="Ngày chuyển"
                                   name="transfer_day">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <select class="form-control"
                                    id="bank-account"
                                    data-style="btn btn-default" name="bank_account_id"
                                    style="display: block !important;">
                                <option disabled selected>Số tài khoản</option>
                                @foreach ($bankaccounts as $bankaccount)
                                    <option {{$bankaccount->id == old("bank_account_id")?"selected":""}}
                                            value="{{$bankaccount->id}}">{{$bankaccount->bank_account_name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        @foreach($bankaccounts as $account)
                            <div id="bank{{$account->id}}"
                                 style="display: none">
                                <div class="form-group">
                                    <div>Số tài khoản: <strong>{{$account->account_number}}</strong></div>
                                    <div>Tên chủ tài khoản: <strong>{{$account->owner_name}}</strong></div>
                                    <div>Ngân hàng: <strong>{{$account->bank_name}}</strong></div>
                                    <div>Chi nhánh: <strong>{{$account->branch}}</strong></div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <select class="form-control"
                                    id="transfer-purpose"
                                    data-style="btn btn-default" name="transfer_purpose"
                                    style="display: block !important;">
                                <option disabled selected>Mục đích chuyển khoản</option>
                                <option value="deposit" {{"deposit" === old("transfer_purpose") ?"selected":""}}>
                                    Đặt cọc
                                </option>
                                <option value="pay_order" {{"pay_order" === old("transfer_purpose") ?"selected":""}}>
                                    Thanh toán tiền hàng đặt
                                </option>
                                <option value="pay_good" {{"pay_good" === old("transfer_purpose") ?"selected":""}}>
                                    Mua hàng sẵn
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input value="{{old("money")}}" type="number" class="form-control border-input"
                                   placeholder="Số tiền đã chuyển"
                                   name="money">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 upload-btn-wrapper">
                        <button type="button" class="btn btn-google" data-target="#form">Bằng chứng chuyển khoản
                        </button>
                        <input type="file" id="proof" name="image" />
                    </div>
                </div>
                <div style="margin-top: 20px; display: none" class="proof" id = "show_proof" >
                    <img  id="blah" src="#" alt="gửi bằng chứng của bạn" class="img_proof"   />
                    <div class="top_right">
                        <i id = "remove" class="fa fa-times" style="font-size: 2em;"></i>
                    </div>
                </div>
                <textarea style = "margin-top: 20px"class="form-control border-input" placeholder="Nội dung..." name="note"
                          rows="6">{{old("note")}}</textarea>
                <button type="submit" style="margin-top: 20px" class="btn">Gửi thông tin chuyển tiền</button>
            </div>
        </form>
        <button type="button" class="btn btn-twitter" data-toggle="collapse" data-target="#form">Thêm chuyển khoản
        </button>
        <div class="table-responsive" style="margin-top: 20px">
            <table class="table">
                <tr>
                    <th>Ngày chuyển</th>
                    <th>Mục đích</th>
                    <th>Số tiền(VNĐ)</th>
                    <th>Ngân hàng</th>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                    <th>Bằng chứng</th>
                </tr>
                <tbody>
                @foreach($transfers as $transfer)
                    <tr>

                        <td>{{format_date($transfer->transfer_day)}}</td>
                        <td class="text-center">
                            <div class="label"
                                 style="font-weight: bold;text-align: center;background-color: {{\App\TransferMoney::$PURPOSE_COLOR[$transfer->purpose]}}">
                                {{\App\TransferMoney::$PURPOSE[$transfer->purpose]}}
                            </div>

                        </td>
                        <td style="font-weight: bold">
                            {{currency_vnd_format($transfer->money)}}
                        </td>
                        <td>
                            <div>
                                {{$transfer->bankAccount->account_number}}
                            </div>
                            <div>
                                {{$transfer->bankAccount->owner_name}}
                            </div>
                            <div>
                                {{$transfer->bankAccount->bank_name}}
                            </div>
                        </td>
                        <td class="text-right">{{$transfer->note}}</td>
                        <td style="min-width: 120px;">
                            <div class="label"
                                 style="background-color: {{$transfer->status()["color"]}}">
                                {{$transfer->status()["text"]}}
                            </div>
                        </td>
                       <td class="text-center">
                           @if($transfer->img_proof)
                               <a download="custom-filename.jpg" href="{{$transfer->img_proof}}" title="ImageName">
                                   <img src="{{$transfer->img_proof}}" class="img-responsive" style="width : 30px; height:30px" />

                               </a>
                             @else
                               <text>Chưa có ảnh</text>
                               @endif
                       </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        @include('pagination.default', ['paginator' => $transfers])
    </div>
    <script type="text/javascript">
        var oldId = 0;
        $("#bank-account").change(function () {
            var bankId = $(this).val();
            $("#bank" + oldId).css("display", "none");
            $("#bank" + bankId).css("display", "block");
            oldId = bankId;
        })
        // $(document).ready(function() {
        //     if (window.File && window.FileList && window.FileReader) {
        //         $("#files").on("change", function(e) {
        //             var files = e.target.files,
        //                 filesLength = files.length;
        //             for (var i = 0; i < filesLength; i++) {
        //                 var f = files[i]
        //                 var fileReader = new FileReader();
        //                 fileReader.onload = (function(e) {
        //                     var file = e.target;
        //                     $("<span class=\"pip\">" +
        //                         "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
        //                         "<br/><span class=\"remove\">Remove image</span>" +
        //                         "</span>").insertAfter("#files");
        //
        //
        //                 });
        //                 fileReader.readAsDataURL(f);
        //             }
        //         });
        //     } else {
        //         alert("Your browser doesn't support to File API")
        //     }
        // });
        function readURL(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#blah').attr('src', e.target.result);
                    $('#show_proof').css("display", "block");
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#remove").click(function(){
                                    $("#show_proof").css("display", "none");
                                 });
        $("#proof").change(function() {
            readURL(this);
        });

    </script>
@endsection
