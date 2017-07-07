@extends('layouts.public')

@section('title','colorME')

@section('fb-info')
    
    @if($current_product->type == 2)
        <meta property="og:url"
              content="{{url('post/colormevn-'.convert_vi_to_en($current_product->description).'?id='.$current_product->id)}}"/>
        <link rel="canonical"
              href="{{url('post/colormevn-'.convert_vi_to_en($current_product->description).'?id='.$current_product->id)}}"/>
    @else
        <meta property="og:url" content="{{url('bai-tap-colorme?id=').$current_product->id}}"/>
        <link rel="canonical" href="{{url('bai-tap-colorme?id=').$current_product->id}}"/>
    @endif
    
    <meta property="og:type" content="article"/>
    <meta property="og:title"
          content="{{($current_product->description != "")?$current_product->description:"Bài đăng trên colorme.vn"}}"/>
    <meta property="og:description" content="Đăng bởi {{$current_product->author->name}}"/>
    <meta property="og:image" content="{{$current_product->url}}"/>
    <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>
@endsection

@section('content')
    <style>
        
        
        #product-detail-top-btn-container {
            border-bottom: 1px solid #ececec;
            margin-bottom: 0;
        }
        
        @media screen and (min-width: 514px) {
            .grid-item-landing {
                width: 100%;
            }
            
        }
        
        @media screen and (min-width: 1028px) {
            .grid-item-landing {
                width: 50%;
                /*padding-left: 1%;*/
            }
            
        }
        
        @media screen and (min-width: 1540px) {
            .grid-item-landing {
                width: 33%;
                /*padding-left: 1%;*/
            }
            
        }
    
    </style>
    <div class="container" style="margin-top: 10px">
        <!--Your modal content goes here-->
        <div class="row">
            <div class="col s12 m8 " style="margin-top:10px;">
                <div style="background: white" class="row ">
                    <div class="col s12 z-depth-1">
                        <div class="row" id="product-detail-top-btn-container">
                            <div class="col s12" style="padding: 10px 20px 10px;">
                                @if(isset($user))
                                    <a id="btn-product-detail-like"
                                       class="hvr-bounce-in btn-like {{(isset($user) && $user->likes()->where('product_id',$current_product->id)->count()>0)?'liked':''}}"
                                       onclick="product_detail_toggle_like('{{$current_product->id}}')"><i
                                                class="fa fa-heart"></i></a>
                                @else
                                    <a style="color: #bebebe;"><i
                                                class="fa fa-heart"></i></a>
                                @endif
                                <span class="btn-liked-user-trigger" onclick="get_liked_users({{$current_product->id}})"
                                      id="product-detail-total-like">{{$current_product->likes()->count()}}</span>
                                
                                <a class="btn-like hvr-bounce-in" onclick="product_detail_move_to_comment()"
                                   style="color: #bebebe;margin-left:7px"><i
                                            class="fa fa-comment "></i></a>
                                <span id="product-detail-total-comment">{{$current_product->comments()->count()}}</span>
                                
                                <a style="color: #bebebe;margin-left:7px"><i
                                            class="fa fa-eye"></i></a>
                                <span id="product-detail-total-view">{{$current_product->views}}</span>
                                <span class="top-modal-btn-container">
                                  @if($current_product->type == 2)
                                        @if(isset($user) && $current_product->author->id == $user->id)
                                            <a id="btn-edit"
                                               href="{{url('student/editblogpost/'.$current_product->id)}}"
                                               class="top-modal-btn"><i class="fa fa-pencil-square-o"
                                                                        aria-hidden="true"></i> Sửa</a>
                                        @endif
                                        <a onClick="window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('post/colormevn-'.convert_vi_to_en($current_product->description).'?id='.$current_product->id)}}','sharer','toolbar=0,status=0,width=580,height=325');"
                                           href="javascript: void(0)"
                                           id="btn-share-fb" class="top-modal-btn"><i class="fa fa-facebook"></i> Chia sẻ</a>
                                    @else
                                        
                                        <a onClick="window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('bai-tap-colorme?id=').$current_product->id}}','sharer','toolbar=0,status=0,width=580,height=325');"
                                           href="javascript: void(0)"
                                           id="btn-share-fb" class="top-modal-btn"><i class="fa fa-facebook"></i> Chia sẻ</a>
                                    @endif

                              </span>
                                @if($current_product->type == 2)
                                    <a class="secondary-content category-chip"
                                       href="{{url('category?cat_id='.$current_product->category->id)}}">{{$current_product->category->name}}</a>
                                @endif
                            </div>
                        </div>
                        
                        
                        @if($current_product->type==0)
                            <div class="row">
                                <div class="col s12">
                                    <img src="{{$current_product->url}}" style="width:100%;"/>
                                </div>
                            </div>
                        
                        @elseif($current_product->type==1)
                            <div class="row">
                                <h4 id="loading-video">Loading...</h4>
                                <div class="col s12">
                                    <video class="responsive-video" onloadedmetadata="loadVideoDone()"
                                           id="full-video" controls
                                           preload="metadata">
                                        <source src="{{$current_product->url}}" type="video/mp4">
                                    </video>
                                </div>
                            </div>
                        @elseif($current_product->type == 3)
                            @if($current_product->description != null)
                                <div class="row">
                                    <div class="col s12">
                                        <div class="blog-post-title">{{$current_product->description}}</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 product-content">
                                        @foreach($current_product->images as $image)
                                            <img src="{{$image->url}}" style="width:100%"/>
                                        @endforeach
                                    </div>
                                </div>
                            @endif
                        @elseif($current_product->type == 2)
                            @if($current_product->description != null)
                                <div class="row">
                                    <div class="col s12">
                                        <div class="blog-post-title">{{$current_product->description}}</div>
                                    </div>
                                </div>
                            @endif
                            {{--<div style="color: #888;font-style: italic">{{time_elapsed_string(strtotime($current_product->created_at))}}</div>--}}
                            <div class="row">
                                <div class="col s12 product-content">
                                    {!!$current_product->content!!}
                                </div>
                            </div>
                        @endif
                        
                        
                        <div class='row'>
                            <div class="col s12">
                                <div style="float:left;height:60px;width: 60px;padding-top:5px">
                                    <img class="circle"
                                         src="{{($current_product->author->avatar_url != null)?$current_product->author->avatar_url:url('img/user.png')}}"
                                         width="50" height="50">
                                </div>
                                <div style="float:left;height: 60px;font-size:14px;padding-top:7px">
                                    <a class="username" target="_blank"
                                       href="{{url('profile/'.get_first_part_of_email($current_product->author->email))}}"
                                       style="display: block">{{$current_product->author->name}}</a>
                                    @if($current_product->type == 2)
                                        <a class="newsfeed-item-time"
                                           href="{{url('post/colormevn-'.convert_vi_to_en($current_product->description).'?id='.$current_product->id)}}"
                                           style="display: block">{{time_elapsed_string(strtotime($current_product->created_at))}}</a>
                                    @else
                                        <a class="newsfeed-item-time"
                                           href="{{url('bai-tap-colorme?id='.$current_product->id)}}"
                                           style="display: block">{{time_elapsed_string(strtotime($current_product->created_at))}}</a>
                                    @endif
                                
                                </div>
                            </div>
                        </div>
                        @if($current_product->type==0)
                            @if($current_product->description != null)
                                <div class="row">
                                    <div class="col s12">
                                        {{$current_product->description}}
                                    </div>
                                </div>
                            @endif
                        @elseif($current_product->type==1)
                            @if($current_product->description != null)
                                <div class="row">
                                    <div class="col s12">
                                        {{$current_product->description}}
                                    </div>
                                </div>
                            @endif
                        @endif
                        
                        @if($current_product->tags != null)
                            <div class="row">
                                
                                <div class="col s12">
                                    @include('components.tag',['current_product' => $current_product])
                                </div>
                            </div>
                        @endif
                        
                        @if($current_product->author->registers()->count() > 0)
                            <div class="row">
                                <div class="col s12">
                                    @foreach($current_product->author->registers as $register)
                                        <div class="chip">
                                            <img src="{{$register->studyClass->course->icon_url}}"
                                                 alt="Contact Person">{{$register->studyClass->name}}</div>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                        
                        
                        <div class="row" style="padding-top:20px;border-top:1px solid #d9d9d9">
                            <div class="col s12" id="product-detail-comment">
                                @include('student.comment_list_new',['product'=>$current_product])
                            </div>
                        </div>
                        
                        <div class="row" style="margin-bottom: 10px">
                            <div class="col s12" id="product-detail-input-container">
                                @if(isset($user))
                                    <input placeholder="Thêm bình luận" productid="{{$current_product->id}}"
                                           class="product-detail-input-comment"
                                           id="product-detail-comment-input" type="text">
                                @else
                                    <div class="center">Bạn phải <a href="{{url('login')}}">đăng nhập</a> mới comment
                                        được
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row z-depth-1" style="background: white">
                    <div class="col s12">
                        <h4 style="color: #c50000">Có thể bạn sẽ thích</h4>
                        <!-- Modal Structure -->
                        <ul class="grid effect-2 " id="grid" style="margin-top: 10px;">
                            @foreach($current_product->author->products()->orderBy('created_at','desc')->get() as $product)
                                @if($product->id != $current_product->id)
                                    @include('components.newsfeed_item', ['products' => $product])
                                @endif
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            
            
            <div class="col s12 m4 ">
                <div class="card z-depth-1" style="background: white">
                    <div class="card-content">
                        Đã có hơn <strong style="font-weight: bold">2000</strong> thành viên đã gia nhập đại gia đình
                        colorME! Giờ đến lượt bạn
                    </div>
                    <div class="card-action">
                        <a href="{{url('classes/'.$course->id)}}" id="register-now-btn"
                           class="btn-large red darken-3 hvr-buzz-out z-depth-1"
                           style="width: 100%; height: 80px;line-height: 80px;font-weight: bold">ĐĂNG KÝ NGAY</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <p>{!!  $course->detail!!}</p>
                    </div>
                
                </div>
            </div>
        </div>
    
    </div>
    
    @include('components.full_image_modal');
    <script>
        function listen_to_comment(product_id) {
            var socket = io('http://colorme.vn:3000/');
//            var socket = io('http://localhost:3000');
            socket.on("colorme-channel:comment", function (data) {
//                console.log(data);
                $('#product-detail-comment').append(data);
            });
        }
        function product_detail_move_to_comment() {
            $('html, body').animate({
                scrollTop: $("#product-detail-comment").offset().top
            }, 1000);
            return false;
        }
        function product_detail_toggle_like(product_id) {
            
            var total_likes = parseInt($('#product-detail-total-like').html());
            $('#btn-product-detail-like').toggleClass('liked');
            if ($('#btn-product-detail-like').hasClass('liked')) {
                $('#product-detail-total-like').html(total_likes + 1);
                
            } else {
                $('#product-detail-total-like').html(total_likes - 1);
                
            }
            
            $.post(
                    '{{url('storelike')}}',
                    {
                        product_id: product_id,
                        _token: '{{csrf_token()}}',
                    }
                    ,
                    function (data, status) {
//                        $('#product-detail-total-likes'+product_id).html(data);
                        var return_data = JSON.parse(data);
                        var total_likes = return_data.total_likes;
                        like_id = return_data.like_id;
                        $('#product-detail-total-like').html(total_likes);
                    }
            )
            ;
        }
        $('#loading-video').show();
        $('#full-video').hide();
        
        function store_email() {
            var url = '{{url('storeemail')}}';
            var email = '';
            $.post(
                    url,
                    {
                        _token: '{{csrf_token()}}',
                        email: email
                    },
                    function (data, status) {
                        
                    }
            )
        }
        
        function loadVideoDone() {
            $('#loading-video').hide();
            $('#full-video').show();
        }
        function enter_to_comment_product_detail() {
            $(".product-detail-input-comment").keyup(function (e) {
                if (e.keyCode == 13) {
                    var productid = $(this).attr('productid');
                    add_comment_product_detail(productid);
                }
            });
        }
        function add_comment_product_detail(product_id) {
            
            var comment_content = $('#product-detail-comment-input').val();
            $('#product-detail-input-container').html('<div class="progress"> <div class="indeterminate"></div> </div>');
            $.post(
                    '{{url('storecomment')}}',
                    {
                        product_id: product_id,
                        'comment_content': comment_content,
                        _token: '{{csrf_token()}}'
                    }
                    ,
                    function (data, status) {
                        var total_comments = parseInt($('#product-detail-total-comment').html()) + 1;
                        $('#product-detail-total-comment').html(total_comments);
                        $('#total_comments' + product_id).html(total_comments);
                        $('#product-detail-comment-input').val('');
                        {{--$('#product-detail-comment').append(--}}
                                {{--'<div class="col s12">' +--}}
                                {{--'<div class="row">' +--}}

                                {{--'<div style="float:left;width: 60px;height: 55px">' +--}}
                                {{--'<a class="username" href="{{url('profile/'.get_first_part_of_email((isset($user))?$user->email:""))}}">' +--}}
                                {{--'<img src="{{isset($user)?($user->avatar_url):''}}" class="circle" style="width: 50px;height:50px"/>' +--}}
                                {{--'</a>' +--}}
                                {{--'</div>' +--}}

                                {{--'<div style="padding-left:58px">' +--}}
                                {{--'<div style="color: #9b9b9b;">' +--}}

                                {{--'<a class="username"href="{{url('profile/'.get_first_part_of_email((isset($user))?$user->email:""))}}">{{(isset($user))?$user->name:""}}</a>' +--}}
                                {{--'<span>  ' +--}}
                                {{--' - Vừa xong' +--}}
                                {{--'</span>' +--}}
                                {{--'</div>' +--}}

                                {{--'<div>' +--}}
                                {{--comment_content +--}}
                                {{--'</div>' +--}}
                                {{--'</div>' +--}}
                                {{--'</div>' +--}}
                                {{--'</div>'--}}
                        {{--);--}}
                        $('#product-detail-input-container').html('<input placeholder="Thêm bình luận" productid="' + product_id + '" class="product-detail-input-comment" id="product-detail-comment-input" type="text">');
                        enter_to_comment_product_detail();
                    }
            )
            ;
            return false;
        }
        
        $(document).ready(function () {
            listen_to_comment({{$current_product->id}});
            enter_to_comment_product_detail();
        });
    
    </script>
@endsection
