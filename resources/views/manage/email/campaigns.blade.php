@extends('layouts.app')

@section('title','Chiến dịch')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">Chiến dịch</h3>
        </div>
        <div class="col s12">
            <a class="waves-effect waves-light btn" href="{{url('manage/campaign/new')}}">Tạo chiến dịch</a>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <table>
                <thead>
                <tr>
                    <th>Status</th>
                    <th style="width: 170px">Name</th>
                    {{--<th style="width: 170px">Danh sách</th>--}}
                    <th>Sended/Total</th>
                    <th>Delivery/Sended</th>
                    <th>Open/Delivery</th>
                    <th>Người tạo</th>
                </tr>
                </thead>

                <tbody>
                @foreach($campaigns as $campaign)
                    <tr>
                        <td>
                            @if($campaign->sended == 0)
                                <p class="green-text">Chưa gửi</p>
                            @else
                                <p style="color: #888;">Đã gửi</p>
                            @endif
                        </td>
                        <td><a href="{{url('manage/campaign?id='.$campaign->id)}}">{{$campaign->name}}</a></td>
                        {{--<td>--}}
                        {{--@if($campaign->list_id != 0)--}}
                        {{--<a href="{{url('manage/subscribers?list_id='.$campaign->subscribers_list->id)}}">{{$campaign->subscribers_list->name}}</a>--}}
                        {{--@else--}}
                        {{--Chưa chọn--}}
                        {{--@endif--}}
                        {{--</td>--}}
                        <td>
                            @if($campaign->subscribers_lists->count() !=0 )
                                {{$campaign->mail_sended}}/{{$campaign->total}} ({{$campaign->mail_sended_total*100}}%)
                                <div class="progress">
                                    <div class="determinate" style="width: {{$campaign->mail_sended_total*100}}%"></div>
                                </div>
                            @else
                                Chưa chọn danh sách
                            @endif

                        </td>
                        <td>
                            {{$campaign->delivery}}/{{$campaign->mail_sended}} ({{$campaign->delivery_sended*100}}%)
                            <div class="progress">
                                <div class="determinate" style="width: {{$campaign->delivery_sended*100}}%"></div>
                            </div>
                        </td>
                        <td>
                            {{$campaign->open}}/{{$campaign->delivery}} ({{$campaign->open_delivery * 100}}%)
                            <div class="progress">
                                <div class="determinate" style="width: {{$campaign->open_delivery * 100}}%"></div>
                            </div>
                        </td>

                        <td>{{$campaign->owner->name}}</td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <ul class="pagination">
            @if($currentPage != 1)
                <li><a class="waves-effect"
                       href="{{url('manage/campaigns?page='.($currentPage-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$lastPage;$i++)
                @if($currentPage == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect"
                           href="{{url('manage/campaigns?page='.$i)}}">{{$i}}</a>
                    </li>
                @endif
            @endfor
            @if($currentPage != $lastPage)
                <li><a class="waves-effect"
                       href="{{url('manage/campaigns?page='.($currentPage+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
@endsection
