@extends('layouts.2018-public')

@section('content')
    @foreach($pixels as $pixel)
        {!! $pixel->code !!}
    @endforeach
    <style>
        label.error {
            color: red;
            font-weight: 200 !important;
        }
        body.modal-open {
            position: fixed;
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
                                                                ngày:</strong> {{date("d/m/Y", strtotime($class->datestart))}}
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
                        <h4 class="card-title" style="display: inline" id="class-name1">Lớp PS - Danh Sách Chờ (Cơ sở
                            4)</h4>
                    </div>
                    <div class="modal-body">
                        <p>Chào bạn,<br><br>
                            Bạn đang chuẩn bị đăng kí vào lớp <b id="class-name2"> PS 12.2 </b><br>
                            Khai giảng vào ngày: <b id="class-start-time"> 22/12/2017</b><br>
                            Lịch học của bạn: <b id="class-study-time">Thứ 3-Thứ 5 (15h-17h)</b><br>
                            Địa điểm học:<b id="class-address">175 Chùa Láng, Đống Đa Hà Nội</b></p>

                        <p>
                            Bạn vui lòng điền các thông tin bên dưới nhé:
                        </p><br><br>
                        <form>
                            <input type="hidden" name="class_id" id="class-id">
                            <input type="hidden" name="saler_id" value={{$saler_id}}>
                            <input type="hidden" name="campaign_id" value={{$campaign_id}}>
                            <div class="form-group">
                                <label for="email">Địa chỉ email
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="email" class="form-control" name="email" placeholder="Nhập email" required>
                            </div>
                            <div class="form-group">
                                <label for="name">Họ và tên
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="text" class="form-control" name="name" placeholder="Nhập họ và tên"
                                       required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Số điện thoại
                                    <star style="color: red;">*</star>
                                </label>
                                <input type="text" class="form-control" name="phone" placeholder="Nhập số điện thoại"
                                       required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div id="modal-footer-submit"></div>
                        <button type="button" class="btn btn-register" id="submit-register">Đăng kí</button>
                    </div>
                </div>

            </div>
        </div>
        <script>
            function setDataModal(classData) {
                fbq('track', 'Purchase');
                $("#modal-register-class form .form-group").find("input").each(function () {
                    $(this).val("");
                });
                $("#class-id").val(classData.id);
                $("#class-name1").text(classData.name);
                $("#class-name2").text(classData.name);
                $("#class-start-time").text(classData.datestart);
                $("#class-study-time").text(classData.study_time);
                $("#class-address").text(classData.base.address);
                $("#submit-register").show();
                $("#modal-footer-submit").html("");
            }

            $(document).ready(function () {
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

                $("#submit-register").click(function () {
                    fbq('track', 'CompleteRegistration');
                    if ($("#modal-register-class form").valid()) {
                        $("#submit-register").hide();
                        var data = {};
                        $("#modal-register-class form").find("input").each(function () {
                            data[$(this).attr("name")] = $(this).val();
                        });
                        $("#modal-footer-submit").html("<div id=\"message-box\" class=\"note_contact pix_builder_bg\"><span class=\"editContent\">\n" +
                            "                                        <span class=\"pix_text\" rel=\"\">\n" +
                            "                                            <div  class=\"pix_builder_bg\"\n" +
                            "                                                 style=\"text-align: center;width: 100%;;padding: 15px;\">\n" +
                            "                                                    Đang tải...<br>\n" +
                            "                                            </div>\n" +
                            "                                           </span></span>\n" +
                            "                        </div>");
                        $.post("/classes/new_register_store", data, function (data) {
                            $("#modal-footer-submit").html('<div style="display: flex; justify-content: center; align-items: center;"><div style="color: green">Đăng ký thành công, bạn vui lòng check email để kiểm tra thông tin</div></div>');
                        })
                    }
                })
            })
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
    </div>
@endsection