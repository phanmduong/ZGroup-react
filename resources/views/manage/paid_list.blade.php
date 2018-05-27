@extends('layouts.app')

@section('title','Danh sách học viên đã nộp tiền')

@section('content')
    <h3 class="header">
        Danh sách học viên đã nộp tiền
    </h3>
    <div class="row">
        <form method="get">
            <div class="input-field col s12 m6">
                <input id="search" name="search" placeholder="Điền email, số điện thoại, hoặc tên lớp (VD: PS 9.2)"
                       type="text" value="{{ isset($search) ? $search : "" }}">
                <label for="search" class="active">Tìm kiếm</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="waves-effect waves-light btn waves-input-wrapper">
                    <input id="submit" type="submit" value="Tìm kiếm">
                </i>
            </div>
        </form>
    </div>
    <div class="row">
        <table class="striped responsive-table">
            <thead>
            <tr>
                <th>Học viên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Lớp</th>
                <th>Số tiền</th>
                <th>Mã học viên</th>
                <th>Coupon</th>
                <th>Thời gian nộp</th>
                <th>Người thu</th>
                <th>Ghi chú</th>
            </tr>
            </thead>

            <tbody>

            @if ($loop > 0)
                @for($j = 0; $j < $loop; $j++)
                    <tr>
                        <td>{{$student_list[$j]->username}}</td>
                        <td>{{$student_list[$j]->phone}}</td>
                        <td>{{$student_list[$j]->email}}</td>
                        <td>{{$student_list[$j]->classname}}</td>
                        <td>{{currency_vnd_format($student_list[$j]->money)}}</td>
                        <td>{{$student_list[$j]->code}}</td>
                        <td>{{$student_list[$j]->coupon}}</td>
                        <td>
                            @if(property_exists($student_list[$j], "paid_time"))
                                {{$student_list[$j]->paid_time}}
                            @else
                                <span>Chưa nộp</span>
                            @endif
                        </td>
                        <td>{{App\User::find($student_list[$j]->staff_id) ? App\User::find($student_list[$j]->staff_id)->name :""}}</td>
                        <td>{{$student_list[$j]->note}}</td>
                    </tr>
                @endfor
            @endif

            {{--@foreach($student_list as $student)--}}
            {{--@if (!isset ($search))--}}
            {{--<tr>--}}
            {{--<td>{{$student->name}}</td>--}}
            {{--<td>{{$student->email}}</td>--}}
            {{--<td>{{$student->phone}}</td>--}}
            {{--<td>{{$student->money}}</td>--}}
            {{--<td>{{format_date_full_option($student->updated_at)}}</td>--}}
            {{--</tr>--}}
            {{--@elseif(strpos($student->user->email, $search) !== false || strpos($student->user->name, $search) !== false || strpos($student->user->phone, $search) !== false)--}}
            {{--<tr>--}}
            {{--<td>{{$student->user->name}}</td>--}}
            {{--<td>{{$student->user->email}}</td>--}}
            {{--<td>{{$student->user->phone}}</td>--}}
            {{--<td>{{$student->money}}</td>--}}
            {{--<td>{{format_date_full_option($student->updated_at)}}</td>--}}
            {{--</tr>--}}
            {{--@endif--}}
            {{--@endforeach--}}
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/paidlist/'.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/paidlist/'.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect" href="{{url('manage/paidlist/'.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
@endsection
