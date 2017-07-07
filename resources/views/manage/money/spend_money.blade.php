@extends('layouts.app')

@section('title','Giao dịch')

@section('content')
    <h3 class="header">Giao dịch</h3>
    <div class="row">
        <div class="col s12">
            <p>Số tiền đang có: <strong>{{currency_vnd_format($money)}}</strong></p>
        </div>
    </div>
    <form class="row" id="form-spend-money" METHOD="post" action="{{url('manage/storetransaction')}}">
        {{csrf_field()}}
        <div class="col s6">
            <select name="type" required>
                <option value="" disabled selected>Chọn loại giao dịch</option>
                <option value="1">Thu</option>
                <option value="2">Chi</option>
            </select>
        </div>
        <div class="col s6">
            <input type="number" placeholder="Số tiền" name="money" required/>
        </div>
        <div class="col s12">
            <input type="text" placeholder="Ghi chú" name="note"/>
        </div>
    </form>
    <div class="row">
        <div class="col s12">
            <button value="submit" id="btn-spend-money-submit" onclick="submitMoney()"
                    class="waves-effect waves-light btn blue">Save
            </button>
        </div>
    </div>
    @if(\Illuminate\Support\Facades\Session::has('message'))

        <div class="row">
            <div class="col s12">
                <div class="card-panel">
                    <span class="white-text">{!!  \Illuminate\Support\Facades\Session::get('message')!!}</span>
                </div>
            </div>
        </div>
    @endif
    <div class="row">
        <div class="col s12">
            <table class="bordered">
                <thead>
                <tr>
                    <th>Số tiền</th>
                    <th>Loại giao dịch</th>
                    <th>Thời gian</th>
                    <th>Ghi chú</th>
                </tr>
                </thead>
                
                <tbody>
                @foreach($spends as $spend)
                    <tr>
                        <td>{{currency_vnd_format($spend->money)}}</td>
                        <td>{!!transaction_type($spend->type)!!}</td>
                        <td>{{format_date_full_option($spend->created_at)}}</td>
                        <td>{{$spend->note}}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <script>
        function submitMoney() {
            $('#btn-spend-money-submit').prop('disabled', true);
            $('#form-spend-money').submit();
        }
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection