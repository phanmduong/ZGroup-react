@extends('layouts.public')

@section('title',isset($target_user)?$target_user->name:'Người dùng không tồn tại')

@section('header','')

@section('fb-info')
    @if(isset($target_user))
        <link rel="canonical" href="{{url('profile').'/'.get_first_part_of_email($target_user->email)}}"/>
        <meta property="og:url" content="{{url('profile').'/'.get_first_part_of_email($target_user->email)}}"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content="{{$target_user->name}}"/>
        <meta property="og:description" content="Trang cá nhân của {{$target_user->name}} tại colorME"/>
        {{--        <meta property="colormevn:image" content="{{($target_user->avatar_url!=null)?$target_user->avatar_url:url('img/logo.jpg')}}"/>--}}
        <meta property="og:image"
              content="{{($target_user->avatar_url!=null)?$target_user->avatar_url:url('img/user.png')}}"/>
        <meta property="og:image:width" content="600"/>
        <meta property="og:image:height" content="315"/>
        <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>
    @endif

@endsection

@section('content')
    <!-- Modal Rating -->
    <div id="rating-modal" class="modal">
        <div class="modal-content">
            <h4>Đánh giá giảng viên và trợ giảng</h4>
            @if(isset($user) && $user != null && $rating)
                @foreach($user->registers as $register)
                    @if ($register->rated == 2 && $register->staff_id>0)
                        @include("survey.rating",['register'=>$register])
                    @endif
                @endforeach
            @endif
        </div>
    </div>
    
    
    <!-- Modal Upload Avatar -->
    <div class="modal" id="upload-avatar-modal">
        <div class="modal-content">
            <h4>Thay đổi avatar</h4>
            <form id="up-avatar" action="{{url('profile/save_ava/')}}" method="post"
                  enctype="multipart/form-data">
                {{csrf_field()}}
                <div class="file-field input-field">
                    <div class="btn">
                        <span>Tải lên</span>
                        <input name="avatar_url" type="file" multiple>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Tải lên avatar mới của bạn">
                    </div>
                </div>
                <div class="file-field input-field right">
                    <button type="submit" id="avatar-submit-btn" class="btn btn-default" disabled>Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-footer">
        
        </div>
    </div>
    <!-- End of Modal Upload Avatar -->
    <!-- Modal Upload Cover -->
    <div class="modal" id="upload-cover-modal">
        <div class="modal-content">
            <h4>Thay đổi cover</h4>
            <form id="up-cover" action="{{url('profile/save_cover/')}}" method="post"
                  enctype="multipart/form-data">
                {{csrf_field()}}
                <div class="file-field input-field">
                    <div class="btn">
                        <span>Tải lên</span>
                        <input name="cover_url" type="file" multiple>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Tải lên cover mới của bạn">
                    </div>
                </div>
                <div class="file-field input-field right">
                    <button type="submit" id="cover-submit-btn" class="btn btn-default" disabled>Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-footer">
        
        </div>
    </div>
    <!-- End of Modal Upload Cover -->
    <!-- Cover Photo -->
    <div id="profile-cover" class="">
        @if($is_authorized && $user->id == $target_user->id)
            <a id="btn-change-cover" class="hvr-round-corners"
               style="cursor: pointer; color: #c00002;padding:3px; position: absolute; top: 50px; left: 30px; width: 130px; background: white; text-align: center;"
               onclick="openUploadCoverModal()">
                <div style="position: relative;top: -3px;">
                    <i class="material-icons" style="position: relative;top: 7px;">photo_camera</i>
                    Thay ảnh bìa
                </div>
            </a>
        @endif
        <div id="profile-cover-content" class="row">
            <div class="center">
                @if($is_authorized && $user->id == $target_user->id)
                    <a id="btn-change-avatar" class="hvr-bob" style="display: inherit;margin: 0 auto !important;"
                       onclick="openUploadAvatarModal()">
                        <div class="center"
                             style="height: 168px;
                                     background: url('{{empty($target_user->avatar_url)?url('img/user.png'):$target_user->avatar_url}}');
                                     background-repeat: no-repeat;
                                     background-position: center;
                                     background-size: cover;
                                     width: 168px;
                                     border-radius: 2px;
                                     margin: 0 auto !important;
                                     box-shadow: 0 0 10px 5px rgba(0,0,0,0.5);">
                        </div>
                    </a>
                @else
                    <div class="center"
                         style="height: 168px;
                                 background: url('{{empty($target_user->avatar_url)?url('img/user.png'):$target_user->avatar_url}}');
                                 background-repeat: no-repeat;
                                 background-position: center;
                                 background-size: cover;
                                 width: 168px;
                                 border-radius: 2px;
                                 margin: 0 auto !important;
                                 box-shadow: 0 0 10px 5px rgba(0,0,0,0.5);">
                    </div>
                
                @endif
            </div>
            <div id="profile-info" class="" style="color: white; position: relative; top: 10px;">
                <div class="row center" style="margin: 0; padding-bottom: 20px;">
                    <h4 style="margin: 0 auto;text-shadow: 0px 5px 10px #000">{{$target_user->name}}</h4>
                </div>
                <div class="row center">
                    <a id="share-btn"
                       onClick="share_fb()"
                       href="javascript: void(0)"><i
                                class="fa fa-facebook"></i><span style="padding-left:5px;">Chia sẻ</span>
                    </a>
                </div>
            </div>
        
        </div>
    
    </div>
    </div>
    
    <!--Navigation Tab-->
    <div id="tabs-new-wrapper">
        <ul id="tabs-list-new">
            <li id="tab-1" class="tab-btn" style="border-right: 1px solid rgba(0,0,0,0.1)"><span
                        class="tab-text tab-active">Dự án</span></li>
            <li id="tab-2" class="tab-btn" style="border-right: 1px solid rgba(0,0,0,0.1)"><span class="tab-text">Thông tin</span>
            </li>
            <li id="tab-3" class="tab-btn"><span class="tab-text">Kết nối</span></li>
        </ul>
    </div>
    
    <!-- End of Cover Photo -->
    <!-- Contents -->
    <div id="fake-content"></div>
    <div id="waiting-message" class="content container center"></div>
    <div id="tab-1-content" class="content container" style="min-height: 800px">
        @if(isset($target_user))
            <div class="row">
                
                <div id="right-container" class="col s12" style="margin: 0 auto;">
                    
                    <div class="row" style="margin: 0 auto;">
                        {{--Show message if user do not have product--}}
                        @if(count($target_user->products()->orderBy('created_at','desc')->get()) == 0)
                            <h4 style="text-align: center;">Hiện tại chưa có bài đăng nào</h4>
                    @endif
                    <!-- Dropdown Trigger -->
                        
                        
                        <div id="profile-grid" class="product-list" style="width: 100%;">
                            @foreach($target_user->products()->orderBy('created_at','desc')->take(10)->get() as $product)
                                
                                <div class="product-item" id="grid-item-{{$product->id}}">
                                    <div class="card">
                                        @if($product->type == 2)
                                            <a onclick="showFullImageModal('{{$product->id}}','{{$product->type}}','{{url('post/colormevn-'.convert_vi_to_en($product->description).'?id='.$product->id)}}')">
                                                @else
                                                    <a onclick="showFullImageModal('{{$product->id}}','{{$product->type}}','{{url('bai-tap-colorme?id='.$product->id)}}')">
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
                        </div>
                    </div>
                </div>
            </div>
        @endif
        <div class="text-center" style="margin: 50px 0">
            <div id="waiting-message-product"></div>
            <button id="load-more-product-profile" onclick="load_more_product_profile()" class="btn red darken-4">Tải
                thêm
            </button>
        </div>
    </div>
    </div>
    <div id="tab-2-content" class="content center" style="display: none;"></div>
    <div id="tab-3-content" class="content" style="display: none; height: 500px;">
        <h3 class="center">Chức năng này chưa khả dụng</h3>
    </div>
    
    
    @if($survey_user!=null && $survey_user->survey !=null)
        <!-- Modal Structure -->
        <div id="survey-modal" class="modal">
            <div class="modal-content">
                <h4 style="margin-bottom: 10px">{{$survey_user->survey->name}}</h4>
                <form method="post" action="{{url('survey/storesurveyanswer')}}">
                    {{csrf_field()}}
                    <input type="hidden" value="{{$survey_user->survey->id}}" name="survey_id">
                    <input type="hidden" value="{{$survey_user->gen_id}}" name="gen_id">
                    <input type="hidden" value="{{$survey_user->id}}" name="survey_user_id"/>
                    <div id="preview_content"></div>
                    <p>
                        <input type="submit" value="submit" class="btn">
                    </p>
                </form>
            </div>
        </div>
    @endif
    
    @include('components.full_image_modal')
    
    
    {{--<div class="fb-share-button"--}}
    {{--data-href="{{url('profile').'/'.get_first_part_of_email($target_user->email)}}"--}}
    {{--data-layout="button_count"--}}
    {{--style="z-index: 100;"--}}
    {{-->--}}
    {{--</div>--}}
    {{--<script>--}}
    {{--(function (d, s, id) {--}}
    {{--var js, fjs = d.getElementsByTagName(s)[0];--}}
    {{--if (d.getElementById(id)) return;--}}
    {{--js = d.createElement(s);--}}
    {{--js.id = id;--}}
    {{--js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";--}}
    {{--fjs.parentNode.insertBefore(js, fjs);--}}
    {{--}(document, 'script', 'facebook-jssdk'));--}}
    {{--</script>--}}
    <script src="{{url('js/masonry.pkgd.min.js')}}"></script>
    <script src="{{url('js/profile.js')}}"></script>
    <script>
        //Load more product profile
        var limit = 10;
        var offset_product = 10;
        function load_more_product_profile() {
//            alert('load more');
            $('#load-more-product-profile').hide();
            $("#waiting-message-product").html('<h5 style="color:#b7b7b7">Đang tải thêm...</h5>');
            var user_id = {{$target_user->id}};
            var url = '{{url('ajax/load-more-product-profile')}}' + '/' + user_id + '/' + offset_product + '/' + limit;
            
            $.get(url, function (data, status) {
                $('#profile-grid').append(data);
                offset_product += limit;
                console.log('get more ' + status);
                $("#waiting-message-product").empty();
                $('#load-more-product-profile').show();
                detect_end_load_more();
                timeoutInit();
            }).fail(function () {
                $("#waiting-message-product").html('<h3>Có lỗi xảy ra</h3>');
            });
            return true;
        }
        
        function timeoutInit() {
            setTimeout(initGallery, 1200);
        }
        
        var total_product = {{$total_product}};
        
        function detect_end_load_more() {
            var current_product_showed = $('.product-item').length;
            
            console.log(current_product_showed);
            console.log(total_product);
            if (current_product_showed == total_product) {
                $('#load-more-product-profile').hide();
                console.log('end load hide btn');
                $("#waiting-message-product").html('<h5 style="color:#b7b7b7">{{$target_user->name}} có tất cả ' + total_product + ' bài đăng</h5>');
            }
            
            return 'detected';
        }
        
        $(document).ready(detect_end_load_more());
        
        //FB Share control
        function debug_fb() {
            $.post(
                    '{{url('ajax/debug_fb')}}',
                    {
                        url_string: '{{url('profile').'/'.get_first_part_of_email($target_user->email)}}',
                    }
            );
        }
        
        function share_fb() {
            debug_fb();
            window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('profile').'/'.get_first_part_of_email($target_user->email)}}', 'sharer', 'toolbar=0,status=0,width=580,height=325');
        }
        
        //Control tab script
        
        function getTabData(url, targetTabContent) {
//            $("#waiting-message").show(200);
//            $("#waiting-message").html("<h3>Đang tải dữ liệu</h3>");
            $(targetTabContent).html("<h3>Đang tải dữ liệu</h3>");
            $(targetTabContent).show(200);
            $.get(url, function (data, status) {
//                $("#waiting-message").empty(200);
//                $("#waiting-message").hide();
                $(targetTabContent).html(data);
//                $(targetTabContent).show(200);
            }).fail(function () {
                $("#waiting-message").html('<h3>Có lỗi xảy ra</h3>');
            });
        }
        
        $(".tab-btn").click(function () {
            var targetTabContent = "#" + $(this).attr('id') + "-content";
            
            if (!$(this.firstChild).hasClass("tab-active")) {
                $(".content").hide();
                $(".tab-text").removeClass("tab-active");
                $(this.firstChild).addClass("tab-active");
                
                if ($(this).attr('id') === 'tab-1') {
                    {{--                var url = '{{url("student/user-info").'/'.$user->id}}';--}}
                    //                getTabData(url, targetTabContent);
                    $(targetTabContent).show(200);
                }
                
                if ($(this).attr('id') === 'tab-2') {
                    var url = '{{url("student/user-info").'/'}}' + '{{$target_user->id}}';
                    getTabData(url, targetTabContent);
                }
                
                
                if ($(this).attr('id') === 'tab-3') {
                    $("#waiting-message").hide(200);
                    $(targetTabContent).show(200);
                }
            }
            return false;
        });
        
        $(document).ready(function () {
            //Rating and Survey modal
            @if($rating)
                $('#rating-modal').openModal();
            @elseif($survey_user!=null && $survey_user->status == 0)
                $('#survey-modal').openModal(
                    {
                        dismissible: false, // Modal can be dismissed by clicking outside of the modal
                        opacity: .8, // Opacity of modal background
                        in_duration: 300, // Transition in duration
                        out_duration: 200, // Transition out duration
                        ready: function () {
                            $.post(
                                    '{{url('survey/preview')}}',
                                    {
                                        _token: '{{csrf_token()}}',
                                        survey_id: '{{$survey_user->survey->id}}',
                                    },
                                    function (data, status) {
                                        $('#preview_content').html(data);
                                    }
                            );
                        }, // Callback for Modal open
                        complete: function () {
                            $('#preview_content').html('Đang tải');
                        } // Callback for Modal close
                    }
            );
            @endif
        });
        
        //        var masonry;
        //        function initGallery() {
        //            if ($('.grid-item').length) {
        //                masonry = new Masonry( '.grid', {
        //                    // options...
        //                    itemSelector: '.grid-item'
        //                });
        //            }
        //        }
        
        function deleteItem(product_id) {
            if (confirm('Bạn có chắc chắn xoá bài này?')) {
                $('#grid-item-' + product_id).remove();
                masonry.destroy();
                initGallery();
                $.post(
                        '{{url('student/deleteproduct')}}',
                        {
                            _token: '{{csrf_token()}}',
                            'product_id': product_id
                        },
                        function (data, status) {
                            console.log('deleted');
                        }
                );
            }
        }
        //        setInterval(function () {
        //            initGallery();
        //        }, 3000);
        
        $(window).on('load', function () {
            initGallery();
        });
        $(document).ready(function () {
//            share_fb();
//            $('.modal-trigger').leanModal({
//                        dismissible: true, // Modal can be dismissed by clicking outside of the modal
//                        opacity: .5, // Opacity of modal background
//                        in_duration: 300, // Transition in duration
//                        out_duration: 200, // Transition out duration
//                        ready: function () {
//                            alert('Ready');
//                        }, // Callback for Modal open
//                        complete: function () {
//
//                            $('#video-player').stopVideo();
//                        } // Callback for Modal close
//                    }
//            );
//            resize();
            initGallery();
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $('a.register-btn').removeClass('secondary-content');
            } else {
                $('a.register-btn').addClass('secondary-content');
            }
//            var x = $(".top-space").width();
//            $('.items').css({"width": x, "height": x});
        });
        function openUploadAvatarModal() {
            $('#upload-avatar-modal').openModal();
        }
        function openUploadCoverModal() {
            $('#upload-cover-modal').openModal();
        }
        $("input:file").bind("change", function () {
            if ($(this).attr("name") === "avatar_url") {
                $("#avatar-submit-btn").removeAttr("disabled");
            }
            if ($(this).attr("name") === "cover_url") {
                $("#cover-submit-btn").removeAttr("disabled");
            }
        });
    </script>


@endsection
