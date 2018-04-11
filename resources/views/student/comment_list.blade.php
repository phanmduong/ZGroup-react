@foreach($product->comments as $comment)
    <p style="margin-bottom: 5px;margin-top: 5px;">
    <span><a class="username"
    href="{{url('profile/'.get_first_part_of_email($comment->commenter->email))}}">{{$comment->commenter->name}}</a>  </span>{{$comment->content}}
    </p>
@endforeach