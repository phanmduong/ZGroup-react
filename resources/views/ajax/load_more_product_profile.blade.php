@foreach($target_user->products()->orderBy('created_at','desc')->skip($offset)->take($limit)->get() as $product)

    <div class="product-item" id="grid-item-{{$product->id}}">
        <div class="card">
            @if($product->type == 2)
                <a onclick="showFullImageModal('{{$product->id}}','{{$product->type}}','{{'post/colormevn-'.convert_vi_to_en($product->description).'?id='.$product->id}}')">
                    @else
                        <a onclick="showFullImageModal('{{$product->id}}','{{$product->type}}','{{'bai-tap-colorme?id='.$product->id}}')">
                            @endif

                            <div style="cursor: pointer;" class="card-image">
                                @if($product->type == 0)
                                    <img id="image{{$product->id}}"
                                         full='{{$product->url}}'
                                         src="{{$product->thumb_url}}">

                                @elseif($product->type == 1)
                                    <video full="{{$product->url}}"
                                           class="responsive-video"
                                           onloadedmetadata="initGallery()"
                                           id="video-tag{{$product->id}}"
                                           controls preload='metadata'>
                                        <source src="{{$product->url}}"
                                                type="video/mp4">
                                    </video>
                                @elseif($product->type == 2)

                                    <img id="image{{$product->id}}"
                                         full='{{$product->url}}'
                                         src="{{$product->thumb_url}}">
                                    @if ($product->description != null)
                                        <div class="newsfeed-item-blog-title">{{$product->description}}</div>
                                    @endif
                                @endif
                            </div>
                        </a>

                        <div class="card-content" style="padding: 10px">
                            @if(isset($user))

                                <p>
                                    <a id="btn-like-{{$product->id}}"
                                       class="hvr-bounce-in btn-like {{(isset($user) && $user->likes()->where('product_id',$product->id)->count()>0)?'liked':''}}"
                                       onclick="toggle_like('{{$product->id}}')"><i
                                                class="fa fa-heart"></i></a>
                                                            <span class="btn-liked-user-trigger"
                                                                  onclick="get_liked_users({{$product->id}})"
                                                                  id="total_likes{{$product->id}}">{{$product->likes()->count()}}</span>
                                    @if($target_user->id == $user->id)
                                        <a data-activates='setting-dropdown-{{$product->id}}'
                                           class="dropdown-button btn-profile-delete hvr-bounce-in material-icons">settings
                                        </a>
                                    @endif
                                    <a style="color: #888;margin-left:7px"><i
                                                class="fa fa-comment"></i></a>
                                    <span id="total_comments{{$product->id}}">{{$product->comments()->count()}}</span>
                                    <a style="color: #888;margin-left:7px"><i
                                                class="fa fa-eye"></i></a>
                                    <span id="total_views{{$product->id}}">{{$product->views}}</span>
                                    {{--@if($product->type == 2)--}}
                                    {{--<a class="secondary-content category-chip"--}}
                                    {{--href="{{url('category?cat_id='.$product->category->id)}}">{{$product->category->name}}</a>--}}
                                    {{--@endif--}}
                                </p>
                                <ul id='setting-dropdown-{{$product->id}}'
                                    class='dropdown-content setting-dropdown'>
                                    @if($product->type == 2)
                                        <li>
                                            <a style="color:#888"
                                               href="{{url('student/editblogpost/'.$product->id)}}"><i
                                                        class="material-icons tiny">edit</i>
                                                Sửa</a>
                                        </li>
                                    @endif
                                    <li class="divider"></li>
                                    <li><a style="color:#c50000"
                                           onclick="deleteItem({{$product->id}})"><i
                                                    class="material-icons tiny">delete</i>
                                            Xoá</a>
                                </ul>

                            @else
                                <p>
                                    <a style="color: lightgray;"><i
                                                class="fa fa-heart"></i></a>
                                                            <span class="btn-liked-user-trigger"
                                                                  onclick="get_liked_users({{$product->id}})"
                                                                  id="total_likes{{$product->id}}">{{$product->likes()->count()}}</span>

                                    <a style="color: #888;margin-left:7px"><i
                                                class="fa fa-comment"></i></a>
                                    <span id="total_comments{{$product->id}}">{{$product->comments()->count()}}</span>

                                    <a style="color: #888;margin-left:7px"><i
                                                class="fa fa-eye"></i></a>
                                    <span id="total_views{{$product->id}}">{{$product->views}}</span>
                                    @if($product->type == 2)
                                        <a class="secondary-content category-chip"
                                           href="{{url('category?cat_id='.$product->category->id)}}">{{$product->category->name}}</a>
                                    @endif
                                </p>

                            @endif
                        </div>

        </div>
    </div>
@endforeach