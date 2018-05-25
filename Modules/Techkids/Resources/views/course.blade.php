@extends('techkids::layouts.master')

@section('content')
<div ng-view="" class="ng-scope"><!-- ngIf: type == 'list' -->

    <!-- ngIf: type != 'list' --><div ng-if="type != 'list'" class="ng-scope">
        <section id="page_title" class="page_title course_bg web_bg" style="background: url(http://techkids.vn/images/students-and-laptops.jpg); background-size: cover">
            <div class="container">
                <div class="course_info">
                    <div class="fade_up">
                        <h1 class="section_subtitle">Khóa học</h1>
                        <!-- ngIf: data.name.indexOf('Code') == -1 -->
                        <!-- ngIf: data.name.indexOf('Code') != -1 --><h1 class="section_title ng-binding ng-scope" ng-if="data.name.indexOf('Code') != -1">Code for Everyone</h1><!-- end ngIf: data.name.indexOf('Code') != -1 -->
    
                        <p ng-bind-html="data.title" class="ng-binding"><div>Khóa học lập trình cơ bản cho người lớn tại Hà Nội<br><strong>Tất cả mọi người nên học Lập trình, bởi Lập trình dạy bạn cách tư duy</strong></div></p><a ng-href="/khoa-hoc-lap-trinh/code-for-everyone/register" class="btn btn-orange" href="/khoa-hoc-lap-trinh/code-for-everyone/register">Đăng kí học</a>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container page_content">
                <h3 class="section_title_2">Thông tin chi tiết</h3>
                <article class="row">
                    <div class="col-md-8">
                        <div>
                            <h2 class="border_title">Chương trình học cơ bản</h2>
                            <!-- ngIf: data.slug=='game' -->
    
                            <hr class="sub_divider">
                            <!-- ngRepeat: item in data.syllabus --><div ng-repeat="item in data.syllabus" class="ng-scope" style="">
                                <p class="info_section">
                                    <span class="border_title ng-binding">1</span><span class="border_title margin_tab ng-binding">Kiến thức cơ bản</span><span style="margin-left: 5px" class="ng-binding">(4 buổi)</span>
                                    <span class="pull-right"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#587dd0a7986d8fedfd9953c1"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span>
                                </p>
                                <hr class="sub_divider no_margin">
                                <div id="587dd0a7986d8fedfd9953c1" class="panel-collapse collapse in" ng-class="{'in' : $first}">
                                    <div class="course_content">
                                        <!-- ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon --><span ng-if="child_item.icon" class="ng-scope"><div class="icon_circle"><i aria-hidden="true" class="fa fa-magic"></i></div></span><!-- end ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Course introduction - Variables &amp; data types - Loop introduction
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#587dd0a7986d8fedfd9953c8"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="587dd0a7986d8fedfd9953c8" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>How computers see things like text, color or numbers<br>Loop introduction: How computer can keep doing a things for 5 times, 200 times or even forever</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                List introduction: How computers store alike stuff
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="587dd0a7986d8fedfd9953c7" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Dictionary introduction: How computers store complex data like your contact information, a retaurant menu or your friend list
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="587dd0a7986d8fedfd9953c6" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Function: Devide and conquer, how to break down things to scale your program
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="587dd0a7986d8fedfd9953c5" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon --><span ng-if="child_item.icon" class="ng-scope"><div class="icon_circle"><i aria-hidden="true" class="fa fa-gamepad"></i></div></span><!-- end ngIf: child_item.icon -->
                                            <!-- ngIf: !$last -->
                                            <div id="587dd0a7986d8fedfd9953c3" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last --><p ng-if="$last" class="ng-binding ng-scope">
                                                Phương pháp: Gamification kết hợp học theo Case study
                                                <!-- ngIf: item.link -->
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info -->
                                    </div>
                                </div>
                                <hr class="sub_divider no_margin">
                            </div><!-- end ngRepeat: item in data.syllabus --><div ng-repeat="item in data.syllabus" class="ng-scope">
                                <p class="info_section">
                                    <span class="border_title ng-binding">2</span><span class="border_title margin_tab ng-binding">Tools</span><span style="margin-left: 5px" class="ng-binding">(2 buổi)</span>
                                    <span class="pull-right"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#59c8c1a384a0bc440e94fd1a"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span>
                                </p>
                                <hr class="sub_divider no_margin">
                                <div id="59c8c1a384a0bc440e94fd1a" class="panel-collapse collapse" ng-class="{'in' : $first}">
                                    <div class="course_content">
                                        <!-- ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Webscraping: Scrape a financial data page and/or a music page
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="59c8c1a384a0bc440e94fd1c" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last -->
                                            <div id="59c8c1a384a0bc440e94fd1b" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last --><p ng-if="$last" class="ng-binding ng-scope">
                                                Email automation
                                                <!-- ngIf: item.link -->
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info -->
                                    </div>
                                </div>
                                <hr class="sub_divider no_margin">
                            </div><!-- end ngRepeat: item in data.syllabus --><div ng-repeat="item in data.syllabus" class="ng-scope">
                                <p class="info_section">
                                    <span class="border_title ng-binding">3</span><span class="border_title margin_tab ng-binding">Web Development</span><span style="margin-left: 5px" class="ng-binding">(9 buổi)</span>
                                    <span class="pull-right"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86eeb"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span>
                                </p>
                                <hr class="sub_divider no_margin">
                                <div id="594a9fe8a78e19cb86f86eeb" class="panel-collapse collapse" ng-class="{'in' : $first}">
                                    <div class="course_content">
                                        <!-- ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Web Development introduction
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86ef1"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86ef1" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>Web Development introduction<br>Setup your first web project, run your first simple website: Hello world<br>Learn how a website interpret URL and its parts, for example: https://www.google.com.vn/?q=techkidsvn</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Template rendering
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86ef0"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86ef0" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>GET, POST, Jinja 2: Learn how data is exchanged between the brower and your website<br>Create simple sites for both normal users and admin</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                HTML
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86eef"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86eef" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>Learn how to represent and orgnize your website content</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                CSS
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86eee"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86eee" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>Learn how to make your website content look terrific</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Database
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86eed"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86eed" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>Learn how a website stores information like blog post, shopping item, user profile</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Deployment - Idea Pitching
                                                <!-- ngIf: child_item.list --><span class="pull-right ng-scope" ng-if="child_item.list"><button class="none-btn" data-toggle="collapse" data-parent="#accordion" href="#594a9fe8a78e19cb86f86eec"><i aria-hidden="true" class="fa fa-chevron-circle-down"></i></button></span><!-- end ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="594a9fe8a78e19cb86f86eec" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"><div>Deployment: Go live<br>Idea pitching: Present your website ideas and build your team to start your project</div></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last --><p class="ng-binding ng-scope" ng-if="!$last">
                                                Web Hackathon
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: !$last -->
                                            <div id="59c8c1a384a0bc440e94fd19" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info --><div ng-repeat="child_item in item.info" class="ng-scope">
                                            <!-- ngIf: child_item.icon -->
                                            <!-- ngIf: !$last -->
                                            <div id="59c8c1a384a0bc440e94fd18" class="panel-collapse collapse">
                                                <p class="collapse-child-item ng-binding" ng-bind-html="child_item.list"></p>
                                            </div>
                                            <!-- ngIf: $last --><p ng-if="$last" class="ng-binding ng-scope">
                                                Web project presentation
                                                <!-- ngIf: item.link -->
                                                <!-- ngIf: child_item.list -->
                                            </p><!-- end ngIf: $last -->
                                        </div><!-- end ngRepeat: child_item in item.info -->
                                    </div>
                                </div>
                                <hr class="sub_divider no_margin">
                            </div><!-- end ngRepeat: item in data.syllabus -->
    
                        </div>
    
                        <div class="item_content fr-view ng-binding" ng-bind-html="data.content | trustedBind"><h2><strong>Điểm khác biệt ở Techkids</strong></h2><p><br></p><p>– Được định hướng, tư vấn và giúp đỡ trọn đời về Lập trình và Công nghệ. Cafe với TechKids bất cứ lúc nào bạn muốn!<br>– Được tham gia vào cộng đồng TechKids với những con người tài năng nhất trong tất cả các lĩnh vực: Lập trình, Marketing, Du học, Kinh doanh,… (TechKids trực thuộc cộng đồng ILIAT School)<br>– Đặc biệt lớp học Code for everyone là tập hợp của rất nhiều thành phần “bất hảo” có tiếng như Marketing Manager của các công ty công nghệ, Founder Techstartup, những bạn sinh viên tài năng,<br>– Sử dụng Ngôn ngữ lập trình Python: ngôn ngữ nhanh, mạnh, hiệu quả, cực kỳ linh hoạt, đặc biệt thích hợp với những người bắt đầu học Lập trình. Python là ngôn ngữ được sử dụng phổ biến tại Google, Microsoft, IBM, Quora,…và đặc biệt được coi là “ngôn ngữ dành cho khởi nghiệp” tại trung tâm công nghệ cao của thế giới – Silicon Valley.</p><p><br></p><p><br></p><h2><strong>Làm thế nào để vào học?</strong></h2><p><br></p><p>VÒNG 1: Đăng ký online<br>VÒNG 2: Phỏng vấn và test để kiểm tra tư duy logic và khả năng tiếp thu của mọi người<br><br>- Dành cho: <strong>Sinh viên, người đi làm</strong> không có nền tảng về CNTT nhưng có định hướng công việc liên quan đến Công nghệ: làm việc cho các công ty/dự án về Công nghệ hoặc khởi nghiệp trong lĩnh vực này (Marketer, Co-founder, Salesman,…), đặc biệt làm việc nhiều với developers team.<br>– Các bạn làm việc liên quan đến ngành Tài chính – Ngân hàng, Kế toán – Kiểm toán phải làm việc với nhiều công cụ, dữ liệu, con số.<br>– Có thái độ học tập nghiêm túc, cầu tiến. Có thể dành ra ít nhất 2-3 tiếng/ngày để Lập trình trong vòng ít nhất 2 tháng khóa học.</p><p><strong><em>Lưu ý: Khóa học này được thiết kế để phù hợp với sinh viên, người đi làm. Các bạn học sinh cấp 3 muốn trải nghiệm và học lập trình, đặc biệt là các công nghệ mới hãy xem qua khóa học: Code for Teen</em></strong>
    <a href="https://techkids.vn/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen">tại đây</a></p><p><br></p><h4><span style="color: rgb(44, 130, 201);"><strong>Đặc biệt: Đăng ký combo học</strong></span></h4><h4 dir="ltr"><span style="color: rgb(44, 130, 201);">Code Intensive by Java OOP + 1 khóa nâng cao (Android/Web/ React Native): Còn 6 triệu 9, Giảm 1 triệu 8</span></h4><h4 dir="ltr"><span style="color: rgb(44, 130, 201);">Code for Everyone + Code Intensive by Java OOP + 1 khóa nâng cao (Android/Web/ React Native): Còn 8 triệu 6, Giảm 3 triệu 6</span></h4><p><strong>Cho phép đóng học phí thành nhiều lần, ưu tiên các bạn có hoàn cảnh khó khăn&nbsp;</strong></p><h4><br></h4><p><img src="https://techkids.vn/photos/pricetable_1516150958174.png" style="width: 416px; height: 163.93px;" class="fr-fic fr-dib" data-code="1" data-message="upload success"></p><h2><br></h2><h2><strong>Lời gửi gắm đến những lập trình viên tài năng</strong></h2><p><br></p><p>"Giáo dục và Công nghệ là một trong 2 hướng đi của cả thế giới trong những năm gần đây bởi sức mạnh kiến tạo tương lai của nó. Đó là lý do chúng tôi đã bắt đầu cuộc hành trình của mình với ILIAT School hơn 1 năm trước đây, cộng đồng lớn nhất Hà Nội về Kinh doanh – Kinh tế với 1200+ thành viên cực kỳ tài năng<br>Và giờ là lúc chúng tôi bắt đầu với các bạn, những Lập trình viên tương lai."<br>Chúng tôi tin các bạn, nếu được truyền cảm hứng nhiều hơn, trau dồi nhiều hơn, đam mê và nỗ lực nhiều hơn thì các bạn sẽ làm được những điều thật sự khác biệt! Và chúng tôi hứa, sẽ đồng hành với bạn trong cuộc hành trình đầy thử thách này.</p></div>
    
    
                        <div class="text-center"><a ng-href="/khoa-hoc-lap-trinh/code-for-everyone/register" class="btn btn-orange" href="/khoa-hoc-lap-trinh/code-for-everyone/register">Đăng kí học</a></div>
                    </div>
                    <aside class="course_summary fly_right_md col-md-4">
                        <div class="item">
                            <h2 class="border_title">Khóa học tiếp theo</h2>
                            <hr class="sub_divider">
                            <p>Chúng tôi không chỉ dạy về lập trình</p>
                            <p>Chúng tôi mong muốn tạo ra thế hệ Lập trình viên xuất sắc!</p>
                            <hr class="sub_divider">
                            <p>Lịch khai giảng:<span class="pull-right ng-binding">20/05/2018</span>
                            </p>
                            <hr class="sub_divider">
                            <p> Thời gian học:
                            </p><div class="ng-binding">Tối thứ 5, chiều CN (7.15 - 10.15pm)</div>
                            <p></p>
                            <hr class="sub_divider">
                            <p> Thời lượng học:
                            </p><div class="ng-binding">2 tháng. 2 buổi học chính/tuần</div>
                            <p></p>
                            <hr class="sub_divider">
                            <p> 3 Học bổng tài năng:<span class="pull-right ng-binding">5-10%</span></p>
                            <hr class="sub_divider">
                            <p>Học phí: </p>
                            <p style="text-align:center; font-size:30px" class="price_tag border_title ng-binding">
                                3.500.000<sup>đ</sup></p>
                        </div>
                        <div class="item pc">
                            <h2 class="border_title">Giảng viên</h2>
                            <hr class="sub_divider">
                            <ul class="users_list">
                                <!-- ngRepeat: item in data.instructor --><li ng-repeat="item in data.instructor" class="ng-scope" style="">
                                    <div class="user_thumbnail"><a href="/giang-vien/nguyen-quang-huy"><img src="https://techkids.vn/photos/quanghuy_1485066555926.jpg"></a></div>
                                    <h5><a href="/giang-vien/nguyen-quang-huy" class="ng-binding">Nguyễn Quang Huy</a></h5>
                                    <p ng-bind-html="item.job" class="ng-binding"><div>Giám đốc học vụ và giảng viên toàn thời gian tại TechKids</div><div>Kỹ sư lập trình nhúng tại FPT Software cho thị trường Mỹ</div><div><br></div></p>
                                </li><!-- end ngRepeat: item in data.instructor --><li ng-repeat="item in data.instructor" class="ng-scope">
                                    <div class="user_thumbnail"><a href="/giang-vien/huynh-tuan-anh"><img src="https://techkids.vn/photos/huynh-tuan-anh_1519684570196.jpg"></a></div>
                                    <h5><a href="/giang-vien/huynh-tuan-anh" class="ng-binding">Huỳnh Tuấn Anh</a></h5>
                                    <p ng-bind-html="item.job" class="ng-binding"><div>Full-stack Web Developer tại Techkids Software<br>1 trong những giảng viên được yêu quý nhất tại Techkids</div></p>
                                </li><!-- end ngRepeat: item in data.instructor -->
                            </ul>
                        </div>
                        <div class="item mb">
                            <h2 class="border_title">Giảng viên</h2>
                            <hr class="sub_divider">
                            <div class="row">
                                <div id="course-slide" data-ride="carousel" class="carousel slide">
                                    <!-- Indicators-->
                                    <ol class="carousel-indicators">
                                        <!-- ngRepeat: item in data.instructor --><li ng-repeat="item in data.instructor" data-target="#course-slide" data-slide-to="0" ng-class="{'active': $first}" class="ng-scope active" style=""></li><!-- end ngRepeat: item in data.instructor --><li ng-repeat="item in data.instructor" data-target="#course-slide" data-slide-to="1" ng-class="{'active': $first}" class="ng-scope" style=""></li><!-- end ngRepeat: item in data.instructor -->
                                    </ol>
                                    <div role="listbox" class="carousel-inner">
                                        <!-- ngRepeat: item in data.instructor --><div ng-repeat="item in data.instructor" class="item ng-scope active" ng-class="{'active': $first}" style="">
                                            <div class="user_thumbnail"><a href="/giang-vien/nguyen-quang-huy"><img src="https://techkids.vn/photos/quanghuy_1485066555926.jpg"></a></div>
                                            <h5><a href="/giang-vien/nguyen-quang-huy" class="ng-binding">Nguyễn Quang Huy</a></h5>
                                            <p ng-bind-html="item.job" class="ng-binding"><div>Giám đốc học vụ và giảng viên toàn thời gian tại TechKids</div><div>Kỹ sư lập trình nhúng tại FPT Software cho thị trường Mỹ</div><div><br></div></p>
                                        </div><!-- end ngRepeat: item in data.instructor --><div ng-repeat="item in data.instructor" class="item ng-scope" ng-class="{'active': $first}" style="">
                                            <div class="user_thumbnail"><a href="/giang-vien/huynh-tuan-anh"><img src="https://techkids.vn/photos/huynh-tuan-anh_1519684570196.jpg"></a></div>
                                            <h5><a href="/giang-vien/huynh-tuan-anh" class="ng-binding">Huỳnh Tuấn Anh</a></h5>
                                            <p ng-bind-html="item.job" class="ng-binding"><div>Full-stack Web Developer tại Techkids Software<br>1 trong những giảng viên được yêu quý nhất tại Techkids</div></p>
                                        </div><!-- end ngRepeat: item in data.instructor -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <h2 class="border_title">Cảm nhận</h2>
                            <hr class="sub_divider">
                            <ul class="users_list">
                                <!-- ngRepeat: item in data.feedback --><li ng-repeat="item in data.feedback" class="ng-scope" style="">
                                    <div class="user_thumbnail"><a ng-href="/hoc-vien/minh-tien" href="/hoc-vien/minh-tien"><img src="https://techkids.vn/photos/minh_tien_1486960664334.png"></a></div>
                                    <h5><a href="/hoc-vien/minh-tien" class="ng-binding">Minh Tiến</a></h5>
                                    <p class="ng-binding">"Các thầy giáo và trợ giảng dạy thực sự rất thông minh, lớp rất vui và ngồi code thâu đêm thì cực kỳ sướng :)))))))))"</p>
                                </li><!-- end ngRepeat: item in data.feedback --><li ng-repeat="item in data.feedback" class="ng-scope">
                                    <div class="user_thumbnail"><a ng-href="/hoc-vien/chau-duong-ufo" href="/hoc-vien/chau-duong-ufo"><img src="https://techkids.vn/photos/Ufo_1486961583341.png"></a></div>
                                    <h5><a href="/hoc-vien/chau-duong-ufo" class="ng-binding">Châu Dương Ufo</a></h5>
                                    <p class="ng-binding">"Ufo học hỏi được rất nhiều từ cả giảng viên, nhân viên, lẫn học viên. Vẫn còn nhớ có lần ốm k0 đến lớp đc, mọi người réo rắt gọi đt hỏi thăm sao k0 đi học"</p>
                                </li><!-- end ngRepeat: item in data.feedback --><li ng-repeat="item in data.feedback" class="ng-scope">
                                    <div class="user_thumbnail"><a ng-href="/hoc-vien/hoa-khanh" href="/hoc-vien/hoa-khanh"><img src="https://techkids.vn/photos/hoa_khanh_1486962004259.png"></a></div>
                                    <h5><a href="/hoc-vien/hoa-khanh" class="ng-binding">Hòa Khanh</a></h5>
                                    <p class="ng-binding">"Khóa học này đã cung cấp cho mình những khái niệm cơ bản về coding và quy trình phát triển phần mềm, rất hữu ích với định hướng công việc sắp tới của mình"</p>
                                </li><!-- end ngRepeat: item in data.feedback -->
                                <div class="text-center"><a href="/hoc-vien" class="btn btn-orange sm_btn">Xem thêm</a>
                                </div>
                            </ul>
                        </div>
                        <div class="item">
                            <h2 class="border_title">Khoảnh khắc</h2>
                            <hr class="sub_divider">
                            <div class="img_list">
                                <!-- ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope" style="">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/images/1.jpg" src="https://techkids.vn/images/1.jpg">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/images/4.JPG" src="https://techkids.vn/images/4.JPG">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/photos/anh-1_1512116702606.png" src="https://techkids.vn/photos/anh-1_1512116702606.png">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/photos/anh-3_1512116707450.png" src="https://techkids.vn/photos/anh-3_1512116707450.png">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/photos/anh-2_1512116699364.png" src="https://techkids.vn/photos/anh-2_1512116699364.png">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/photos/IMG_7945_1512231049674.jpg" src="https://techkids.vn/photos/IMG_7945_1512231049674.jpg">
                                </a><!-- end ngRepeat: img in slide --><a ng-repeat="img in slide" ng-click="openLightboxModal($index)" class="ng-scope">
                                    <img class="portrait_demo_pic" ng-src="https://techkids.vn/photos/IMG_0131_1512231702129.jpg" src="https://techkids.vn/photos/IMG_0131_1512231702129.jpg">
                                </a><!-- end ngRepeat: img in slide -->
                            </div>
                        </div>
                    </aside>
                </article>
            </div>
        </section>
    </div><!-- end ngIf: type != 'list' -->
    
    </div>
@stop
