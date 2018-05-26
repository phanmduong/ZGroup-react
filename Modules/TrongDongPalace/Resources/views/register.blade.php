@extends('trongdongpalace::layouts.master')

@section('content')
    <div id="gdlr-header-substitute"></div>
    <!-- is search -->
    <div class="gdlr-page-title-wrapper">
        <div class="gdlr-page-title-overlay"></div>
        <div class="gdlr-page-title-container container">
            <h1 class="gdlr-page-title">ĐẶT {{strtoupper($room->name)}}</h1>
            <span class="gdlr-page-caption">{{$room->base->name}}</span>
        </div>
    </div>
    <div class="content-wrapper">
        <div class="gdlr-content">

            <!-- Above Sidebar Section-->

            <!-- Sidebar With Content Section-->
            <div class="with-sidebar-wrapper">
                <div class="with-sidebar-container container">
                    <div class="with-sidebar-left twelve columns">
                        <div class="with-sidebar-content eight columns">
                            <section id="content-section-1">
                                <div class="section-container container">
                                    <div id="submitInputs" class="gdlr-item gdlr-content-item" style="margin-bottom: 60px;"><p></p>
                                        <div class="clear"></div>
                                        <div class="gdlr-space" style="margin-top: -22px;"></div>
                                        <h5 class="gdlr-heading-shortcode " style="font-weight: bold;">Vui lòng điền form bên dưới</h5>
                                        <div class="clear"></div>
                                        <div class="gdlr-space" style="margin-top: 25px;"></div>
                                        <div role="form" class="wpcf7" id="wpcf7-f4-o1" lang="en-US" dir="ltr">
                                            <div class="screen-reader-response"></div>
                                            <form action="/hotelmaster/dark/contact-page-2/#wpcf7-f4-o1" method="post"
                                                  class="wpcf7-form" novalidate="novalidate">
                                                <div style="display: none;">
                                                    <input type="hidden" name="_wpcf7" value="4">
                                                    <input type="hidden" name="_wpcf7_version" value="5.0.1">
                                                    <input type="hidden" name="_wpcf7_locale" value="en_US">
                                                    <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f4-o1">
                                                    <input type="hidden" name="_wpcf7_container_post" value="0">
                                                </div>
                                                <p>Tên của bạn<br>
                                                    <span class="wpcf7-form-control-wrap your-name"><input type="text"
                                                                                                           v-model="name"
                                                                                                           value=""
                                                                                                           size="40"
                                                                                                           class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                                                                                           aria-required="true"
                                                                                                           aria-invalid="false"></span>
                                                </p>
                                                <p>Email<br>
                                                    <span class="wpcf7-form-control-wrap your-email"><input type="email"
                                                                                                            v-model="email"
                                                                                                            value=""
                                                                                                            size="40"
                                                                                                            class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                                                                                                            aria-required="true"
                                                                                                            aria-invalid="false"></span>
                                                </p>
                                                <p>Số điện thoại<br>
                                                    <span class="wpcf7-form-control-wrap your-subject"><input
                                                            type="text" v-model="phone" value="" size="40"
                                                            class="wpcf7-form-control wpcf7-text" aria-invalid="false"></span>
                                                </p>
                                                <p>Lời nhắn<br>
                                                    <span class="wpcf7-form-control-wrap your-message"><textarea
                                                            v-model="message" cols="40" rows="10"
                                                            class="wpcf7-form-control wpcf7-textarea"
                                                            aria-invalid="false"></textarea></span></p>
                                                <div class="alert alert-danger" v-if="alert"
                                                    style="margin-top: 10px"
                                                    id="purchase-error">
                                                    @{{ alert }}
                                                </div>
                                                <br>
                                                <p><input type="submit" value="Gửi"
                                                            v-on:click="submit"
                                                          class="wpcf7-form-control"><span
                                                        ></span></p>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </section>
                        </div>

                        <div class="gdlr-sidebar gdlr-left-sidebar four columns">
                            <div class="gdlr-item-start-content sidebar-left-item">
                                <div id="text-6" class="widget widget_text gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">Trong trường hợp khẩn cấp</h3>
                                    <div class="clear"></div>
                                    <div class="textwidget">Trong trường hợp bạn cần liên hệ với chúng tôi gấp vui lòng sử dụng các thông tin được cung cấp bên dưới:
                                    </div>
                                </div>
                                <div id="text-7" class="widget widget_text gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">Thông tin liên hệ</h3>
                                    <div class="clear"></div>
                                    <div class="textwidget"><p><i class="gdlr-icon fa fa-map-marker"
                                                                  style="color: #ffffff; font-size: 16px; "></i>184 Main
                                        Collins Street West Victoria 8007</p>
                                        <p><i class="gdlr-icon fa fa-phone"
                                              style="color: #ffffff; font-size: 16px; "></i> 1800-222-222</p>
                                        <p><i class="gdlr-icon fa fa-envelope"
                                              style="color: #ffffff; font-size: 16px; "></i>
                                            contact@versatilewptheme.com</p>
                                        <p><i class="gdlr-icon fa fa-clock-o"
                                              style="color: #ffffff; font-size: 16px; "></i> Everyday 9:00-17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>

                    <div class="clear"></div>
                </div>
            </div>

        </div><!-- gdlr-content -->
        <div class="clear"></div>
    </div>
@endsection
@push('scripts')
    <script>

        var submitInputs = new Vue({
            el: '#submitInputs',
            data: {
                name: '',
                email: '',
                phone: '',
                message: '',
                alert: '',
                saler_id: {{$saler_id}},
                campaign_id: {{$campaign_id}},
                room_id: {{$room_id}},
            },
            methods: {
                validateEmail: function validateEmail(email) {
                    var re =
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email.toLowerCase());
                },
                submit: function () {
                    if (this.name === '' || this.email === '' || this.phone === '' || this.message === '') {
                        this.alert = 'Vui lòng nhập đủ thông tin';
                        return;
                    }
                    if (this.validateEmail(this.email) === false) {
                        this.alert = 'Vui lòng kiểm tra lại email';
                        return;
                    }
                    this.alert = '';
                    axios.post(window.url + '/api/booking', {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        message: this.message,
                        saler_id: this.saler_id,
                        campaign_id: this.campaign_id,
                        room_id: this.room_id,
                        _token: window.token
                    })
                        .then(function (response) {
                            this.name = "";
                            this.phone = "";
                            this.email = "";
                            this.message = "";
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    </script>
@endpush