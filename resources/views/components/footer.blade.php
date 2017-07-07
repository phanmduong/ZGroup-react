<footer style="padding-top:30px;border: solid lightgray 1px">
    <div class="container">
        <div class="row">
            <!--Basic Info-->
            <div class="col m5 l5 s12">
                <div style="font-size:2.1rem">Địa chỉ</div>

                175 Chùa Láng<br>Hà Nội</p>

                <div class="row">
                    <div class="col m4 s6">
                        <ul>
                            <li><a href="{{url("/")}}" class="red-text text-darken-4">Trang chủ</a></li>
                            <li><a href="{{url("courses")}}" class="red-text text-darken-4">Khóa học</a></li>
                            <li><a href="#" class="red-text text-darken-4">Đội ngũ</a></li>
                        </ul>
                    </div>
                    <div class="col m4 s6">
                        <ul>
                            <li><a target="_blank" href="https://www.facebook.com/ColorME.Hanoi"
                                   class="red-text text-darken-4">Facebook</a></li>
                            <li><a target="_blank" href="https://www.instagram.com/colorme.hanoi/"
                                   class="red-text text-darken-4">Instagram</a></li>
                            <li><a target="_blank"
                                   href="https://www.youtube.com/channel/UCfdIZQjVEgvN6l18Vtda22A"
                                   class="red-text text-darken-4">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <img src="{{url('img/comodo_secure_seal_113x59_transp.png')}}"/>
            </div>
            <!--End of Basic Info-->
            <!--Contact Form-->
            <div class="col m7 l7 s12">
                <div style="font-size:2.1rem">Liên hệ</div>

                <form id="contact-form" action="#" method="post">
                    <div class="row">
                        <div class="input-field col m12 s12">
                            <input id="guess-email" type="email" required="Nhập Email của Bạn"><label
                                    for="guess-email">Nhập
                                Email của bạn</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col m12 s12">
                            <textarea id="guess-message" rows="3" class="materialize-textarea"
                                      required="Nhớ điền tin nhắn nhé"></textarea><label
                                    for="guess-message">Tin nhắn của bạn</label>
                        </div>
                    </div>
                    <button id="submit-btn" class="btn waves-effect waves-light red darken-4" type="submit">
                        Gửi
                    </button>
                </form>
                <!--After submit form messages-->
                <!--Thank you after submit-->
                <div id="success-message" class="hide">
                    <p><b>Cám ơn bạn đã gửi tin nhắn đến cho chúng tôi</b></p>

                    <p>Chúng tôi sẽ cố gắng liên lạc nhanh nhất khi nhận được tin</p>

                </div>
                <!--End of Thank you after submit-->
                <!--Error after submit-->
                <div id="error-message" class="hide">
                    <p><b>Tin nhắn của bạn không được gửi thành công</b></p>

                    <p>Liên hệ với chúng tôi qua email <a href="mailto:#">colorme.idea@gmail.com</a>.<br>Chúng
                        tôi sẽ
                        liên lạc lại
                        nhanh nhất khi có thể</p>
                </div>
                <!--End of Error after submit-->
                <!--After submit form messages-->
            </div>
            <!--End of Contact Form-->
        </div>
    </div>
</footer>