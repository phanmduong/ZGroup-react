<style>
    #dropdown1 {
        width: 180px !important;
    }

    #dropdown2, #dropdown3 {
        position: fixed;
        top: 60px;
        width: 150px !important;
    }

    #dropdown2 {
        right: 15%;
    }

    #dropdown3 {
        right: 5%;
    }

    .dropdown-content-new {
        color: #C00002;
        background-color: #fff;
        margin: 0;
        display: none;
        min-width: 100px;
        max-height: 650px;
        overflow-y: auto;
        opacity: 1;
        position: absolute;
        z-index: 999;
        will-change: width, height;
        box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.5)
    }

    .newfeed-btn, .profile-btn {
        padding: 0 5px;
    }

    .newfeed-btn:hover, .profile-btn:hover {
        background-color: rgba(58, 58, 58, 0.3);
        transition: background-color 0.5s;
    }

    .no-noti {
        color: rgba(100, 12, 13, 1);
        opacity: 0.5;
    }

    .noti {
        display: none;
        background-color: white;
        color: #c00002;
        border-radius: 10px;
        padding: 2px 5px;
        position: relative;
        top: -10px;
        left: -15px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    }

    #search-box {
        width: 300px;
        background-color: white;
        height: 100%;
        color: black;
        padding-left: 5px;
        border-bottom: none;
        box-shadow: none;
        /*border: solid 1px #b30000;*/
        margin: 0;
        position: relative;
        top: -7px;
    }

    #search-submit {
        position: relative;
        top: -7px;
        height: 40px;
        width: 40px;
        line-height: 30px;
        background-color: #f6f7f8;
        color: black;
        border: none;

    }

    #search-container {
        overflow: hidden;
        margin-top: 6px;
        width: 350px;
        background: white;
        float: left;
        padding: 0;
        margin-left: 55px;
        border-radius: 5px;
        height: 30px;
    }

    #search-autocomplete {
        display: none;
        position: fixed;
        width: 350px;
        margin-left: 55px;
        top: 40px;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        background: white;
        overflow: hidden;
    }

    .autocomplete-item {
        padding: 5px 8px;
        overflow: hidden;
    }

    .autocomplete-item:hover {
        background-color: #FFFCFC;
    }

    .autocomplete-item img {
        height: 40px;
        width: 40px;
        float: left;
    }

    .search-item-text {
        height: initial;
        line-height: initial;
        margin-top: 3px;
    }

    #search-container-mobile {

    }

    #search-box-mobile {
        padding-left: 50px;
        background: url("https://s3-ap-southeast-1.amazonaws.com/cmstorage/icons/search_icon.png") no-repeat;
        background-size: 30px;
        background-position: 10px 6px;
        font-size: 18px;
    }

    .navbar-item-selected {
        color: white !important;
        opacity: 1 !important;
    }

</style>
<div id="new-nav">
    <nav class="fixed-nav" style="position: fixed; z-index: 999;">
        <div class="container" style="height: 100%">
            <div class="nav-wrapper" style="height: 100%;">
                <a href="{{url('/')}}" class="brand-logo" style="height: 100%; float: left;">
                    <img src="{{URL::asset('img/logo-text.png')}}" height="100%" style="color: red;"/>
                </a>

                <form id='search-form' method="get" action="{{url('search')}}">
                    <div id='search-container'>
                        <input autocomplete="off" value="{{isset($search_str)?$search_str:''}}"
                        placeholder="Tìm kiếm colorME" name="q" type="text" id='search-box' required=""/>
                        <button type="submit" id='search-submit'><i style="height:30px;line-height:30px"
                            class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>


                    <div id="search-autocomplete">

                    </div>
                </form>

                @if($user != null)
                <a class='dropdown-button-new' href='javascript:void(0)' data-activates='dropdown2'>
                    <span style="float: right; margin-left:10px; position: relative; top: -4px; font-size: 160% ">
                        <i class="fa fa-sort-down"></i>
                    </span>
                </a>
                <a href="{{url("profile/".get_first_part_of_email($user->email))}}"><span class="profile-btn"
                  style="float: right; width: auto; height: 100%">{{$user->name}}
                  <img
                  src="{{($user->avatar_url!=null)?$user->avatar_url:url('img/user.png')}}"
                  width="20"
                  style="position: relative; top: 5px;"></span></a>
                  {{--<a href="{{url("/newsfeed")}}"><span class="newfeed-btn"--}}
                  {{--style="float: right; margin-left: 10px; position: relative; height: 100%; line-height: 70px;">Bảng tin</span></a>--}}
                  <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#"><i class="material-icons no-noti">supervisor_account</i></a></li>
                    <li><a href="#"><i class="material-icons no-noti">forum</i></a></li>
                    <li>
                        <a id="notificationLink" >
                            <i class="noti-icon no-noti fa fa-globe" style="font-size: 150%"></i>
                        </a>
                        <div id="notificationContainer">
                            <div id="notificationTitle">Thông báo<span style="position:absolute;left:10px" id="notification-loading"></span></div>
                            <div id="notificationsBody">
                            </div>
                            <div id="notificationsPreloader">
                            </div>
                            <a id="notificationFooter" href="{{url("/notifications")}}">See All</a>
                        </div>

                        <span class="noti"></span>

                    </li>
                </ul>
                <!-- Dropdown Structure -->
                <ul id='dropdown2' class='dropdown-content-new'>
                    @if ($user->role==1 || $user->role == 2)
                    <li style="text-align: center; width: 100%"><a class="dropdown-item"
                     href="{{url("manage/dashboard")}}"
                     style="color: #c00002">Quản lý</a></li>
                     @endif
                     {{--<li style="text-align: center"><a--}}
                     {{--href="{{url('profile/'.get_first_part_of_email($user->email).'/edit/'.$user->id)}}">Cài--}}
                     {{--đặt</a></li>--}}
                     <li style="text-align: center; width: 100%"><a class="dropdown-item" href="{{url('logout')}}"
                         style="color: #c00002">Đăng
                         xuất</a></li>
                     </ul>
                     @else
                     <a href="{{url('/login')}}">
                        <span style="float: right; position: relative; height: 100%;">
                            Đăng nhập
                        </span>
                    </a>
                    @endif
                </div>
            </div>
        </nav>
    </div>
    <div id="new-nav-small-screen">

        <nav class="fixed-nav" style="position: fixed; z-index: 999;">
            <div class="container" style="height: 100%">
                <div class="nav-wrapper" id="nav-wrapper-new" style="height: 100%;">
                    <a href="{{url('/')}}" class="brand-logo" style="height: 100%; float: left; left: 10%"><img
                        src="{{URL::asset('img/logo-text.png')}}" height="100%"/></a>
                        @if($user != null)
                        <a class='dropdown-button-new' href='javascript:void(0)' data-activates='dropdown3'><span
                            style="float: right; margin-left:10px; position: relative; top: -4px; font-size: 160% "><i
                            class="fa fa-sort-down"></i></span></a>
                            {{--<span style="float: right; margin-left: 10px;">{{$user->name}} <img src="{{($user->avatar_url!=null)?$user->avatar_url:url('img/user.png')}}"--}}
                            {{--width="40"--}}
                            {{--style="position: relative; top: 13px;"></span>--}}
                            <ul id="nav-mobile-new" style="position: relative; float:right; width: 210px;">
                                <li><a id='search-button-mobile'><i class="material-icons no-noti">search</i></a></li>
                                <li><a href="#"><i class="material-icons no-noti">supervisor_account</i></a></li>
                                <li><a href="#"><i class="material-icons no-noti">forum</i></a></li>
                                <li><a href="{{url("/notifications")}}"><i class="noti-icon no-noti fa fa-globe"
                                 style="font-size: 150%"></i>
                                 <span class="noti"></span>
                             </a>

                         </li>
                     </ul>
                     <!-- Dropdown Structure -->
                     <ul id='dropdown3' class='dropdown-content-new center'>
                        <li style="width: 100%"><a class="dropdown-item"
                         href="{{url("profile/".get_first_part_of_email($user->email))}}"
                         style="color: #C00002;">{{$user->name}}</a></li>
                         {{--<li style="width: 100%"><a href="{{url("/newsfeed")}}" style="color: #C00002;">Bảng tin</a></li>--}}
                         @if ($user->role==1 || $user->role == 2)
                         <li style="text-align: center; width: 100%"><a class="dropdown-item"
                             href="{{url("manage/dashboard")}}"
                             style="color: #c00002">Quản
                             lý</a></li>
                             @endif
                             {{--<li style="text-align: center"><a--}}
                             {{--href="{{url('profile/'.get_first_part_of_email($user->email).'/edit/'.$user->id)}}">Cài--}}
                             {{--đặt</a></li>--}}
                             <li style="text-align: center; width: 100%"><a class="dropdown-item" href="{{url('logout')}}"
                                 style="color: #c00002">Đăng
                                 xuất</a>
                             </li>
                         </ul>
                         @else
                         <a href="{{url('/login')}}" style="float: right;  height: 100%;margin-left:15px">
                          <span>
                              Đăng nhập
                          </span>
                      </a>
                      <ul id="nav-mobile-new" style=" float:right;">
                        <li><a id='search-button-mobile'><i class="material-icons no-noti">search</i></a></li>
                    </li>
                </ul>

                @endif
            </div>
        </div>
    </nav>
    <div id='search-container-mobile'
    class='z-depth-1'
    style="display:none;position:fixed;z-index:1000;top:42px;background:white;height:43px;width:100%">
    <form id='search-form-mobile' method="get" action="{{url('search')}}">
        <div>
            <input type="text" name='q' placeholder="Tìm kiếm colorME" id='search-box-mobile'/>

            <div id="search-autocomplete">

            </div>
        </div>
    </form>
</div>
</div>

<script>
    function toggle_search_mobile() {
        $('#search-container-mobile').toggle("slide", {direction: "up"}, 150);
        $('#search-box-mobile').focus();
        $('#search-button-mobile i').toggleClass('navbar-item-selected');
        var icon_text = $('#search-button-mobile i').html();
        if (icon_text != 'close') {
            $('#search-button-mobile i').html('close');
        } else {
            $('#search-button-mobile i').html('search');
        }
    }
    function searchCallbackFunction() {
        var preloader = '<div class="progress"><div class="indeterminate"></div></div>';

        $('div#search-autocomplete').html(preloader);
        $('div#search-autocomplete').fadeIn();
        var value = $('input#search-box').val();

        var search_url = '{{url('searchautocomplete?value=')}}' + value;

        if (value.length > 0) {
            $.get(
                search_url,
                function (data, status) {
                    $('div#search-autocomplete').html(data);
                }
                );
        } else {
            $('div#search-autocomplete').hide();
        }
    }
    function hideSearchBox() {
        console.log('hide');
        $('div#search-autocomplete').hide();
    }
    $('html').click(function () {
        $('div#search-autocomplete').hide();
        $('#search-container-mobile').slideUp(150);
    });
    $('div#search-autocomplete').click(function (event) {
        event.stopPropagation();
    });

    $('input#search-box').click(function (event) {
        event.stopPropagation();
    });

    $('#search-container-mobile').click(function (event) {
        event.stopPropagation();
    });

    $('#search-button-mobile').click(function (event) {
        event.stopPropagation();
        toggle_search_mobile();
    });
    $('input#search-box').on("input", null, null, searchCallbackFunction);
</script>
