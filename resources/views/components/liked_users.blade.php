
@foreach($likes as $like)
  <div style="width:100%;height:58px;padding-left:15px">
    <img src="{{!empty($like->liker->avatar_url)?$like->liker->avatar_url:url('img/user.png')}}" style="height:50px;width:50px;margin:4px 10px 4px 0px;float:left" class="circle">
    <div>
      <a class="username" href="{{url('profile/'.get_first_part_of_email($like->liker->email))}}">{{$like->liker->name}}</a>
    </div>
    <div>{{$like->liker->products()->count()}} bài viết </div>
    {{-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> --}}
  </div>
@endforeach
