@extends('layouts.app')

@section('title','Lịch sử giao dịch')

@section('content')
    <h3 class="header">Lịch sử giao dịch</h3>
    <div class="row">
        <div class="col s12">
            <table class="bordered">
                <thead>
                <tr>
                    <th>Người thực hiện</th>
                    <th>Loại giao dịch</th>
                    <th>Số tiền</th>
                    <th>Ghi chú</th>
                    <th>Thời gian</th>
                    <th>Số tiền lúc thu chi</th>
                </tr>
                </thead>

                <tbody>
                @foreach($transactions as $transaction)
                    @include('manage.money.spend_list_item',$transaction)
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col s12" style="text-align: center" id="load-more-container">
            <a id="btn-spend-list-load-more">Tải thêm <i class="fa fa-caret-down" aria-hidden="true"></i></a>
        </div>
        <div id="loading-text" class="col s12" style="text-align: center;display: none;">
            Đang tải
        </div>
    </div>
    <script>
        var page = 1;
        var isLoading = false;
        function spend_list_load_more() {
            $('#load-more-container').hide();
            $('#loading-text').show();

            var url = '{!!($id)?url('ajax/spendlistloadmore?id='.$id.'&page='):url('ajax/spendlistloadmore?page=')!!}' + page;
            if (!isLoading) {
                isLoading = true;
                $.get(url, function (data) {
                    $('tbody').append(data);
                    isLoading = false;
                    page += 1;
                    $('#load-more-container').show();
                    $('#loading-text').hide();
                });
            }
        }
        $(document).ready(function () {
            $('#btn-spend-list-load-more').click(spend_list_load_more);
        });
    </script>
@endsection