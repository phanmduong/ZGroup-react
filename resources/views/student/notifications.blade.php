@extends('layouts.public')

@section('title','Thông báo')

@section('header','Thông báo')

@section('content')
    <div class="container">
        <div class="col s8 push-s2">
            <ul class="collection">
                @foreach($notifications as $notification)
                    @if($notification->type == 1)
                        <li class="collection-item"><a
                                    href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
                            đã bình luận về <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài
                                viết</a> của bạn

                            <span style="float:right">{{format_date_full_option($notification->created_at)}}</span>
                        </li>
                    @elseif($notification->type == 0)
                        <li class="collection-item"><a
                                    href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
                            đã thích <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài viết</a> của
                            bạn
                            <span style="float:right">{{format_date_full_option($notification->created_at)}}</span>
                        </li>
                    @elseif($notification->type == 2)
                        <li class="collection-item"><a
                                    href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
                            cũng đã bình luận <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài
                                viết</a> của <a
                                    href="{{url('profile/'.get_first_part_of_email($notification->product->author->email))}}"> {{$notification->product->author->name}}</a>
                            <span style="float:right">{{format_date_full_option($notification->created_at)}}</span>
                        </li>
                    @endif
                @endforeach
            </ul>
        </div>
    </div>
@endsection