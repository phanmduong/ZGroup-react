@extends('colorme_new.layouts.master')

@section("meta")
<meta property="og:type" content="article" />
<meta property="og:title" content="{{$course->name}}" />
<meta property="og:description" content="{{$course->description}}" />
<meta property="og:site_name" content="Color ME" />
<meta property="og:image" content="{{$course->image_url}}" />
@endsection

@section('content')
    @foreach($pixels as $pixel)
        {!! $pixel->code !!}
    @endforeach
    <style>
        label.error {
            color: red;
            font-weight: 200 !important;
        }
    </style>
    <div>
        <div class="container-fluid">
            <div class="row au-first right-image"
                 style="height: 300px; background-image: url({{$course->cover_url}})">
            </div>
            <div class="row" id="bl-routing-wrapper">
                <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                    <a class="routing-bar-item" href="#first-after-nav"
                       style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Thông
                        tin</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#pick-class"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Đăng
                        kí</a>
                </div>
            </div>
        </div>
    </div>
    {!! $course->detail !!}
    <div style="" id="pick-class">
        <br> <br>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-10">
                        <div class="row">
                            <h2 class="landing-title" class="section-heading">Chọn cơ sở gần bạn<br>Sau đó chọn lớp
                                phù hợp</h2>
                            @foreach($bases as $base)
                                {{$base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->count() == 0}}
                                <h3 class="mb-3">{{$base->name}} : {{$base->address}}</h3><br>
                                <div class="row">
                                    @foreach($base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->orderBy('name','desc')->get() as $class)
                                        <div class="col-md-6" style="margin-bottom: 20px">
                                            <div class="product-item" style="padding: 5%">
                                                <div class="card-body">
                                                    <a href="#">
                                                        <img width="60" height="60"
                                                             style="display: inline-block; margin-right:10px"
                                                             class="media-object img-circle"
                                                             src="{{$course->icon_url}}"
                                                             alt="avatar url"></a>
                                                    <h4 class="card-title" style="display: inline">
                                                        Lớp {{$class->name}}</h4>
                                                    <br>
                                                    <ul class="class-item-info">
                                                        <li><span class="glyphicon glyphicon-time"></span>
                                                            <strong>Thời gian:</strong> {{$class->study_time}}
                                                        </li>
                                                        <li><span class="glyphicon glyphicon-map-marker"></span>
                                                            <strong>{{$class->base->name}}
                                                                :</strong> {{$class->base->address}}
                                                        </li>
                                                        <li><span class="glyphicon glyphicon-calendar"></span>
                                                            <strong>Khai giảng
                                                                ngày:</strong> {{$class->datestart = date("d/m/Y", strtotime($class->datestart))}}
                                                        </li>
                                                    </ul>
                                                </div>
                                                @if($class->status == 1)
                                                    <div class="card-footer">
                                                        <a data-toggle="modal" href="#modal-register-class"
                                                           onclick="setDataModal({{$class}})">
                                                            <button class="btn-register">Đăng ký</button>
                                                        </a>
                                                    </div>
                                                @else
                                                    <div class="card-footer">
                                                        <a href="#" onClick="return false;">
                                                            <button class="btn-register disabled"
                                                                    style="background-color: #bfbfbf !important;">Đã hết
                                                                chỗ
                                                            </button>
                                                        </a>
                                                    </div>
                                                @endif

                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <!-- Modal -->
        <div id="modal-register-class" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <img width="60" height="60" style="display: inline-block; margin-right:10px"
                             class="media-object img-circle"
                             src="{{$course->icon_url}}"
                             alt="avatar url">
                        <h4 class="card-title" style="display: inline">@{{classData.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>Chào bạn,<br><br>
                            Bạn đang chuẩn bị đăng kí vào lớp <b>@{{ classData.name }}</b><br>
                            Khai giảng vào ngày: <b>@{{ classData.datestart }}</b><br>
                            Lịch học của bạn: <b>@{{ classData.study_time }}</b><br>
                            Địa điểm học:<b></b></p>

                        <p>
                            Bạn vui lòng điền các thông tin bên dưới nhé:
                        </p><br><br>
                        <form>
                            <input type="hidden" name="class_id" v-model="classData.id">
                            <input type="hidden" name="saler_id" value={{$saler_id}}>
                            <input type="hidden" name="campaign_id" value={{$campaign_id}}>
                            <div class="form-group">
                                <label for="email">Địa chỉ email
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="email" class="form-control" name="email" placeholder="Nhập email"
                                       v-model="user.email"
                                       required>
                            </div>
                            <div class="form-group">
                                <label for="name">Họ và tên
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="text" class="form-control" name="name" placeholder="Nhập họ và tên"
                                       v-model="user.name"
                                       required>
                            </div>
                            <div class="form-group" v-model="user.phone">
                                <label for="phone">Số điện thoại
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="text" class="form-control" name="phone" placeholder="Nhập số điện thoại"
                                       v-model="user.phone"
                                       required>
                            </div>
                            <div class="form-group" v-model="user.coupon">
                                <label for="coupon">Mã ưu đãi
                                </label>
                                <input type="text" class="form-control" name="coupon" placeholder="Nhập số mã ưu đãi"
                                       v-model="user.coupon"
                                       >
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div id="modal-footer-submit" v-if="isSuccess">
                            <div style="display: flex; justify-content: center; align-items: center;">
                                <div style="color: green; padding: 15px;">Đăng ký thành công, bạn vui lòng check email
                                    để kiểm tra thông
                                    tin
                                </div>
                            </div>
                        </div>
                        <div id="modal-footer-submit" v-if="isError">
                            <div style="display: flex; justify-content: center; align-items: center;">
                                <div style="color: red; padding: 15px;">Đăng ký thất bại, vui lòng thử lại.
                                </div>
                            </div>
                            <button type="button" class="btn btn-register"
                                    v-on:click="submitRegister">Đăng kí
                            </button>
                        </div>
                        <div id="modal-footer-submit" v-if="isLoading">
                            <div id="message-box" class="note_contact pix_builder_bg"><span
                                        class="editContent">
                                        <span class="pix_text" rel="">
                                            <div class="pix_builder_bg"
                                                 style="text-align: center;width: 100%;;padding: 15px;">
                                                    Đang tải...<br>
                                            </div>
                                           </span></span>
                            </div>
                        </div>
                        <button type="button" class="btn btn-register"
                                v-if="!isLoading && !isSuccess && !isError" v-on:click="submitRegister">Đăng kí
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="modalRegister" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body" style="padding-bottom: 0px">
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px">
                        <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px;height: 50px">
                        <h2 style="font-weight: 600">Nhận tư vấn trực tiếp</h2>
                        <p style="text-align:center">Bạn có thể để lại các thông tin bên dưới, 
                            <br>colorME sẽ gọi lại ngay cho bạn để tư vấn miễn phí</p>
                        <br>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   id="nameModal"
                                   type="text"
                                   placeholder="Họ và tên"/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   type="text"
                                   id="phoneModal"
                                   placeholder="Số điện thoại"/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   type="text"
                                   id="emailModal"
                                   placeholder="Email"/>
                        </div>
                        <div id="alertModal"
                             style="font-size: 14px"></div>
                            <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                                    id="submitModal">Đăng kí
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // function openModal() {
        //     $("#modalRegister").modal("show");
        // }

        window.onload = function (e) {
            setTimeout(function () {
                $("#modalRegister").modal("show");
            }, 15000);
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        $(document).ready(function () {
            $("#submitModal").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                var name = $('#nameModal').val();
                var email = $('#emailModal').val();
                var phone = $('#phoneModal').val();
                var ok = 0;
                if (name.trim() == "" || email.trim() == "" || phone.trim() == "") ok = 1;

                if (!name || !email || !phone || ok == 1) {
                    $("#alertModal").html(
                        "<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin</div>"
                    );
                    return;
                }
                if (!validateEmail(email)) {
                    $("#alertModal").html(
                        "<div class='alert alert-danger'>Bạn vui lòng kiểm tra lại email</div>"
                    );
                    return;
                }
                var message = "ColorMe đã nhận được thông tin của bạn.";
                $("#alertModal").html("<div class='alert alert-success'>" + message + "</div>");
                $("#submitModal").css("display", "none");

                var url = "";
                // $("#modalRegister").modal("hide");
                // $("#modalSuccess").modal("show");
                var data = {
                    name: name,
                    email: email,
                    phone: phone,
                    course_id: {{$course->id}},
                    saler_id: {{$saler_id ? $saler_id : 0}},
                    _token: "{{csrf_token()}}"
                };
                axios.post("/api/v3/sign-up-course", data)
                    .then(function () {
                    }.bind(this))
                    .catch(function () {
                    }.bind(this));
            });
        });

        var formRegisterClass = new Vue({
            el: '#modal-register-class',
            data: {
                classData: {},
                user: {},
                isSuccess: false,
                isError: false,
                isLoading: false
            },
            methods: {
                submitRegister: function () {
                    fbq('track', 'CompleteRegistration');
                    $("#modal-register-class form").validate({
                        rules: {
                            email: "required",
                            name: "required",
                            phone: "required",
                        },
                        messages: {
                            email: {
                                required: "Vui lòng nhập email",
                                email: "Vui lòng nhập đúng email"
                            },
                            name: "Vui lòng nhập họ và tên",
                            phone: "Vui lòng nhập số điện thoại"
                        }
                    });
                    if ($("#modal-register-class form").valid()) {
                        var data = {};
                        this.isSuccess = false;
                        this.isError = false;
                        this.isLoading = true;
                        $("#modal-register-class form").find("input").each(function () {
                            data[$(this).attr("name")] = $(this).val();
                        });
                        axios.post("/classes/new_register_store", data)
                            .then(function () {
                                setStorage("user_register", JSON.stringify(this.user), 1800);
                                this.isLoading = false;
                                this.isSuccess = true;
                            }.bind(this))
                            .catch(function () {
                                this.isLoading = false;
                                this.isError = true;
                            }.bind(this));
                    }
                }
            }
        });

        function setDataModal(classData) {
            fbq('track', 'Purchase');
            formRegisterClass.classData = classData;
            @if (isset($user))
                formRegisterClass.user =
            {!!
                                          json_encode([
                                          'email'=>$user->email,
                                          'phone'=>$user->phone,
                                          'name'=>$user->name,
                                          ])
                                      !!}
                    @else
            if (getStorage("user_register")) {
                formRegisterClass.user = JSON.parse(getStorage("user_register"));
            } else {
                formRegisterClass.user = {};
            }
            @endif
                formRegisterClass.isSuccess = false;
            formRegisterClass.isError = false;
            formRegisterClass.isLoading = false;
        }
    </script>
    <script>
        (function ($) {
            $.fn.countTo = function (options) {
                options = options || {};

                return $(this).each(function () {
                    // set options for current element
                    var settings = $.extend({}, $.fn.countTo.defaults, {
                        from: $(this).data('from'),
                        to: $(this).data('to'),
                        speed: $(this).data('speed'),
                        refreshInterval: $(this).data('refresh-interval'),
                        decimals: $(this).data('decimals')
                    }, options);

                    // how many times to update the value, and how much to increment the value on each update
                    var loops = Math.ceil(settings.speed / settings.refreshInterval),
                        increment = (settings.to - settings.from) / loops;

                    // references & variables that will change with each update
                    var self = this,
                        $self = $(this),
                        loopCount = 0,
                        value = settings.from,
                        data = $self.data('countTo') || {};

                    $self.data('countTo', data);

                    // if an existing interval can be found, clear it first
                    if (data.interval) {
                        clearInterval(data.interval);
                    }
                    data.interval = setInterval(updateTimer, settings.refreshInterval);

                    // initialize the element with the starting value
                    render(value);

                    function updateTimer() {
                        value += increment;
                        loopCount++;

                        render(value);

                        if (typeof(settings.onUpdate) == 'function') {
                            settings.onUpdate.call(self, value);
                        }

                        if (loopCount >= loops) {
                            // remove the interval
                            $self.removeData('countTo');
                            clearInterval(data.interval);
                            value = settings.to;

                            if (typeof(settings.onComplete) == 'function') {
                                settings.onComplete.call(self, value);
                            }
                        }
                    }

                    function render(value) {
                        var formattedValue = settings.formatter.call(self, value, settings);
                        $self.html(formattedValue);
                    }
                });
            };

            $.fn.countTo.defaults = {
                from: 0,               // the number the element should start at
                to: 0,                 // the number the element should end at
                speed: 1000,           // how long it should take to count between the target numbers
                refreshInterval: 5,  // how often the element should be updated
                decimals: 0,           // the number of decimal places to show
                formatter: formatter,  // handler for formatting the value before rendering
                onUpdate: null,        // callback method for every time the element is updated
                onComplete: null       // callback method for when the element finishes updating
            };

            function formatter(value, settings) {
                return value.toFixed(settings.decimals);
            }
        }(jQuery));

        jQuery(function ($) {
            // custom formatting example
            $('.count-number').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });

            // start all the timers
            $('.timer').each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
        });
    </script>
@endpush