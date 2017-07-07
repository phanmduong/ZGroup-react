@extends('layouts.app')

@section('title','Danh sách giữ tiền')

@section('content')
    <h3 class="header">
        Danh sách người đang giữ tiền
    </h3>
    <div class="row">
        <table class="responsive-table bordered">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số tiền đang giữ</th>
                <th>Thu</th>
                <th>Chi</th>
                <th>Chuyển tiền</th>
            </tr>
            </thead>

            <tbody>
            @foreach($staffs as $staff)
                <tr>
                    <td><a href="{{url('manage/personalspendlist?id='.$staff->id)}}">{{$staff->name}}</a></td>
                    <td>{{$staff->email}}</td>
                    <td class="green-text">{{currency_vnd_format($staff->money)}}</td>
                    <td>{{$staff->send_transactions()->where('type',1)->count()}}</td>
                    <td>{{$staff->send_transactions()->where('type',2)->count()}}</td>
                    <td>{{$staff->send_transactions()->where('type',0)->count()}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/keepmoney/'.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/keepmoney/'.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect" href="{{url('manage/keepmoney/'.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>

    <script>
        function change_status(id) {
            $.post("{{url('manage/changeclassstatus')}}",
                    {
                        "class_id": id,
                        '_token': '{{csrf_token()}}'
                    },
                    function (data, status) {
                        console.log(status);
                    });
        }
    </script>
@endsection
