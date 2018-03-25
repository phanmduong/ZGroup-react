@extends('elightmanage::layouts.master')

@section('content')
    <section id="primary" class="content-full-width"><!-- #post-12784 -->
        <div id="post-12784" class="post-12784 page type-page status-publish hentry">
            {!! $course->detail !!}
            <div class='fullwidth-section' style="background:#f1f1f1;">
                <div class="container">
                    @foreach($bases as $base)
                        {{$base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->count() == 0}}
                        <h3 class="base-name">{{$base->name}} : {{$base->address}}</h3><br>
                        <div class="row">
                            @foreach($base->classes()->where('status',1)->where('course_id',$course_id)->where('gen_id',$current_gen_id)->orderBy('created_at','asc')->get() as $class)
                                <div class="col-md-6">
                                    <div style="background:white; margin-bottom:20px; border-radius:20px; padding:3%">
                                        <div>
                                            <div style="display:flex;flex-direction:row">
                                                <div style="margin-right:20px; border-radius:25px">
                                                    <img src="{{$course->icon_url}}"
                                                         style="max-width:initial!important;border-radius:50%; height:100px;width:100px"/>
                                                </div>
                                                <div>
                                                    <h5 style="font-weight:600; margin-top:10px">
                                                        Lớp {{$class->name}}</h5>
                                                    <p>
                                                        <i class="fa fa-clock-o"></i> <b>Khai giảng
                                                            ngày:</b> {{date("d-m-Y", strtotime($class->datestart))}}

                                                        <br>

                                                        <i class="fa fa-calendar"></i> <b>Lịch
                                                            học:</b> {{$class->study_time}}

                                                        <br>

                                                        <i class="fa fa-map-marker"></i> <b>Địa
                                                            điểm:</b> {{$class->base->name}}
                                                        : {{$class->base->address}}
                                                        <br><br>
                                                    </p>
                                                    @if($class->status == 1)
                                                        <a class="btn btn-round btn-danger"
                                                           style="background-color:#7bc043;border-color:#7bc043"
                                                           href="/register-class/{{$class->id}}/{{$campaign_id}}/{{$saler_id}}"><i
                                                                    class="fa fa-plus"></i> Đăng ký </a>
                                                    @else
                                                        <a class="btn btn-round"
                                                           href="#" onClick="return false;"><i
                                                                    class="fa fa-plus"></i> Hết chỗ </a>
                                                    @endif
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            @endforeach
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        </div>
        <div class='dt-sc-hr-invisible-small  '></div>
        <div class="essb_links essb_displayed_bottom essb_share essb_template_metro-retina essb_1704761851 print-no"
             id="essb_displayed_bottom_1704761851" data-essb-postid="12784" data-essb-position="bottom"
             data-essb-button-style="button" data-essb-template="metro-retina" data-essb-counter-pos="hidden"
             data-essb-url="http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/"
             data-essb-twitter-url="http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/"
             data-essb-instance="1704761851">
            <ul class="essb_links_list">
                <li class="essb_item essb_link_facebook nolightbox"><a
                            href="http://www.facebook.com/sharer/sharer.php?u=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&t=Ti%E1%BA%BFng+Anh+To%C3%A0n+Di%E1%BB%87n"
                            title=""
                            onclick="essb_window(&#39;http://www.facebook.com/sharer/sharer.php?u=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&t=Ti%E1%BA%BFng+Anh+To%C3%A0n+Di%E1%BB%87n&#39;,&#39;facebook&#39;,&#39;1704761851&#39;); return false;"
                            target="_blank" rel="nofollow"><span class="essb_icon"></span><span
                                class="essb_network_name">Facebook</span></a></li>
                <li class="essb_item essb_link_twitter nolightbox"><a href="#" title=""
                                                                      onclick="essb_window(&#39;https://twitter.com/intent/tweet?text=Ti%E1%BA%BFng+Anh+To%C3%A0n+Di%E1%BB%87n&amp;url=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&amp;counturl=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&amp;hashtags=&#39;,&#39;twitter&#39;,&#39;1704761851&#39;); return false;"
                                                                      target="_blank" rel="nofollow"><span
                                class="essb_icon"></span><span class="essb_network_name">Twitter</span></a></li>
                <li class="essb_item essb_link_google nolightbox"><a
                            href="https://plus.google.com/share?url=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/"
                            title=""
                            onclick="essb_window(&#39;https://plus.google.com/share?url=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&#39;,&#39;google&#39;,&#39;1704761851&#39;); return false;"
                            target="_blank" rel="nofollow"><span class="essb_icon"></span><span
                                class="essb_network_name">Google+</span></a></li>
                <li class="essb_item essb_link_pinterest nolightbox"><a href="#" title=""
                                                                        onclick="essb_pinterest_picker(&#39;1704761851&#39;); return false;"
                                                                        target="_blank" rel="nofollow"><span
                                class="essb_icon"></span><span class="essb_network_name">Pinterest</span></a></li>
                <li class="essb_item essb_link_linkedin nolightbox"><a
                            href="http://www.linkedin.com/shareArticle?mini=true&amp;ro=true&amp;trk=EasySocialShareButtons&amp;title=Ti%E1%BA%BFng+Anh+To%C3%A0n+Di%E1%BB%87n&amp;url=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/"
                            title=""
                            onclick="essb_window(&#39;http://www.linkedin.com/shareArticle?mini=true&amp;ro=true&amp;trk=EasySocialShareButtons&amp;title=Ti%E1%BA%BFng+Anh+To%C3%A0n+Di%E1%BB%87n&amp;url=http://tienganh.elight.edu.vn/tieng-anh-toan-dien-4-in-1/&#39;,&#39;linkedin&#39;,&#39;1704761851&#39;); return false;"
                            target="_blank" rel="nofollow"><span class="essb_icon"></span><span
                                class="essb_network_name">LinkedIn</span></a></li>
                <li class="essb_item essb_native_item essb_native_item_facebook">
                    <div style="display: inline-block; height: 24px; max-height: 24px; vertical-align: top;;">
                        <div class="fb-like" data-href="" data-layout="button" data-action="like"
                             data-show-faces="false" data-share="false" data-width="292"
                             style="vertical-align: top; zoom: 1;display: inline;"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="essb_break_scroll"></div>
        <div class="container">
            <div class="social-bookmark"></div>
            <div class="social-share"></div>
        </div>
        </div><!-- #post-12784 -->

    </section><!-- ** Primary Section End ** -->

@endsection