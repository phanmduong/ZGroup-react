@extends('techkids::layouts.master')

@section('content')
    <div ng-view="" class="ng-scope"><section id="banner" class="carousel slide pc ng-scope" data-ride="carousel">
            <!-- Indicators -->
            <!-- ngIf: banner.imgs.length > 1 --><ol class="carousel-indicators ng-scope" ng-if="banner.imgs.length > 1" style="">
                <!-- ngRepeat: item in banner.imgs --><li ng-repeat="item in banner.imgs" data-target="#banner" data-slide-to="0" ng-class="{'active': $first}" class="ng-scope"></li><!-- end ngRepeat: item in banner.imgs --><li ng-repeat="item in banner.imgs" data-target="#banner" data-slide-to="1" ng-class="{'active': $first}" class="ng-scope active"></li><!-- end ngRepeat: item in banner.imgs -->
            </ol><!-- end ngIf: banner.imgs.length > 1 -->

            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
                <!-- ngRepeat: item in banner.imgs --><div style="padding: 0px; margin: 0px; max-height: 510px;" ng-repeat="item in banner.imgs" class="item ng-scope" ng-class="{'active': $first}">
                    <img width="100%" src="https://techkids.vn/photos/tkbanner2_1513313475643.png" alt="\">
                    <div class="banner_content">
                        <!-- <h1 class="banner_title">
                            Cùng Techkids<br>
                            bắt đầu hành trình thay đổi cuộc đời bạn
                        </h1> -->
                        <div class="banner_btn_container">
                            <a href="/code-for-18" class="btn banner_btn" style="background-color:#009cc6;">
                                <span>CODE FOR 18+</span>
                                (Dành cho người trưởng thành)
                            </a>
                            <a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" class="btn banner_btn" style="background-color:#fe8e22;">
                                <span>CODE FOR TEEN</span>
                                (16 - 18 tuổi)
                            </a>
                            <a href="https://techkids.edu.vn" target="_blank" class="btn banner_btn" style="background-color:#26a942;">
                                <span>CODE FOR KIDS</span>
                                (10 - 15 tuổi)
                            </a>
                        </div>
                    </div>
                </div><!-- end ngRepeat: item in banner.imgs --><div style="padding: 0px; margin: 0px; max-height: 510px;" ng-repeat="item in banner.imgs" class="item ng-scope active" ng-class="{'active': $first}">
                    <img width="100%" src="https://techkids.vn/photos/banner combo_1516152061673.jpg" alt="\">
                    <div class="banner_content">
                        <!-- <h1 class="banner_title">
                            Cùng Techkids<br>
                            bắt đầu hành trình thay đổi cuộc đời bạn
                        </h1> -->
                        <div class="banner_btn_container">
                            <a href="/code-for-18" class="btn banner_btn" style="background-color:#009cc6;">
                                <span>CODE FOR 18+</span>
                                (Dành cho người trưởng thành)
                            </a>
                            <a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" class="btn banner_btn" style="background-color:#fe8e22;">
                                <span>CODE FOR TEEN</span>
                                (16 - 18 tuổi)
                            </a>
                            <a href="https://techkids.edu.vn" target="_blank" class="btn banner_btn" style="background-color:#26a942;">
                                <span>CODE FOR KIDS</span>
                                (10 - 15 tuổi)
                            </a>
                        </div>
                    </div>
                </div><!-- end ngRepeat: item in banner.imgs -->
            </div>

            <!-- Left and right controls -->
            <!-- ngIf: banner.imgs.length > 1 --><a ng-if="banner.imgs.length > 1" class="left carousel-control ng-scope" data-target="#banner" role="button" data-slide="prev" style="">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a><!-- end ngIf: banner.imgs.length > 1 -->
            <!-- ngIf: banner.imgs.length > 1 --><a ng-if="banner.imgs.length > 1" class="right carousel-control ng-scope" data-target="#banner" role="button" data-slide="next" style="">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a><!-- end ngIf: banner.imgs.length > 1 -->
        </section>

        <section class="banner_content mb ng-scope">
            <!-- <h1 class="banner_title">
                Cùng Techkids<br>
                bắt đầu hành trình thay đổi cuộc đời bạn
            </h1> -->
            <div class="banner_btn_container">
                <a href="/code-for-18" class="btn banner_btn" style="background-color:#009cc6;">
                    <span>CODE FOR 18+</span>
                    (Dành cho người trưởng thành)
                </a>
                <a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" class="btn banner_btn" style="background-color:#fe8e22;">
                    <span>CODE FOR TEEN</span>
                    (16 - 18 tuổi)
                </a>
                <a href="https://techkids.edu.vn" target="_blank" class="btn banner_btn" style="background-color:#26a942;">
                    <span>CODE FOR KIDS</span>
                    (10 - 15 tuổi)
                </a>
            </div>
        </section>

        <section class="lines_bg ng-scope">
            <div class="container">
                <div class="row text-center">
                    <h3 class="block_title">Chào mừng bạn đã đến với Techkids!</h3>
                    <p>
                        Techkids Coding School là trường học lập trình <br>
                        Nhưng hơn thế nữa, đây là một cộng đồng toàn cầu của những người sẵn sàng trở thành những người giỏi nhất, khác biệt nhất trong thế giới Công nghệ. Ở đó chúng ta cùng nhau tìm định hướng, học hỏi hết mình, khơi dậy những ước mơ, cố gắng không ngừng và đồng hành với nhau trên hành trình chinh phục Công nghệ cao để thay đổi thế giới!
                    </p>
                    <p>
                        Nếu bạn đang tìm kiếm một sự thay đổi, nếu bạn đang mong muốn trở nên xuất sắc hơn<br>
                        Đừng sợ hãi, bạn không bao giờ phải đứng một mình!<br>
                        Hãy đến đây, mở rộng tầm nhìn của mình, chúng ta sẽ thấy một thế giới khác!
                    </p>
                </div>
            </div>
        </section>
        <section id="courses" class="courses ng-scope">

            <div class="container">
                <div class="row text-center">
                    <h3 class="block_title">CÁC KHÓA HỌC SẮP TỚI</h3>
                </div>

                <slick class="courses_list_main ng-isolate-scope slick-initialized slick-slider" init-onload="true" data="courses" infinite="false" slides-to-show="3" slides-to-scroll="1" dots="false" responsive="slick.breakpoints"><div class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 4396px; transform: translate3d(-2198px, 0px, 0px);"><div class="item ng-scope slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="-3">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/web1_1490387530937.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Web Fullstack</h4>
                                    <p class="paragraph_height ng-binding">Học cách tự tay làm A đến Z từ những trang web thông tin cơ bản đến những hệ thống website khổng lồ</p>
                                    <div><a href="/khoa-hoc-lap-trinh/web-fullstack" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="-2">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/kids1_1490387680940.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Kids</h4>
                                    <p class="paragraph_height ng-binding">Tiếp cận sớm hơn, đi nhanh và xa hơn trên con đường trở thành lập trình viên đích thực cũng như cải thiện khả năng tư duy của trẻ</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-for-kids" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="-1">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/game1_1490386314308.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Game</h4>
                                    <p class="paragraph_height ng-binding">Tiếp cận với tư duy thiết kế game hiện đại và biết cách sử dụng nền tảng phát triển game tân tiến nhất hiện nay: Unity(C#)</p>
                                    <div><a href="/khoa-hoc-lap-trinh/game" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope active slick-slide" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="0">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/teen_1512113627036.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Teen</h4>
                                    <p class="paragraph_height ng-binding">Khóa học lập trình cho thiếu niên (15-18 tuổi). Cơ hội để bạn thử - để biết về công nghệ - và tự quyết định tương lai của chính mình bằng cách lựa chọn định hướng phù hợp</p>
                                    <div><a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="1">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/java_1498988796971.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code Intensive</h4>
                                    <p class="paragraph_height ng-binding">Nâng cao trình code Java - OOP và học cách làm ra một sản phẩm hoàn thiện, từ đó đi chắc, tiến xa trong nghề</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-intensive" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="2">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/python2_1490387399834.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Everyone</h4>
                                    <p class="paragraph_height ng-binding">Bước chân vào nghề lập trình dù bạn mới bắt đầu hay là dân kinh tế, tài chính hay kế toán và làm được sản phẩm đầu tiên chỉ sau 2 tháng học tập</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-for-everyone" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="3">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/reactnative_1507202191772.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">React Native</h4>
                                    <p class="paragraph_height ng-binding">Code một được hai, xây dựng các app di động đa nền tảng của riêng mình</p>
                                    <div><a href="/khoa-hoc-lap-trinh/react-native" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-active" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="4">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/Android1_1490385554971.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Android</h4>
                                    <p class="paragraph_height ng-binding">Tự tạo ra và bán sản phẩm trên Google Play hoặc trở thành nhân viên của các công ty công nghệ hàng đầu</p>
                                    <div><a href="/khoa-hoc-lap-trinh/android" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-active" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="5">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/web1_1490387530937.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Web Fullstack</h4>
                                    <p class="paragraph_height ng-binding">Học cách tự tay làm A đến Z từ những trang web thông tin cơ bản đến những hệ thống website khổng lồ</p>
                                    <div><a href="/khoa-hoc-lap-trinh/web-fullstack" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-active" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="6">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/kids1_1490387680940.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Kids</h4>
                                    <p class="paragraph_height ng-binding">Tiếp cận sớm hơn, đi nhanh và xa hơn trên con đường trở thành lập trình viên đích thực cũng như cải thiện khả năng tư duy của trẻ</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-for-kids" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="7">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/game1_1490386314308.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Game</h4>
                                    <p class="paragraph_height ng-binding">Tiếp cận với tư duy thiết kế game hiện đại và biết cách sử dụng nền tảng phát triển game tân tiến nhất hiện nay: Unity(C#)</p>
                                    <div><a href="/khoa-hoc-lap-trinh/game" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope active slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="8">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/teen_1512113627036.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Teen</h4>
                                    <p class="paragraph_height ng-binding">Khóa học lập trình cho thiếu niên (15-18 tuổi). Cơ hội để bạn thử - để biết về công nghệ - và tự quyết định tương lai của chính mình bằng cách lựa chọn định hướng phù hợp</p>
                                    <div><a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="9">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/java_1498988796971.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code Intensive</h4>
                                    <p class="paragraph_height ng-binding">Nâng cao trình code Java - OOP và học cách làm ra một sản phẩm hoàn thiện, từ đó đi chắc, tiến xa trong nghề</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-intensive" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div><div class="item ng-scope slick-slide slick-cloned" ng-repeat="item in courses" ng-class="{'active' : $first}" style="width: 314px;" data-slick-index="10">
                                <div class="course_item">
                                    <div><span><img src="https://techkids.vn/photos/python2_1490387399834.png" height="150" width="150"></span></div>
                                    <h4 class="ng-binding">Code for Everyone</h4>
                                    <p class="paragraph_height ng-binding">Bước chân vào nghề lập trình dù bạn mới bắt đầu hay là dân kinh tế, tài chính hay kế toán và làm được sản phẩm đầu tiên chỉ sau 2 tháng học tập</p>
                                    <div><a href="/khoa-hoc-lap-trinh/code-for-everyone" class="btn btn_button_orange">TÌM HIỂU KỸ
                                            HƠN</a></div>
                                </div>
                            </div></div></div><button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button><button type="button" data-role="none" class="slick-next" style="display: block;">Next</button><ul class="slick-dots" style="display: block;"><li class=""><button type="button" data-role="none">1</button></li><li class="slick-active"><button type="button" data-role="none">2</button></li><li><button type="button" data-role="none">3</button></li></ul></slick>


            </div>
        </section>
        <section class="grey_bg ng-scope">
            <div class="container humans_of_techkids">
                <div class="row text-center">
                    <h3 class="block_title">HỌC VIÊN TIÊU BIỂU</h3>
                </div>
                <div class="humans_of_techkids_list pc">
                    <!-- ngRepeat: human in humansOfTechkids --><a ng-repeat="human in humansOfTechkids" class="ng-scope" style="">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/duc-anh-1505928260920.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Đức Anh</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">THCS Ngôi Sao</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>HCB Toán quốc tế Po Leung Kuk (19th PMWC), Hong Kong</p><p>Đạt giải Ba hội thi Tin học trẻ không chuyên cấp Quận</p><p>Học bổng 100% tại Brooke House College, Anh Quốc</p><p>Học bổng 50% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a ng-repeat="human in humansOfTechkids" class="ng-scope">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/duc-minh-1505928337591.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Đức Minh</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">ĐH Công Nghệ HN</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Giải Nhì Quốc Gia Tin Học, được tuyển thẳng vào Đại Học Công Nghệ</p><p>Đang làm việc tại Google, trụ sở Mỹ</p><p>Học bổng 100% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a ng-repeat="human in humansOfTechkids" class="ng-scope">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/an-dinh-hoanh-1505928385469.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">An Đình Hoành</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">Bennington College</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Học bổng 5 tỉ ngành Khoa học máy tính và Nghệ thuật số, Bennington College, Mỹ</p><p>Giải 3 Cuộc thi Toán học mở rộng và Tiếng Anh, Hà Nội</p><p>Học bổng 50% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a ng-repeat="human in humansOfTechkids" class="ng-scope">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/hoang-duong-1505928451937.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Hoàng Dương</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">ĐH Quốc gia Singapore</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Học bổng ASEAN toàn phần, Đại học quốc gia Singapore</p><p>Giải nhì Tin học Quốc gia 2015</p><p>HCV Tin học Olympia 2015</p><p>Học bổng 40% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a ng-repeat="human in humansOfTechkids" class="ng-scope">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/xuan-bach-1505928578402.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Xuân Bách</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">TH Đoàn Thị Điểm</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>HCB cuộc thi khoa học IMSO tại Indonesia</p><p>HCV toán IKMC</p><p>Học bổng 75% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids -->
                </div>
                <slick init-onload="true" data="humansOfTechkids" infinite="false" slides-to-show="1" slides-to-scroll="1" dots="false" class="humans_of_techkids_list mb ng-isolate-scope slick-initialized slick-slider" style="">
                    <!-- ngRepeat: human in humansOfTechkids --><a class="item ng-scope active" ng-class="{'active' : $first}" ng-repeat="human in humansOfTechkids" style="">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/duc-anh-1505928260920.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Đức Anh</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">THCS Ngôi Sao</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>HCB Toán quốc tế Po Leung Kuk (19th PMWC), Hong Kong</p><p>Đạt giải Ba hội thi Tin học trẻ không chuyên cấp Quận</p><p>Học bổng 100% tại Brooke House College, Anh Quốc</p><p>Học bổng 50% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a class="item ng-scope" ng-class="{'active' : $first}" ng-repeat="human in humansOfTechkids" style="">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/duc-minh-1505928337591.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Đức Minh</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">ĐH Công Nghệ HN</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Giải Nhì Quốc Gia Tin Học, được tuyển thẳng vào Đại Học Công Nghệ</p><p>Đang làm việc tại Google, trụ sở Mỹ</p><p>Học bổng 100% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a class="item ng-scope" ng-class="{'active' : $first}" ng-repeat="human in humansOfTechkids">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/an-dinh-hoanh-1505928385469.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">An Đình Hoành</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">Bennington College</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Học bổng 5 tỉ ngành Khoa học máy tính và Nghệ thuật số, Bennington College, Mỹ</p><p>Giải 3 Cuộc thi Toán học mở rộng và Tiếng Anh, Hà Nội</p><p>Học bổng 50% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a class="item ng-scope" ng-class="{'active' : $first}" ng-repeat="human in humansOfTechkids">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/hoang-duong-1505928451937.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Hoàng Dương</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">ĐH Quốc gia Singapore</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>Học bổng ASEAN toàn phần, Đại học quốc gia Singapore</p><p>Giải nhì Tin học Quốc gia 2015</p><p>HCV Tin học Olympia 2015</p><p>Học bổng 40% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids --><a class="item ng-scope" ng-class="{'active' : $first}" ng-repeat="human in humansOfTechkids">
                        <div>
                            <div class="background" style="background-image: url('https://techkids.edu.vn/images/uploads/xuan-bach-1505928578402.png');">
                                <div class="overlay">

                                </div>
                            </div>
                            <div class="info">
                                <span class="name ng-binding" ng-bind="human.name">Xuân Bách</span>
                                <br>
                                <span class="school ng-binding" ng-bind="human.school">TH Đoàn Thị Điểm</span>
                            </div>
                            <div class="achievement">
                                <span ng-bind-html="human.achievement" class="ng-binding"><p>HCB cuộc thi khoa học IMSO tại Indonesia</p><p>HCV toán IKMC</p><p>Học bổng 75% TechKids</p></span>
                            </div>
                        </div>
                    </a><!-- end ngRepeat: human in humansOfTechkids -->
                    <div class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 0px; transform: translate3d(0px, 0px, 0px);"></div></div></slick>
            </div>
        </section>
        <section class="linear_bg ng-scope">
            <div class="container">
                <div class="row">
                    <section id="about" class="about_us">
                        <div class="container">
                            <div class=""></div>
                            <div class="row2 text-center">
                                <h3 class="block_title text-center">LÝ DO ĐẾN TECHKIDS</h3>
                            </div>
                            <div class="pc">
                                <div class="row">
                                    <div class="why_item"><img src="http://techkids.vn/images/learning-to-code.png" class="right_pos">
                                        <div class="col-md-6 why_content">
                                            <div class="why_subtitle color_pink">
                                                <div class="icon">
                                                    <i aria-hidden="true" class="fa fa-pencil"></i>
                                                    <span>
                      <h3 style="display: inline-block;">Không chỉ là học code</h3>
                    </span>
                                                </div>
                                            </div>
                                            <p>Con đường để trở thành 1 developer giỏi không đơn giản chỉ là code trâu. Nó còn là
                                                định hướng nghề nghiệp, tư duy phát triển sản phẩm hoàn thiện, Tiếng Anh, khả năng
                                                chịu được áp lực, thái độ đúng đắn và rất nhiều kĩ năng xã hội. Ngoài việc tập trung
                                                rèn luyện trình code, TechKids cực kỳ chú trọng đến những chương trình phát triển cá
                                                nhân cho học viên để mỗi cá nhân được trang bị đầy đủ hơn những yếu tố đó.</p>
                                            <!--a(href="#") Xem thêm tại đây.-->
                                        </div>
                                    </div>
                                </div>
                                <img src="http://techkids.vn/images/Shape%20957.png" class="border">
                                <div class="row">
                                    <div class="why_item"><img src="http://techkids.vn/images/handshake-pano_19966.png">
                                        <div class="col-md-6 why_content right_pos">
                                            <div class="why_subtitle color_blue">
                                                <div class="icon"><i aria-hidden="true" class="fa fa-pencil"></i><span>
                      <h3 style="display: inline-block;">Đảm bảo việc làm</h3></span></div>
                                            </div>
                                            <p>
                                                Với chương trình Techkids connect, với 57 đối tác là những công ty, startups của VN,
                                                ASEAN và US, bạn sẽ có cơ hội thực tập, làm việc sau khi tốt nghiệp TechKids. Nếu là
                                                một học sinh đủ cố gắng trong quá trình học tập tại TechKids, không có lý do gì để
                                                các công ty không tranh nhau nhận bạn vào làm việc.
                                                Học viên TechKids thường có khả năng làm việc nhóm, chịu áp lực và quản lý dự án của
                                                bản thân tốt do liên tục tham gia các hoạt động code nhóm, cuộc thi, Hackathon xuyên
                                                đêm, được khuyến khích tham gia các chương trình khởi nghiệp và xã hội bên ngoài
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <img src="http://techkids.vn/images/Shape%20957%20copy.png" class="border">
                                <div class="row">
                                    <div class="why_item"><img src="http://techkids.vn/images/students-and-laptops.png" class="right_pos">
                                        <div class="col-md-6 why_content">
                                            <div class="why_subtitle color_green">
                                                <div class="icon"><i aria-hidden="true" class="fa fa-pencil"></i><span>
                      <h3 style="display: inline-block;">TechKids là nhà</h3></span></div>
                                            </div>
                                            <p>
                                                Hơn hết, TechKids là ngôi nhà của hơn 300 Lập trình viên tài năng. Chúng tôi cùng
                                                nhau code xuyên đêm, có đồ ăn tận nơi, có chăn gối để ngủ. Khi mệt lôi nhau đi giải
                                                trí, khi khó khăn gọi nhau ra tâm sự. Từ đó, chúng tôi xây dựng 1 cộng đồng đã có
                                                mặt ở rất nhiều nơi trên thế giới mà vẫn luôn gắn kết, nơi bất cứ ai có thể tìm về
                                                khi cần giúp đỡ và chia sẻ.
                                                Đó là lý do mỗi người đều có thể tự hào khi nói mình bước ra thế giới từ TechKids.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb">
                                <div class="row">
                                    <div class="why_item">
                                        <div class="why_content">
                                            <div class="why_subtitle color_pink">
                                                <div class="icon"><i aria-hidden="true" class="fa fa-pencil"></i></div>
                                                <h3>Không chỉ là học code</h3>
                                            </div>
                                            <img src="images/learning-to-code.png">
                                            <p>Con đường để trở thành 1 developer giỏi không đơn giản chỉ là code trâu. Nó còn là
                                                định hướng nghề nghiệp, tư duy phát triển sản phẩm hoàn thiện, Tiếng Anh, khả năng
                                                chịu được áp lực, thái độ đúng đắn và rất nhiều kĩ năng xã hội. Ngoài việc tập trung
                                                rèn luyện trình code, TechKids cực kỳ chú trọng đến những chương trình phát triển cá
                                                nhân cho học viên để mỗi cá nhân được trang bị đầy đủ hơn những yếu tố đó.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="why_item">
                                        <div class="why_content right_pos">
                                            <div class="why_subtitle color_blue">
                                                <div class="icon"><i aria-hidden="true" class="fa fa-pencil"></i></div>
                                                <h3>Đảm bảo việc làm</h3>
                                            </div>
                                            <img src="images/handshake-pano_19966.png">
                                            <p>
                                                Với chương trình Techkids connect, với 57 đối tác là những công ty, startups của VN,
                                                ASEAN và US, bạn sẽ có cơ hội thực tập, làm việc sau khi tốt nghiệp TechKids. Nếu là
                                                một học sinh đủ cố gắng trong quá trình học tập tại TechKids, không có lý do gì để
                                                các công ty không tranh nhau nhận bạn vào làm việc.
                                                Học viên TechKids thường có khả năng làm việc nhóm, chịu áp lực và quản lý dự án của
                                                bản thân tốt do liên tục tham gia các hoạt động code nhóm, cuộc thi, Hackathon xuyên
                                                đêm, được khuyến khích tham gia các chương trình khởi nghiệp và xã hội bên ngoài
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="why_item">
                                        <div class="why_content">
                                            <div class="why_subtitle color_green">
                                                <div class="icon"><i aria-hidden="true" class="fa fa-pencil"></i></div>
                                                <h3>TechKids là nhà</h3>
                                            </div>
                                            <img src="images/students-and-laptops.png">
                                            <p>
                                                Hơn hết, TechKids là ngôi nhà của hơn 300 Lập trình viên tài năng. Chúng tôi cùng
                                                nhau code xuyên đêm, có đồ ăn tận nơi, có chăn gối để ngủ. Khi mệt lôi nhau đi giải
                                                trí, khi khó khăn gọi nhau ra tâm sự. Từ đó, chúng tôi xây dựng 1 cộng đồng đã có
                                                mặt ở rất nhiều nơi trên thế giới mà vẫn luôn gắn kết, nơi bất cứ ai có thể tìm về
                                                khi cần giúp đỡ và chia sẻ.
                                                Đó là lý do mỗi người đều có thể tự hào khi nói mình bước ra thế giới từ TechKids.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <section id="teachers" class="stars teachers ng-scope" style="position: relative">
            <div class="container">
                <h3 class="section_title bg_title text-center">GIẢNG VIÊN</h3>
                <div style="background-color:transparent" class="">
                    <ul class="teachers_list center_inline_list">
                        <slick slides-to-show="4" slides-to-scroll="4" init-onload="true" next-arrow="#next-slick" prev-arrow="#prev-slick" responsive="slick.breakpoints" data="instructors" class="slider multiple-items ng-isolate-scope slick-initialized slick-slider"><div class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 5966px; transform: translate3d(-3768px, 0px, 0px);"><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="-3">
                                        <a ng-href="/giang-vien/pham-huu-bien" href="/giang-vien/pham-huu-bien">
                                            <img src="https://techkids.vn/photos/pham-huu-bien_1512127142829_1512226644800.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/pham-huu-bien" class="ng-binding" href="/giang-vien/pham-huu-bien">Phạm Hữu Biên</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Trưởng nhóm Machine Vision tại Haesung Vina&nbsp;</div><div>5 năm kinh nghiệm trong lĩnh vực thị giác máy tính và trí tuệ nhân tạo</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="-2">
                                        <a ng-href="/giang-vien/kien-vu" href="/giang-vien/kien-vu">
                                            <img src="https://techkids.vn/photos/kien-vu_1515723025148.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/kien-vu" class="ng-binding" href="/giang-vien/kien-vu">Kiên Vũ</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Key iOS Developer tại GaT</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="-1">
                                        <a ng-href="/giang-vien/huynh-tuan-anh" href="/giang-vien/huynh-tuan-anh">
                                            <img src="https://techkids.vn/photos/huynh-tuan-anh_1519684570196.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/huynh-tuan-anh" class="ng-binding" href="/giang-vien/huynh-tuan-anh">Huỳnh Tuấn Anh</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Full-stack Web Developer tại Techkids Software<br>1 trong những giảng viên được yêu quý nhất tại Techkids</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="0">
                                        <a ng-href="/giang-vien/do-anh-tu" href="/giang-vien/do-anh-tu">
                                            <img src="https://techkids.vn/photos/doanhtu_1485066501589.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/do-anh-tu" class="ng-binding" href="/giang-vien/do-anh-tu">Đỗ Anh Tú</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Co-founder at Haivl.com</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="1">
                                        <a ng-href="/giang-vien/hoang-van-dong" href="/giang-vien/hoang-van-dong">
                                            <img src="https://techkids.vn/photos/12295455_505369616307097_1044571515723092257_n_1485066524353.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/hoang-van-dong" class="ng-binding" href="/giang-vien/hoang-van-dong">Hoàng Văn Đông</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>5 năm kinh nghiệm IOS, Quản lý dự án<br>iOS Stream Leader</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="2">
                                        <a ng-href="/giang-vien/ta-hoang-minh" href="/giang-vien/ta-hoang-minh">
                                            <img src="https://techkids.vn/photos/MinhTaHoang_1485066540993.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/ta-hoang-minh" class="ng-binding" href="/giang-vien/ta-hoang-minh">Tạ Hoàng Minh</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Director at FLY TECHNOLOGY DEVELOPMENT JSC</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="3">
                                        <a ng-href="/giang-vien/nguyen-quang-huy" href="/giang-vien/nguyen-quang-huy">
                                            <img src="https://techkids.vn/photos/quanghuy_1485066555926.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/nguyen-quang-huy" class="ng-binding" href="/giang-vien/nguyen-quang-huy">Nguyễn Quang Huy</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Giám đốc học vụ và giảng viên toàn thời gian tại TechKids</div><div>Kỹ sư lập trình nhúng tại FPT Software cho thị trường Mỹ</div><div><br></div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="4">
                                        <a ng-href="/giang-vien/bui-xuan-canh" href="/giang-vien/bui-xuan-canh">
                                            <img src="https://techkids.vn/photos/canh_1485066583081.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/bui-xuan-canh" class="ng-binding" href="/giang-vien/bui-xuan-canh">Bùi Xuân Cảnh</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Trưởng phòng dự án FSoftware<br>7 năm kinh nghiệm lập trình di động</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="5">
                                        <a ng-href="/giang-vien/nguyen-duc-nhan" href="/giang-vien/nguyen-duc-nhan">
                                            <img src="https://techkids.vn/photos/14721614_1203031266426708_2124186938492036928_n_1485066635582.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/nguyen-duc-nhan" class="ng-binding" href="/giang-vien/nguyen-duc-nhan">Nguyễn Đức Nhân</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>2 năm kinh nghiệm Android<br>Thành viên tích cực của Hội sinh viên tài năng FPT</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="6">
                                        <a ng-href="/giang-vien/ton-hong-duc" href="/giang-vien/ton-hong-duc">
                                            <img src="https://techkids.vn/photos/aDuc_1490009278658.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/ton-hong-duc" class="ng-binding" href="/giang-vien/ton-hong-duc">Tôn Hồng Đức</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>9 năm kinh nghiệm lập trình<br>Top 30 Vietnam Stackoverflow</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="7">
                                        <a ng-href="/giang-vien/cuong-nguyen" href="/giang-vien/cuong-nguyen">
                                            <img src="https://techkids.vn/photos/cuong-nguyen_1485066657746.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/cuong-nguyen" class="ng-binding" href="/giang-vien/cuong-nguyen">CƯƠNG NGUYỄN</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>SENIOR FULLSTACK<br>WEB DEVELOPER AT NITECO</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="8">
                                        <a ng-href="/giang-vien/le-kinh-long" href="/giang-vien/le-kinh-long">
                                            <img src="https://techkids.vn/photos/aLong_1490009051959.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/le-kinh-long" class="ng-binding" href="/giang-vien/le-kinh-long">Lê Kinh Long</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>4 năm kinh nghiệm Full stack Web&nbsp;<br>Từng là Lead Developer, Vacasol</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-active" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="9">
                                        <a ng-href="/giang-vien/pham-hanh-quyen" href="/giang-vien/pham-hanh-quyen">
                                            <img src="https://techkids.vn/photos/QK_1495948777996.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/pham-hanh-quyen" class="ng-binding" href="/giang-vien/pham-hanh-quyen">Phạm Hạnh Quyên</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Android Developer, Techkids Software&nbsp;</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-active" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="10">
                                        <a ng-href="/giang-vien/pham-huu-bien" href="/giang-vien/pham-huu-bien">
                                            <img src="https://techkids.vn/photos/pham-huu-bien_1512127142829_1512226644800.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/pham-huu-bien" class="ng-binding" href="/giang-vien/pham-huu-bien">Phạm Hữu Biên</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Trưởng nhóm Machine Vision tại Haesung Vina&nbsp;</div><div>5 năm kinh nghiệm trong lĩnh vực thị giác máy tính và trí tuệ nhân tạo</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-active" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="11">
                                        <a ng-href="/giang-vien/kien-vu" href="/giang-vien/kien-vu">
                                            <img src="https://techkids.vn/photos/kien-vu_1515723025148.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/kien-vu" class="ng-binding" href="/giang-vien/kien-vu">Kiên Vũ</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Key iOS Developer tại GaT</div></p>
                                    </div><div class="techer_item ng-scope slick-slide" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="12">
                                        <a ng-href="/giang-vien/huynh-tuan-anh" href="/giang-vien/huynh-tuan-anh">
                                            <img src="https://techkids.vn/photos/huynh-tuan-anh_1519684570196.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/huynh-tuan-anh" class="ng-binding" href="/giang-vien/huynh-tuan-anh">Huỳnh Tuấn Anh</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Full-stack Web Developer tại Techkids Software<br>1 trong những giảng viên được yêu quý nhất tại Techkids</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="13">
                                        <a ng-href="/giang-vien/do-anh-tu" href="/giang-vien/do-anh-tu">
                                            <img src="https://techkids.vn/photos/doanhtu_1485066501589.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/do-anh-tu" class="ng-binding" href="/giang-vien/do-anh-tu">Đỗ Anh Tú</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Co-founder at Haivl.com</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="14">
                                        <a ng-href="/giang-vien/hoang-van-dong" href="/giang-vien/hoang-van-dong">
                                            <img src="https://techkids.vn/photos/12295455_505369616307097_1044571515723092257_n_1485066524353.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/hoang-van-dong" class="ng-binding" href="/giang-vien/hoang-van-dong">Hoàng Văn Đông</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>5 năm kinh nghiệm IOS, Quản lý dự án<br>iOS Stream Leader</div></p>
                                    </div><div class="techer_item ng-scope slick-slide slick-cloned" ng-repeat="item in instructors" style="width: 314px;" data-slick-index="15">
                                        <a ng-href="/giang-vien/ta-hoang-minh" href="/giang-vien/ta-hoang-minh">
                                            <img src="https://techkids.vn/photos/MinhTaHoang_1485066540993.jpg">
                                        </a>
                                        <h5><a ng-href="/giang-vien/ta-hoang-minh" class="ng-binding" href="/giang-vien/ta-hoang-minh">Tạ Hoàng Minh</a></h5>
                                        <p ng-bind-html="item.job" class="ng-binding"><div>Director at FLY TECHNOLOGY DEVELOPMENT JSC</div></p>
                                    </div></div></div><ul class="slick-dots" style="display: block;"><li class=""><button type="button" data-role="none">1</button></li><li><button type="button" data-role="none">2</button></li><li><button type="button" data-role="none">3</button></li><li class="slick-active"><button type="button" data-role="none">4</button></li><li><button type="button" data-role="none">5</button></li></ul></slick>
                    </ul>
                    <a id="prev-slick" class="left carousel-control" style="display: block;"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span>
                    </a>
                    <a id="next-slick" class="right carousel-control" style="display: block;"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span>
                    </a>
                </div>
                <!-- Indicators-->
            </div>
        </section>
        <section id="partners" class="partners_1 linear_bg ng-scope">
            <div class="container">
                <h3 class="block_title text-center">BÁO CHÍ NÓI VỀ CHÚNG TÔI</h3>
                <div class="video pc">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>
                                VTV2
                                Nhịp sống Công Nghệ
                            </h3>
                            <iframe width="300" height="200" src="https://www.youtube.com/embed/gkJxOKKYeLU" frameborder="0" allowfullscreen=""></iframe>
                        </div>
                        <div class="col-md-4">
                            <h3>
                                VTV1
                                Thời sự
                            </h3>
                            <iframe width="300" height="200" src="https://www.youtube.com/embed/cVs-wqwCoQ8" frameborder="0" allowfullscreen=""></iframe>
                        </div>
                        <div class="col-md-4">
                            <h3>
                                VTC10
                                Hành trình tri thức việt
                            </h3>
                            <iframe width="300" height="200" src="https://www.youtube.com/embed/AnxGPsSmFac" frameborder="0" allowfullscreen=""></iframe>
                        </div>
                    </div>
                </div>
                <div class="video mb">
                    <div class="row">
                        <div id="video-slide" data-ride="carousel" class="carousel slide">
                            <!-- Indicators-->
                            <ol class="carousel-indicators">
                                <li data-target="#video-slide" data-slide-to="0" class="active"></li>
                                <li data-target="#video-slide" data-slide-to="1" class=""></li>
                                <li data-target="#video-slide" data-slide-to="2" class=""></li>
                            </ol>
                            <div role="listbox" class="carousel-inner">
                                <div class="item active">
                                    <h3>
                                        VTV2
                                        Nhịp sống Công Nghệ
                                    </h3>
                                    <iframe width="300" height="200" src="https://www.youtube.com/embed/gkJxOKKYeLU" frameborder="0" allowfullscreen=""></iframe>
                                </div>
                                <div class="item">
                                    <h3>
                                        VTV1
                                        Thời sự
                                    </h3>
                                    <iframe width="300" height="200" src="https://www.youtube.com/embed/cVs-wqwCoQ8" frameborder="0" allowfullscreen=""></iframe>
                                </div>
                                <div class="item">
                                    <h3>
                                        VTC10
                                        Hành trình tri thức việt
                                    </h3>
                                    <iframe width="300" height="200" src="https://www.youtube.com/embed/AnxGPsSmFac" frameborder="0" allowfullscreen=""></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="join_us" class="join_us stars join_us_5 ng-scope">
            <div class="container">
                <h3 class="section_title bg_title text-center col-sm-5 col-xs-9">PROJECT CUỐI KHÓA</h3>
                <div class="row">
                    <div class="">
                        <ul style="padding-left: 0px;">
                            <slick slides-to-show="3" slides-to-scroll="3" init-onload="true" next-arrow="#next-slick-2" prev-arrow="#prev-slick-2" responsive="slick.breakpoints" data="instructors" class="portfolio-silde ng-isolate-scope slick-initialized slick-slider"><div class="slick-list draggable" tabindex="0"><div class="slick-track" style="opacity: 1; width: 3888px; transform: translate3d(-972px, 0px, 0px);"><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="-3">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    BRAIN MASTER
                                                </h3>
                                                <p class="ng-binding">Huỳnh Hà, Khắc Kiên, Nam Hải Android Gen 5</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/f29ECXWJoYQ" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/f29ECXWJoYQ"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="-2">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    FREE COMIC
                                                </h3>
                                                <p class="ng-binding">Sơn Vũ, Hải Hoàng, Đình Cảnh</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/3YQGLpZWx1o" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/3YQGLpZWx1o"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="-1">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    RMOVIE
                                                </h3>
                                                <p class="ng-binding">Quang Trung, Hoàng Hiệp, Thanh Hải</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/SrlCe4-XsFQ" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/SrlCe4-XsFQ"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-active" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="0">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    30 SHINE
                                                </h3>
                                                <p class="ng-binding">Nguyễn Sơn Vũ - IOS gen 3</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/TbVzVoqBtGk" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/TbVzVoqBtGk"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-active" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="1">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    GMAT LEARNING
                                                </h3>
                                                <p class="ng-binding">Đỗ Ngọc Trình - IOS gen 3</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/TOSs_LzK3Ow" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/TOSs_LzK3Ow"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-active" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="2">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    SEOV
                                                </h3>
                                                <p class="ng-binding">Đoàn Nguyễn Hải Hoàng Web 2</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/Md-OJ8oJtBw" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/Md-OJ8oJtBw"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="3">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    BRAIN MASTER
                                                </h3>
                                                <p class="ng-binding">Huỳnh Hà, Khắc Kiên, Nam Hải Android Gen 5</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/f29ECXWJoYQ" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/f29ECXWJoYQ"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="4">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    FREE COMIC
                                                </h3>
                                                <p class="ng-binding">Sơn Vũ, Hải Hoàng, Đình Cảnh</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/3YQGLpZWx1o" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/3YQGLpZWx1o"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="5">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    RMOVIE
                                                </h3>
                                                <p class="ng-binding">Quang Trung, Hoàng Hiệp, Thanh Hải</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/SrlCe4-XsFQ" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/SrlCe4-XsFQ"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="6">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    30 SHINE
                                                </h3>
                                                <p class="ng-binding">Nguyễn Sơn Vũ - IOS gen 3</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/TbVzVoqBtGk" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/TbVzVoqBtGk"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="7">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    GMAT LEARNING
                                                </h3>
                                                <p class="ng-binding">Đỗ Ngọc Trình - IOS gen 3</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/TOSs_LzK3Ow" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/TOSs_LzK3Ow"></iframe>
                                            </div>
                                        </div><div class="ng-scope slick-slide slick-cloned" ng-repeat="item in portfolios" style="width: 324px;" data-slick-index="8">
                                            <div class="item active">
                                                <h3 class="ng-binding">
                                                    SEOV
                                                </h3>
                                                <p class="ng-binding">Đoàn Nguyễn Hải Hoàng Web 2</p>
                                                <iframe width="300" height="200" ng-src="https://www.youtube.com/embed/Md-OJ8oJtBw" frameborder="0" allowfullscreen="" src="https://www.youtube.com/embed/Md-OJ8oJtBw"></iframe>
                                            </div>
                                        </div></div></div><ul class="slick-dots" style="display: block;"><li class="slick-active"><button type="button" data-role="none">1</button></li><li><button type="button" data-role="none">2</button></li></ul></slick>
                        </ul>
                        <a id="prev-slick-2" class="left carousel-control" style="display: block;"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span> </a>
                        <a id="next-slick-2" class="right carousel-control" style="display: block;"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span> </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
@stop
