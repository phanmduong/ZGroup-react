@foreach($products as $product)
  @include('components.newsfeed_item',['product' => $product])
    {{-- <li class="grid-item-landing" id="grid-item-{{$product->id}}">
        <div>
            <div class="card">
                            @if(is_mobile())
                                <a href="{{url('bai-tap-colorme?id='.$product->id)}}">
                            @else
                                <a onclick="showFullImageModal('{{$product->id}}','{{$product->type}}')">
                            @endif
                                <div style="cursor: pointer;position:relative" class="card-image">
                                    @if($product->type == 0)
                                        <img id="image{{$product->id}}" full='{{$product->url}}'
                                             src="{{$product->thumb_url}}">

                                    @elseif($product->type == 1)
                                        <video full="{{$product->url}}" class="responsive-video"
                                               onloadedmetadata="initGallery()"
                                               id="video-tag{{$product->id}}"
                                               controls preload='metadata'>
                                            <source src="{{$product->url}}" type="video/mp4">
                                        </video>
                                    @elseif($product->type == 2)

                                        <img id="image{{$product->id}}" full='{{$product->url}}'
                                             src="{{$product->thumb_url}}">
                                        @if ($product->description != null)
                                            <div class="newsfeed-item-blog-title">{{$product->description}}</div>
                                        @endif
                                    @endif
                                </div>
                            </a>
                            <div class="card-content" style="padding: 10px;border-top:1px solid #d9d9d9">
                                @if(isset($user))
                                    <p>
                                        <a id="btn-like-{{$product->id}}"
                                           class="hvr-bounce-in btn-like {{(isset($user) && $user->likes()->where('product_id',$product->id)->count()>0)?'liked':''}}"
                                           onclick="toggle_like('{{$product->id}}')"><i
                                                    class="fa fa-heart"></i></a> <span
                                                id="total_likes{{$product->id}}">{{$product->likes()->count()}}</span>
                                        <a style="color: #888;margin-left:7px"><i
                                                    class="fa fa-comment"></i></a>
                                        <span id="total_comments{{$product->id}}">{{$product->comments()->count()}}</span>

                                        <a style="color: #888;margin-left:7px"><i
                                                    class="fa fa-eye"></i></a>
                                        <span id="total_views{{$product->id}}">{{$product->views}}</span>
                                        @if($product->type == 2)
                                            <a class="secondary-content category-chip"
                                               href="">{{$product->category->name}}</a>
                                        @endif
                                    </p>
                                @else
                                    <p>
                                        <a style="color: lightgray;"><i
                                                    class="fa fa-heart"></i></a>
                                        <span id="total_likes{{$product->id}}">{{$product->likes()->count()}}</span>

                                        <a style="color: #888;margin-left:7px"><i
                                                    class="fa fa-comment"></i></a>
                                        <span id="total_comments{{$product->id}}">{{$product->comments()->count()}}</span>

                                        <a style="color: #888;margin-left:7px"><i
                                                    class="fa fa-eye"></i></a>
                                        <span id="total_views{{$product->id}}">{{$product->views}}</span>
                                    </p>

                                @endif

                            </div>
                            <div style="padding:10px 10px 5px 10px;border-top:1px solid #d9d9d9;overflow: hidden"
                                 class="black-text">
                                <div style="float:left;height:50px;width: 42px;padding-top:2px">
                                    <img class="circle"
                                         src="{{($product->author->avatar_url != null)?$product->author->avatar_url:url('img/user.png')}}"
                                         width="37" height="37">
                                </div>
                                <div style="float:left;height: 40px;font-size:14px">
                                    <a class="username" target="_blank"
                                       href="{{url('profile/'.get_first_part_of_email($product->author->email))}}"
                                       style="display: block">{{$product->author->name}}</a>
                                    <a class="newsfeed-item-time"
                                       href="{{url('bai-tap-colorme?id='.$product->id)}}"
                                       style="display: block">{{time_elapsed_string(strtotime($product->created_at))}}</a>
                                </div>
                            </div>
            </div>
        </div>
    </li> --}}
@endforeach
