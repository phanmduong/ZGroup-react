@foreach($notifications as $notification)
    @if($notification->type == 1)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            <a href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
            đã bình luận về <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài viết</a> của bạn
            <div>{{format_date_full_option($notification->created_at)}}</div>
        </div>
        
        <div style="clear:both"></div>
    @elseif($notification->type == 0)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            <a href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
            đã thích <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài viết</a> của bạn
            <div>{{format_date_full_option($notification->created_at)}}</div>
        </div>
        
        <div style="clear:both"></div>
    
    @elseif($notification->type == 2)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            <a href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
            cũng đã bình luận <a href="{{url('bai-tap-colorme?id='.$notification->product_id)}}">bài viết</a> của <a
                    href="{{url('profile/'.get_first_part_of_email($notification->product->author->email))}}"> {{$notification->product->author->name}}</a>
            <div>{{format_date_full_option($notification->created_at)}}</div>
        </div>
        
        <div style="clear:both"></div>
    @elseif($notification->type == 4)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            Bạn chuyển tiền
            cho {{$notification->actor->name}} {!!transaction_status($notification->transaction->status)!!}
            <div>{{format_date_full_option($notification->created_at)}}</div>
        </div>
    @elseif($notification->type == 5)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            <a href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
            đã tạo <a
                    href="{{url('group/class/' . \App\Topic::find($notification->product_id)->class_id . '#/topic/' . $notification->product_id)}}">topic</a>
            mới
            <div>{{format_date_full_option($notification->created_at)}}</div>
        </div>
        
        <div style="clear:both"></div>
    @elseif($notification->type == 3)
        <img style="margin-left:10px;margin-top:10px;float:left"
             src="{{($notification->actor->avatar_url==null)?url('img/user.png'):$notification->actor->avatar_url}}"
             width="50" height="50"/>
        <div class="item">
            <a href="{{url('profile/'.get_first_part_of_email($notification->actor->email))}}">{{$notification->actor->name}}</a>
            chuyển cho bạn {{currency_vnd_format($notification->transaction->money)}}
            <div>{{format_date_full_option($notification->created_at)}}</div>
            
            @if($notification->transaction->status == 0)
                <div id="noti-transc-contain-{{$notification->transaction->id}}">
                    <button onclick="confirm_transaction('{{$notification->transaction->id}}',1)"
                            class="waves-effect waves-light btn blue">Xác nhận
                    </button>
                    <button onclick="confirm_transaction('{{$notification->transaction->id}}',-1)"
                            class="waves-effect waves-light btn red">Huỷ
                    </button>
                </div>
            @else
                <div>{!!transaction_status($notification->transaction->status)!!}</div>
            @endif
        </div>
        
        <div style="clear:both"></div>
    @endif
@endforeach
<script type="text/javascript">
    var isConfirmedMoney = false;
    function confirm_transaction(id, status) {
        if (!isConfirmedMoney) {
            isConfirmedMoney = true;
            $.post("{{url('manage/confirmtransaction')}}",
                    {
                        'id': id,
                        'status': status,
                        '_token': '{{csrf_token()}}'
                    },
                    function (data, status) {
                        console.log("Data: " + data + "\nStatus: " + status);
                        var arr = JSON.parse(data);
                        $('#noti-transc-contain-' + id).html(arr['status']);
                        isConfirmedMoney = false;
                    });
        }
    }
</script>