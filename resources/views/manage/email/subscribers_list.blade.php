@extends('layouts.app')

@section('title','Danh sách')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">Danh sách</h3>
        </div>
        <div class="col s12">
            <a class="waves-effect waves-light btn" href="{{url('manage/new_subscribers_list')}}">New</a>
        </div>
    </div>
    @if(count($subscribersLists) == 0)
        <div class="row">
            <div class="col s12 center">
                <h4>Bạn chưa tạo danh sách nào</h4>
            </div>
        </div>
    @else
        <div class="row">
            <div class="col s12">
                <table>
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số người đăng kí</th>
                        <th>Ngày tạo</th>
                        <th>Lần sửa cuối</th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach($subscribersLists as $subscribersList)
                        <tr>
                            <td>
                                <a href="{{url('manage/subscribers?list_id='.$subscribersList->id)}}">{{$subscribersList->name}}</a>
                            </td>
                            <td>{{$subscribersList->subscribers()->count()}}</td>
                            <td>{{format_date_full_option($subscribersList->created_at)}}</td>
                            <td>{{format_date_full_option($subscribersList->updated_at)}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            <ul class="pagination">
                @if($currentPage != 1)
                    <li><a class="waves-effect"
                           href="{{url('manage/subscribers_list?page='.($currentPage-1))}}"><i
                                    class="material-icons">chevron_left</i></a></li>
                @else
                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                @endif
                @for($i=1;$i<=$lastPage;$i++)
                    @if($currentPage == $i)
                        <li class="active"><a href="#!">{{$i}}</a></li>
                    @else
                        <li><a class="waves-effect"
                               href="{{url('manage/subscribers_list?page='.$i)}}">{{$i}}</a>
                        </li>
                    @endif
                @endfor
                @if($currentPage != $lastPage)
                    <li><a class="waves-effect"
                           href="{{url('manage/subscribers_list?page='.($currentPage+1))}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @else
                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                @endif
            </ul>

        </div>
    @endif
@endsection
