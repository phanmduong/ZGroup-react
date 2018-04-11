@extends('layouts.app')

@section('title','Tất cả lịch sử gọi')

@section('content')
    <h3 class="header">
        Lịch sử gọi
    </h3>
    <p>Khoá: <strong>{{$gen->name}}</strong></p>
    @if(count($telecalls)==0)
        <div class="row">Học viên này chưa được gọi lần nào</div>
    @else
        <div class="row">
            <table class="striped responsive-table">
                <thead>
                <tr>
                    <th>Người gọi</th>
                    <th>Học viên(email)</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                    <th>Thời gian gọi</th>
                </tr>
                </thead>

                <tbody>
                @foreach($telecalls as $telecall)
                    <tr>
                        <td>{{$telecall->caller->name}}</td>
                        <td>{{$telecall->student->name}}({{$telecall->student->email}})</td>
                        <td>{{$telecall->student->phone}}</td>
                        <td>{!! call_status($telecall->call_status)!!}</td>
                        <td>{{$telecall->note}}</td>
                        <td>{{format_date_full_option($telecall->updated_at)}}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <ul class="pagination">
                @if($current_page != 1)
                    <li><a class="waves-effect"
                           href="{{url('manage/telesalehistory?page='.($current_page-1)."&user_id=".$user_id)}}"><i
                                    class="material-icons">chevron_left</i></a></li>
                @else
                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                @endif
                @for($i=1;$i<=$num_pages;$i++)
                    @if($current_page == $i)
                        <li class="active"><a href="#!">{{$i}}</a></li>
                    @else
                        <li><a class="waves-effect"
                               href="{{url('manage/telesalehistory?page='.$i."&user_id=".$user_id)}}">{{$i}}</a></li>
                    @endif
                @endfor
                @if($current_page != $num_pages)
                    <li><a class="waves-effect"
                           href="{{url('manage/telesalehistory?page='.($current_page+1)."&user_id=".$user_id)}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @else
                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                @endif
            </ul>

        </div>
    @endif
@endsection
