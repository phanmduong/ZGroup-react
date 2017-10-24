<style>
    #modal-02 {
        background: rgba(239, 239, 239, 0.96) !important;
    }

    #full-image-btn-row {
        position: fixed;
        top: 0;
        margin: 0 auto;
    }


</style>

<a id="demo02" href="#modal-02" style="display:none">DEMO02</a>

<div id="modal-02">


    <div class="modal-content">
        <!--Your modal content goes here-->
        <div class="row" id="full-image-btn-row" style="display: none">
            <div class="container">
                <div class="row">
                    <div class="col s12 m8 push-m2" style="font-size:18px" id="full-image-btn-col">
                        @if(isset($user))
                            <a id="btn-full-image-like" class="hvr-bounce-in btn-like"
                               onclick="toggle_like()"><i
                                        class="fa fa-heart"></i></a>
                        @else
                            <a style="color: #bebebe;"><i
                                        class="fa fa-heart"></i></a>
                        @endif
                        <span id="full-image-total-like">12</span>

                        <a class="btn-like hvr-bounce-in" onclick="moveToComment()"
                           style="color: #bebebe;margin-left:7px"><i
                                    class="fa fa-comment "></i></a>
                        <span id="full-image-total-comment">112</span>

                        <a style="color: #bebebe;margin-left:7px"><i
                                    class="fa fa-eye"></i></a>
                        <span id="full-image-total-view">1224</span>
                        <span class="top-modal-btn-container">
                <a id="btn-edit" class="top-modal-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Sửa</a>

                <a onclick="window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://localhost:8000/bai-tap-colorme?id=666','sharer','toolbar=0,status=0,width=580,height=325');"
                   href="javascript:void(0)" id="btn-share-fb" class="top-modal-btn"><i class="fa fa-facebook"></i> Chia sẻ</a>
                <span id="category-product"></span>
              </span>
                        <div class="secondary-content">

                            <!--"THIS IS IMPORTANT! to close the modal, the class name has to match the name given on the ID-->
                            <div id="btn-close-modal-custom" class="close-modal-02">
                                <i class="material-icons small" style="color:#c50000">highlight_off</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding-top: 58px">
            <div class="container">
                <div class="row">
                    <div class="col s12 m8 push-m2"
                         style="background: white;">
                        <div class="row">
                            <div class="col s12" id="full-image-container" style="padding:0">
                            </div>
                        </div>


                        <div class="row" id="full-image-blog-title-container">
                            <div class="col s12 blog-post-title" id="full-image-blog-title">
                            </div>
                        </div>
                        <div class="row" id="blog-content-container">
                            <div id="blog-content">
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col s12">
                                <div style="float:left;height:60px;width: 60px;padding-top:5px">
                                    <img id="full-image-avatar" class="circle"
                                         src="{{url('img/user.png')}}"
                                         width="50" height="50">
                                </div>
                                <div style="float:left;height: 60px;font-size:14px;padding-top:7px">
                                    <a class="username" target="_blank"
                                       style="display: block" id="full-image-name"></a>
                                    <a class="newsfeed-item-time" id="full-image-time"
                                       style="display: block"></a>
                                </div>
                            </div>
                        </div>


                        <div class="row" id="full-image-description-container">
                            <div class="col s12" id="full-image-description"
                                 style="padding-left:20px;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12" id="full-image-tag">

                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12" id="full-image-classes">
                            </div>
                        </div>

                        <div class="row"
                             style="margin-bottom:5px;padding-top:15px;border-top:1px solid #d9d9d9">
                            <div class="col s12"
                                 id="full-image-comment">
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 10px">
                            <div class="col s12" id="full-image-input-container">
                                @if(isset($user))
                                    <input placeholder="Thêm bình luận" productid="" class="input-comment"
                                           id="full-image-comment-input" type="text">
                                @else
                                    <div class="center">Bạn phải <a href="{{url('login')}}">đăng nhập</a> mới comment
                                        được
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{URL::asset('js/animatedModal.min.js')}}"></script>
<script>
    var search = "";
    if (window.location.search) {
        search = window.location.search;
    }
    var currentUrl = window.location.pathname + search;
    function moveToComment() {
        //        $("#modal-02").scrollTop($("#full-image-comment").offset().top);
        $('html, #modal-02').animate({
            scrollTop: $("#full-image-comment").offset().top
        }, 1000);
        return false;
    }

    function stopAllVideo() {
        $('video').each(function () {
            $(this)[0].pause();
        });
    }
    $("#demo02").animatedModal({
        modalTarget: 'modal-02',
        animatedIn: 'bounceInRight',
        animatedOut: 'bounceOutRight',
        color: '#ffffff',
        // Callbacks
        beforeOpen: function () {
            stopAllVideo();
            if (socket) {
                socket.disconnect();
            }
            console.log('disconnect');
        },
        afterOpen: function () {
            console.log("The animation is completed");

        },
        beforeClose: function () {
            console.log("The animation was called");
            if (currentUrl) {
                history.pushState({}, "", currentUrl);
            }
        },
        afterClose: function () {
            socket.disconnect();
            console.log('disconnect');
            canOpen = true;
            stopAllVideo();
            $('#full-image-container').html("");
        }
    });
    $(document).ready(function () {
        $('#modal-02').scroll(function () {
            //            $('#btn-close-modal-custom').css('top', $('#modal-02').scrollTop() + 20);
//            if ($('#modal-02').scrollTop() > 15) {
//                $('#full-image-btn-row').css('top', $('#modal-02').scrollTop() - 15);
//            } else {
//                $('#full-image-btn-row').css('top', 0);
//            }

        });
    });
    function loadVideoDone() {
        $('#loading-video').hide();
        $('#full-video').show();
    }
    // function add_view(product_id) {
    //   var cur_views = parseInt($('#total_views' + product_id).html());
    //   $('#total_views' + product_id).html(cur_views + 1);
    //   $.post(
    //     '{{url('product/storeview')}}',
    //     {
    //       _token: '{{csrf_token()}}',
    //       product_id: product_id
    //     }, function (data, status) {
    //       $('#full-image-total-view').html(data);
    //     }
    //   );
    // }
    var socket;
    function listen_to_comment(product_id) {
        socket = io('http://colorme.vn:3000/');
//        socket = io('http://localhost:3000');
        console.log('listen');
        socket.on("colorme-channel:comment", function (data) {
//            console.log(data);
            $('#full-image-comment').append(data);
        });
    }
    var canOpen = true;
    function showFullImageModal(product_id, type, url) {
        if (canOpen) {
            if (url) {
                history.pushState({}, "", url);
            } else {
                currentUrl = null;
            }
            canOpen = false;
            $('#full-image-btn-row').show();
            var getProductUrl = '{{url('api/getproductdata/')}}' + "/" + product_id;
            var getCommentUrl = '{{url('ajax/getcomments')}}' + "/" + product_id;
            var detailUrl = '{{url('bai-tap-colorme?id=')}}' + product_id;

            var cur_views = parseInt($('#total_views' + product_id).html());
            $('#total_views' + product_id).html(cur_views + 1);

            if ($('#btn-like-' + product_id).hasClass('liked')) {
                $('#btn-full-image-like').addClass('liked');
            } else {
                $('#btn-full-image-like').removeClass('liked');
            }
            if (type == 3) {
                $('#full-image-container').html('<h3>loading...</h3>');
            }
            if (type == 2) {
                //            var image = '<img src="" id="full-image" style="width:100%;"/>';
                //            $('#full-image-container').html(image);
                //            $('#full-image').attr('src', $('#image' + product_id).attr('src'));
                $('#full-image-container').html('');

                $('#blog-content-container').show();
                $('#blog-content').html('Đang tải');
            } else {
                $('#blog-content-container').hide();

                if (type == 0) {
                    var image = '<img src="" id="full-image" style="width:100%;"/>';
                    $('#full-image-container').html(image);
                    $('#full-image').attr('src', $('#image' + product_id).attr('src'));

                }
                else {
                    var video = '<video class="responsive-video"' +
                            'onloadedmetadata="loadVideoDone()"' +
                            'id="full-video"' +
                            'controls preload="metadata">' +
                            '<source src="" type="video/mp4">' +
                            '</video>';
                    $('#full-image-container').html(video);
                    $('#full-video').hide();
                    $('#full-image-container').append("<h4 id='loading-video'>Loading....</h4>");
                    $('#full-video').attr('src', $('#video-tag' + product_id).attr('full'));
                }
            }

            $('#btn-share-fb').attr('onclick', "window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('bai-tap-colorme?id=')}}" + product_id + "','sharer','toolbar=0,status=0,width=580,height=325');");

            $('#btn-share-fb').attr('href', "javascript:void(0)");
            {{--$('#btn-share-fb').attr('href', "{{url('bai-tap-colorme?id=')}}" + product_id);--}}
            $('#demo02').trigger('click');
            $('#full-image-total-like').html('Đang tải');
            if (type == 2) {
                $('#full-image-description-container').hide();
                $('#full-image-blog-title-container').show();
                $('#full-image-description').html('Đang tải');
            } else {
                $('#full-image-description-container').show();
                $('#full-image-blog-title-container').hide();
                $('#full-image-blog-title').html('Đang tải');
            }


            $('#full-image-name').html('Đang tải');
            $('#full-image-classes').html('');
            $('#full-image-total-view').html('Đang tải');
            $('#full-image-total-comment').html('Đang tải');


            $('#full-image-comment').html('Đang tải');
            $('#full-image-avatar').attr('src', '{{url('img/user.png')}}');

            $('#full-image-comment-input').attr('productid', product_id);

            $('#btn-full-image-like').attr('onclick', 'toggle_like(' + product_id + ')');
            $.get(
                    getProductUrl,
                    function (obj) {
                        var user_id = {{isset($user)?$user->id:-1}};
                        if (user_id == obj.author.id && obj.type == 2) {
                            var product_edit_url = "{{url('student/editblogpost/')}}" + "/" + obj.id;

                            $('#btn-edit').attr('href', product_edit_url);
                            $('#btn-edit').show();
                        } else {
                            $('#btn-edit').hide();
                        }
                        var classes = obj.classes;
                        for (var i = 0; i < classes.length; i++) {
                            var chip = '<div class="chip">' +
                                    '<img src="' + obj.classes[i].course.icon_url +
                                    '" alt="Contact Person">' +
                                    classes[i].name +
                                    '</div>';
                            $('#full-image-classes').html(chip);
                        }

                        $('#full-image-total-like').html(obj.total_likes);
                        $('#full-image-total-comment').html(obj.total_comments);

                        $('#full-image-total-view').html(obj.views);
                        $('#full-image-name').html(obj.author.name);


                        $('#full-image-time').html(obj.remain_time);
                        $('#full-image-time').attr('href', detailUrl);

                        if (type == 2) {
                            var categoryProduct = '<a class="category-chip" style="padding:8px 10px;font-size:16px" href=' + obj.category_url + '>' + obj.category_name + '</a>';
                            $('#category-product').html(categoryProduct);
                        }
                        if (type == 3) {
                            $('#full-image-container').html(obj.items);
                            $('#full-image-description').html(obj.content);
                            console.log('content ' + obj.content);
                        }
                        if (obj.description) {
                            if (type == 2 || type == 3) {
                                $('#full-image-blog-title').html(obj.description);
                                $('#full-image-blog-title-container').show();
                            } else {
                                $('#full-image-description').html(obj.description);
                            }
                        } else {
                            $('#full-image-blog-title-container').hide();
                            $('#full-image-description-container').hide();
                        }

                        if (obj.tags) {
                            $('#full-image-tag').parent('.row').show();
                            $('#full-image-tag').html(obj.parsed_tags);
                        } else {
                            $('#full-image-tag').parent('.row').hide();
                        }

                        if (obj.url) {
                            $('#full-image').attr('src', obj.url);
                        }

                        if (obj.content) {
                            $('#blog-content').html(obj.content);
                        } else {
                            $('#blog-content').html('Bài viết này không có nội dung!');
                        }
                        $('#full-image-name').attr('href', '{{url('profile')}}' + "/" + obj.author.email_name);
                        if (obj.author.avatar_url) {
                            $('#full-image-avatar').attr('src', obj.author.avatar_url);
                        }
                        if (obj.type == 2) {
                            $('#btn-share-fb').attr('onclick', "window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + obj.share_url + "','sharer','toolbar=0,status=0,width=580,height=325');");
                        }
                    });

            $.get(getCommentUrl, function (data) {
                $('#full-image-comment').html(data);
                listen_to_comment(product_id);
            });
        }
    }
    function enter_to_comment() {
        $(".input-comment").keyup(function (e) {
            if (e.keyCode == 13) {
                var productid = $(this).attr('productid');
                add_comment(productid);
            }
        });
    }
    function add_comment(product_id) {

        var total_comments = parseInt($('#total_comments' + product_id).html());
        $('#total_comments' + product_id).html(total_comments + 1);
        $('#full-image-total-comment').html(total_comments + 1);

        var comment_content = $('#full-image-comment-input').val();
        $('#');
        $('#full-image-input-container').html('<div class="progress"> <div class="indeterminate"></div> </div>');
        $.post(
                '{{url('storecomment')}}',
                {
                    product_id: product_id,
                    'comment_content': comment_content,
                    _token: '{{csrf_token()}}'
                }
                ,
                function (data, status) {
                    //                    $('#full-image-total-comment').html(total_comments);
                    //                    $('#total_comments' + product_id).html(total_comments);
                    $('#full-image-comment-input').val('');

                    //add comment using javascript
                    {{--$('#full-image-comment').append(--}}
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
                    {{--)--}}
                    {{--;--}}

                    $('#full-image-input-container').html('<input placeholder="Thêm bình luận" productid="' + product_id + '" class="input-comment" id="full-image-comment-input" type="text">');
                    enter_to_comment();
                }
        )
        ;
        return false;
    }

    $(document).ready(function () {
        enter_to_comment();
    });

</script>
