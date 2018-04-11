@extends('layouts.app')

@section('title','Danh sách nhập hàng')

@section('content')
    <h3 class="header">
        Danh sách nhập hàng
    </h3>
    <div class="row">
        <a class="btn" href="{{url('manage/import-goods')}}">Nhập hàng</a>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Kho hàng</th>
                <th>Số lượng</th>
                <th>Ghi chú</th>
                <th>Người nhập</th>
                <th>Thời gian nhập</th>
            </tr>
            </thead>

            <tbody>
            @foreach($imported_goods as $imported_good)
                <tr>
                    <td>{{$imported_good->good->name}}</td>
                    <td>{{$imported_good->warehouse->name}}</td>
                    <td>{{$imported_good->quantity}}</td>
                    <td>{{$imported_good->note}}</td>
                    <td>{{$imported_good->staff->name}}</td>
                    <td>{{$imported_good->created_at}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/order-list?page='.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$last_page;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/order-list?page='.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $last_page)
                <li><a class="waves-effect" href="{{url('manage/order-list?page='.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
@endsection
