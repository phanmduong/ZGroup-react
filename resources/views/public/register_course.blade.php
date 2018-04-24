@extends('layouts.new_public') @section('content')
<div id="page" class="page">
    <div class="pixfort_gym_13 construction " id="section_gym_5">
        <div class="join_us_section pix_builder_bg" style="background-image: url(http://d1j8r0kxyu9tj8.cloudfront.net/files/15136564431SU4N9w6HTNSkub.jpg); background-color: rgb(51, 51, 51); padding-top: 100px; padding-bottom: 200px; box-shadow: none; border-color: rgb(68, 68, 68); background-size: cover; background-attachment: scroll; background-repeat: repeat; outline-offset: -3px;"
            src="images/uploads/logo1.jpg">
            <div class="container">
                <div class="sixteen columns">
                    <div class="ten columns alpha area_1">
                        <span class="const_title">
                            <span class="editContent" style="">
                                <span class="pix_text">Đăng kí lớp
                                    <br> {{$class->name}}
                                    <br>
                                </span>
                            </span>
                        </span>
                        <p>
                            <span class="editContent" style="">Vui lòng điền chính xác thông tin của bạn, colorME sẽ liên hệ lại bạn trong vòng 24h tới. Cảm
                                ơn bạn đã tin tưởng và lựa chọn colorME.</span>
                        </p>
                    </div>

                    <div class="six columns omega" id="submitForm">
                        <div class="pix_form_area">
                            <div class="substyle pix_builder_bg">
                                <div class="title-style">
                                    <span class="editContent" style="">
                                        <span class="pix_text" rel="">ĐĂNG KÍ</span>
                                    </span>
                                </div>
                                <br>
                                <div class="text-style">
                                    <span class="editContent" style="">
                                        <span class="pix_text" style="color: rgb(68, 68, 68); font-size: 14px; background-color: rgba(0, 0, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"
                                            rel="" src="images/uploads/111.jpg">Lớp {{$class->name}} - Khai giảng ngày {{date("d/m/Y", strtotime($class->datestart))}}
                                            <br> Địa chỉ học: {{$class->base->address}}
                                            <br>
                                        </span>
                                    </span>
                                </div>
                                <br>
                                <div class="clearfix"></div>
                                <form id="contact_form" pix-confirm="hidden_pix_13">
                                    <div id="result"></div>
                                    <input type="text" v-model="name" id="name" placeholder="Họ và tên" class="pix_text" required="" src="images/uploads/111.jpg"
                                        style="color: rgb(0, 0, 0); font-size: 15px; background-color: rgb(255, 255, 255); font-family: &quot;Open Sans&quot;, sans-serif;">
                                    <input type="email" v-model="email" id="email" placeholder="Email" class="pix_text" required="" src="images/uploads/111.jpg"
                                        style="color: rgb(0, 0, 0); font-size: 15px; background-color: rgb(255, 255, 255); font-family: &quot;Open Sans&quot;, sans-serif;">
                                    <input type="text" v-model="phone" id="number" placeholder="Số điện thoại" class="pix_text" required="" src="images/uploads/111.jpg"
                                        style="color: rgb(0, 0, 0); font-size: 15px; background-color: rgb(255, 255, 255); font-family: &quot;Open Sans&quot;, sans-serif;">
                                    <span class="send_btn">
                                        <button v-if="register" id="submit_btn_13" v-on:click="submitOnclick(event)" class="slow_fade pix_text" src="images/uploads/111.jpg"
                                            style="color: rgb(255, 255, 255); font-size: 16px; background-color: rgb(204, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;">
                                            <span class="editContent" style="">Đăng kí</span>
                                        </button>
                                    </span>
                                </form>
                                <div class="clearfix"></div>
                            </div>
                            <div id="message-box" class="note_contact pix_builder_bg">
                                <span class="editContent">
                                    <span class="pix_text" rel="">
                                        <div v-if="isLoading" class="pix_builder_bg" style="text-align: center;width: 100%;;padding: 15px;">
                                            Đang tải...
                                            <br>
                                        </div>
                                        @{{ message }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var classId = {
            {
                $class - > id ? $class - > id : 0
            }
        };
        var salerId = {
            {
                $saler_id ? $saler_id : 0
            }
        };
        var campaignId = {
            {
                $campaign_id ? $campaign_id : 0
            }
        };
    </script>
    @endsection