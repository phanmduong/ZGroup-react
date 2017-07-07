@extends('layouts.public')

@section('title',$search_str." - colorME")

@section('content')
  <style>
    #full-image-btn-row {
      margin-left: 0;
    }
  </style>
  @if( ($courses->count() + $members->count() + $products->count()) == 0 )
    <div class="container">
      <h4>Không tìm thây kết quả tìm kiếm cho "{{$search_str}}"</h4>
    </div>
  @else
  <div class="container">
    <h4>Kết quả tìm kiếm cho "{{$search_str}}"</h4>

    {{-- Tim kiem mon hoc --}}
    <div class="row">
      <div class="col s12">
        <h5>Môn học</h5>
      </div>
      @foreach($courses as $course)
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="{{$course->image_url}}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">{{$course->name}}<i
                class="material-icons right">more_vert</i></span>

                <p><a href="{{url("/classes/".$course->id)}}">Chi tiết</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">{{$course->name}}<i
                  class="material-icons right">close</i></span>
                  <p><i class="tiny material-icons">description</i> {{$course->description}}</p>
                  <p><i class="tiny material-icons">query_builder</i> {{$course->duration}} Buổi</p>
                  <p><i class="tiny material-icons">receipt</i> {{number_format($course->price)}} VND</p>
                  <p><a href="{{url("/classes/".$course->id)}}">Chi tiết</a></p>
                </div>
              </div>
            </div>
          @endforeach
        </div>

        {{-- Tim kiem nguoi --}}
        <div class="row">
          <div class="col s12">
            <h5>Thành viên</h5>
          </div>
          @foreach($members as $member)
            <div class="col s12 m4">
              <div class="card-panel" style="padding:8px 12px 22px 12px">
                <img src="{{!empty($member->avatar_url)?$member->avatar_url:url('img/user.png')}}" style="height:50px;width:50px;margin:4px 10px 4px 0px;float:left" class="circle">
                <div style="padding-top:5px">
                  <a  class="username" href="{{url('profile/'.get_first_part_of_email($member->email))}}">{{$member->name}}</a>
                </div>
                <div>{{$member->products()->count()}} bài viết </div>
              </div>
            </div>

          @endforeach

        </div>

        {{-- Tim kiem bai viet --}}
        <div class="row">
          <div class="col s12">
            <h5>Bài viết</h5>
          </div>
        </div>

        @include('components.products_grid',['products' => $products])

      </div>
  @endif
@endsection
