@extends('layouts.app')

@section('title','Danh sách kho hàng')

@section('content')
    <h3 class="header">
        Danh sách kho hàng
    </h3>
    <div class="row">
        <a class="waves-effect waves-light btn" href="{{url('manage/create-warehouse')}}">Thêm kho hàng</a>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Thời gian tạo</th>
                <th>Tổng số sách</th>
            </tr>
            </thead>

            <tbody>
            @foreach($warehouses as $warehouse)
                <tr>
                    <td>
                        <a href="{{url('manage/warehouse/'.$warehouse->id)}}">{{$warehouse->name}}</a>
                    </td>
                    <td>{{$warehouse->location}}</td>
                    <td>{{$warehouse->created_at}}</td>
                    <td>{{$warehouse->goodWarehouses->reduce(function ($carry, $goodWarehouse) {
                            return $carry + $goodWarehouse->quantity;
                        }, 0)}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/warehouses?page='.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$last_page;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/warehouses?page='.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $last_page)
                <li><a class="waves-effect" href="{{url('manage/warehouses?page='.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
@endsection
