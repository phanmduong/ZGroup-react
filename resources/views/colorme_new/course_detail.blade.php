@extends('colorme_new.layouts.master')

@section('content')
    <div>
        <div class="container-fluid">
            <div class="row au-first right-image"
                 style="height: 300px; background-image: url('{{$course->cover_url}}')">
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
            <br> <br>
        </div>
        {!! $course->detail !!}
        <?php $registerId = null?>
        @if (isset($user))
            <?php $register = $user->registers()->where('course_id', $course->id);
            $registerId = $user->registers()->where('course_id', $course->id)->orderBy('created_at', 'desc')->first();
            $registerId = $registerId ? $registerId->id : null;
            ?>
            @if($register->where('status', 1)->first() == null)
                <div id="modal-register-course" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <img width="60" height="60" style="display: inline-block; margin-right:10px"
                                     class="media-object img-circle"
                                     src="{{$course->icon_url}}"
                                     alt="avatar url">
                                <h4 class="card-title" style="display: inline">{{$course->name}}</h4>
                            </div>
                            <div class="modal-body">
                                <p>Chào bạn,</p>

                                <p>
                                    Bạn vui lòng điền mã mở khóa:
                                </p><br><br>
                                <form>
                                    <input type="hidden" name="register_id" v-model="registerId">
                                    <input type="hidden" name="course_id" value="{{$course->id}}">
                                    <div class="form-group">
                                        <label for="code">Mã mở khóa
                                            <star style="color: red;">*</star>
                                        </label>
                                        <input type="text" class="form-control" name="code"
                                               placeholder="Nhập mã mở khóa"
                                               v-model="user.code"
                                               required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <div id="modal-footer-submit" v-if="isSuccess">
                                    <div style="display: flex; justify-content: center; align-items: center;">
                                        <div style="color: green; padding: 15px;">Mở khóa thành công, đang tải dữ
                                            liệu...
                                        </div>
                                    </div>
                                </div>
                                <div id="modal-footer-submit" v-if="isError">
                                    <div style="display: flex; justify-content: center; align-items: center;">
                                        <div style="color: red; padding: 15px;">@{{error}}
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-register"
                                            v-on:click="submitRegister">Mở khóa
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
                                        v-if="!isLoading && !isSuccess && !isError" v-on:click="submitRegister">Mở khóa
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            @endif
        @else
            <div id="modal-register-course" class="modal fade pick-class" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <img width="60" height="60" style="display: inline-block; margin-right:10px"
                                 class="media-object img-circle"
                                 src="{{$course->icon_url}}"
                                 alt="avatar url">
                            <h4 class="card-title" style="display: inline">{{$course->name}}</h4>
                        </div>
                        <div class="modal-body">
                            <p>Chào bạn,<br><br>
                            <p>
                                Bạn vui lòng điền các thông tin bên dưới nhé:
                            </p><br><br>
                            <form>
                                <input type="hidden" name="course_id" value="{{$course->id}}">
                                <input type="hidden" name="register_id" v-model="registerId">
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
                                    <input type="text" class="form-control" name="phone"
                                           placeholder="Nhập số điện thoại"
                                           v-model="user.phone"
                                           required>
                                </div>
                                <div class="form-group">
                                    <label for="code">Mã mở khóa
                                    </label>
                                    <input type="text" class="form-control" name="code"
                                           placeholder="Nhập mã mở khóa"
                                           v-model="user.code"
                                    >
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div id="modal-footer-submit" v-if="isSuccess">
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <div style="color: green; padding: 15px;">Đăng ký thành công, đang tải dữ liệu...
                                    </div>
                                </div>
                            </div>
                            <div id="modal-footer-submit" v-if="isError">
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <div style="color: red; padding: 15px;">@{{error}}
                                    </div>
                                </div>
                                <button type="button" class="btn btn-register"
                                        v-on:click="submitRegister">Đăng kí
                                </button>
                                <button type="button" class="btn btn-default btn-login"
                                        v-on:click="openModalLogin">Đã có tài khoản
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
                            <button type="button" class="btn btn-default btn-login"
                                    v-if="!isLoading && !isSuccess && !isError"
                                    v-on:click="openModalLogin">Đã có tài khoản
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        @endif

    </div>
@endsection

@push('scripts')
    <script>
        var formRegisterCourse = new Vue({
            el: '#modal-register-course',
            data: {
                classData: {},
                user: {},
                isSuccess: false,
                isError: false,
                isLoading: false,
                registerId: '{{$registerId ? $registerId : ''}}',
                error: ''
            },
            methods: {
                submitRegister: function () {
                    fbq('track', 'CompleteRegistration');
                    $("#modal-register-course form").validate({
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
                    if ($("#modal-register-course form").valid()) {
                        var data = {};
                        this.isSuccess = false;
                        this.isError = false;
                        this.isLoading = true;
                        $("#modal-register-course form").find("input").each(function () {
                            data[$(this).attr("name")] = $(this).val();
                        });
                        axios.post("/elearning/register-store", data)
                            .then(function (res) {
                                this.isLoading = false;
                                if (res.data.status === 1) {
                                    this.isSuccess = true;
                                    if (res.data.auth) {
                                        localStorage.setItem('auth', JSON.stringify(res.data.auth));
                                    }
                                    location.reload();
                                } else {
                                    this.isError = true;
                                    this.error = res.data.message;
                                    this.registerId = res.data.register_id;
                                }
                            }.bind(this))
                            .catch(function () {
                                this.isLoading = false;
                                this.isError = true;
                                this.error = 'Có lỗi xảy ra. Vui lòng thử lại'
                            }.bind(this));
                    }
                },
                openModalLogin: function () {
                    console.log("đá");
                    $('#modal-register-course').modal('toggle');
                    $('#modalLogin').modal('toggle');
                }
            },

        });
        $(document).ready(function () {
            $('#modal-register-course').modal('toggle');
            $('a>.btn-register').click(function () {
                $('#modal-register-course').modal('toggle');
            })
        })
    </script>
@endpush