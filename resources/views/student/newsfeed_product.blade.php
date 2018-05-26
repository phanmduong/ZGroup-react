@foreach($products as $product)

    <div class="row">
        <div class="col s12 m6  push-m3 ">
            <div class="card">
                <div class="card-content" style="padding-bottom: 0">
                    <div class="row valign-wrapper">
                        <div class="col s2 ">
                            <img src="{{($product->author->avatar_url!=null)?$product->author->avatar_url:url('img/user.png')}}"
                                 alt="" class="responsive-img avatar">
                            <!-- notice the "circle" class -->
                        </div>
                        <div class="col s10 ">
                            <h6 class="black-text">
                                <a class="username" target="_blank"
                                   href="{{url('profile/'.get_first_part_of_email($product->author->email))}}">{{$product->author->name}}</a>
                            </h6>
                            <p style="margin-bottom: 3px;color: #7d7d7d;">{{format_date_full_option($product->created_at)}}</p>
                        </div>
                    </div>
                </div>
                <div class="card-image">
                    @if ($product->type == 0)
                        <img src="{{$product->url}}">
                    @else
                        <video class="responsive-video" preload="metadata" controls>
                            <source src="{{$product->url}}" type="video/mp4">
                        </video>

                    @endif
                </div>
                <div class="card-content">
                    <p>
                        <a id="btn-like-{{$product->id}}"
                           class="hvr-bounce-in btn-like {{(isset($user) && $user->likes()->where('product_id',$product->id)->count()>0)?'liked':''}}"
                           onclick="toggle_like('{{$product->id}}')"><i
                                    class="fa fa-heart"></i></a> <span
                                id="total_likes{{$product->id}}">{{$product->likes()->count()}}</span>
                    </p>
                    <p>{{$product->description}}</p>
                    <div style="margin: 3px 0;">
                        @foreach($product->author->registers as $register)
                            <a href="{{url('groups/'.preg_replace( '/\s+/', '',$register->studyClass->name))}}">
                                <div class="chip">
                                    <img src="{{$register->studyClass->course->icon_url}}" alt="Contact Person">
                                    {{$register->studyClass->name}}
                                </div>
                            </a>
                        @endforeach
                    </div>

                    @if($product->tags != null)
                        <p>
                        <div class="chip">
                            {{$product->tags}}
                        </div>
                        </p>
                    @endif

                    <div class="comment-area" productid="{{$product->id}}" id="comment-area-{{$product->id}}">
                        @include('student.comment_list',['product'=> $product])
                    </div>


                </div>
                <div class="card-action" style="padding-bottom: 0;padding-top: 0">
                    <div class="row">

                        <div class="col s12" id="input-container-{{$product->id}}">
                            <input placeholder="Thêm bình luận" productid="{{$product->id}}" class="input-comment"
                                   id="comment-content-{{$product->id}}" type="text">
                        </div>
                        {{--<div class="col s2" style="padding-top: 20px" id="btn-comment-container-{{$product->id}}">--}}
                        {{--<a class="btn-comment" onclick="add_comment({{$product->id}})">Gửi</a>--}}
                        {{--</div>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endforeach
