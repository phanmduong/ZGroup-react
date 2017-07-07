<div class="col s12">
    <div class="row">
        <div style="float:left;width: 60px;height: 55px">
            <a href="{{url('profile/'.get_first_part_of_email($comment->commenter->email))}}">
                <img class="circle" style="width: 50px;height:50px"
                     src="{{($comment->commenter->avatar_url!=null)?$comment->commenter->avatar_url:url('img/user.png')}}"/>
            </a>
        </div>
        <div style="padding-left:58px">
            <div style="color: #9b9b9b;">
                <a class="username"
                   href="{{url('profile/'.get_first_part_of_email($comment->commenter->email))}}
                           ">{{$comment->commenter->name}}
                </a>

                <span> - {{time_elapsed_string(strtotime($comment->created_at))}}</span>
            </div>
            <div>
                {{$comment->content}}
            </div>
        </div>
    </div>
</div>