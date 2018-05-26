@if ( ($courses->count() + $members->count() + $products->count()) == 0 )
  <div class="autocomplete-item">
    <img src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/icons/search_icon.png" class="circle">
    <div style="float:right;width:285px">
      <div style="color:black;font-weight:bold" class="search-item-text">Không tìm thấy kết quả nào</div>
    </div>
  </div>
@else
  @foreach($courses as $course)
    <a href="{{url('classes/'.$course->id)}}">
      <div class="autocomplete-item">
        <img src="{{$course->icon_url}}" class="circle">
        <div style="float:right;width:285px">
          <div style="color:black;font-weight:bold" class="search-item-text">{{$course->name}}</div>
          <div style="color:#888;" class="search-item-text">Môn học</div>
        </div>
      </div>
    </a>
  @endforeach

  <div style="background-color:#d9d9d9;width:100%;height:1px">
  </div>

  @foreach($members as $member)
    <a href="{{url('profile/'.get_first_part_of_email($member->email))}}">
      <div class="autocomplete-item">
        <img src="{{!empty($member->avatar_url)?$member->avatar_url:url('img/user.png')}}" class="circle">
        <div style="float:right;width:285px">
          <div style="color:black;font-weight:bold" class="search-item-text">{{$member->name}}</div>
          <div style="color:#888;" class="search-item-text">Thành viên</div>
        </div>
      </div>
    </a>
  @endforeach

  <div style="background-color:#d9d9d9;width:100%;height:1px">
  </div>

  @foreach($products as $product)
    <a href="{{url('post/colormevn-'.convert_vi_to_en($product->description).'?id='.$product->id)}}">
      <div class="autocomplete-item">
        <img src="{{$product->url}}" class="circle">
        <div style="float:right;width:285px">
          <div style="color:black;font-weight:bold" class="search-item-text">{{$product->description}}</div>
          <div style="color:#888;" class="search-item-text">{{$product->category->name}}</div>
        </div>
      </div>
    </a>
  @endforeach
  <div type="submit" onclick='submitForm()' style="border-top:1px solid #d9d9d9;cursor:pointer" class="autocomplete-item">

      <img src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/icons/search_icon.png" class="circle">
      <div style="float:right;width:285px">
        <div style="color:black;font-weight:bold" class="search-item-text">Xem tất cả kết quả</div>
      </div>

  </div>
  <script>
  function submitForm(){
    $("form#search-form").submit();
  }
  </script>
@endif
