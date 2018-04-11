@extends('layouts.app')

@section('title','Danh sách chiến dịch')

@section('content')
    <h3 class="header">
        Chiến dịch Marketing
    </h3>
    <div class="row">
        <a href="{{url('manage/create-marketing-campaign')}}" class="btn">Tạo chiến dịch</a>
    </div>
    <div class="row">
        <table class="striped responsive-table">
            <thead>
            <tr>
                <th>Tên</th>
                <th></th>
                <th>Link sale của bạn</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            @foreach($campaigns as $campaign)
                <tr>
                    <td>
                        <a style="background-color: #{{$campaign->color}};display: block;
                                padding: 5px;
                                border-radius: 3px;
                                width: 140px;text-align: center;color: #ffffff;"
                           href="{{url('manage/marketing-campaign-detail/'.$campaign->id)}}">
                            {{$campaign->name}}
                        </a>
                    </td>
                    <td>
                        <canvas id="chart{{$campaign->id}}" style="width: 200px;"></canvas>
                    </td>
                    <td>
                        <div><a href="{{url("courses/".$user_id."/".$campaign->id)}}" target="_blank">Link chung</a>
                        </div>
                        @foreach($courses as $course)
                            <div>
                                <a target="_blank"
                                   href="{{url('classes/'.$course->id."/".$user_id."/".$campaign->id)}}">{{$course->name}}</a>
                            </div>
                        @endforeach
                    </td>
                    <td><a href="{{url("manage/delete-marketing-campaign/".$campaign->id)}}"><i class="material-icons">delete</i></a>
                    </td>

                </tr>
                <script>
                    var pieChartdata{{$campaign->id}} = {!!  $campaign->paid_chart!!};

                    var pieChartContext{{$campaign->id}} = $("#chart{{$campaign->id}}").get(0).getContext("2d");

                    new Chart(pieChartContext{{$campaign->id}})
                        .Pie(pieChartdata{{$campaign->id}}, {
                            animateRotate: false,
                            segmentShowStroke: false
                        });
                </script>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                @if($search)
                    <li>
                        <a class="waves-effect"
                           href="{{url('manage/order-list?search='.$search.'&page='.($current_page-1))}}">
                            <i class="material-icons">chevron_left</i></a>
                    </li>
                @else
                    <li>
                        <a class="waves-effect" href="{{url('manage/order-list?page='.($current_page-1))}}">
                            <i class="material-icons">chevron_left</i></a>
                    </li>
                @endif
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$last_page;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    @if($search)
                        <li>
                            <a class="waves-effect"
                               href="{{url('manage/order-list?search='.$search.'&page='.$i)}}">{{$i}}</a>
                        </li>
                    @else
                        <li><a class="waves-effect" href="{{url('manage/order-list?page='.$i)}}">{{$i}}</a></li>
                    @endif
                @endif
            @endfor
            @if($current_page != $last_page)
                @if($search)
                    <li><a class="waves-effect"
                           href="{{url('manage/order-list?search='.$search.'&page='.($current_page+1))}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/order-list?page='.($current_page+1))}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @endif
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
@endsection
