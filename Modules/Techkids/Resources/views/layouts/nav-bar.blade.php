<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png" href="http://up-co.vn/wp-content/uploads/2016/06/384x176logo_03.png"
          cph-ssorder="0">
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta name="robots" content="noindex, nofollow">

    @yield("meta")



    {{--<link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/paper-kit.css" rel="stylesheet"/>--}}
    {{--<link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/demo.css" rel="stylesheet"/>--}}

    <!--     Fonts and icons     -->
    {{--<link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>--}}
    {{--<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">--}}
    {{--<link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">--}}

    <style>

    </style>
</head>
<body>
<navbar class="navbar"><nav id="main_nav" class="navbar navbar-default navbar-fixed-top block nav_optional endblock">
        <nav class="navbar navbar-inverse navbar_secondary hidden-xs">
            <div class="container">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/">TRANG CHỦ</a></li>
                    <li>
                        <a href="/ve-chung-toi">VỀ CHÚNG TÔI</a>
                    </li>
                    <li><a href="/tuyen-dung">TUYỂN DỤNG</a></li>
                    <li><a href="/lien-he">LIÊN HỆ</a></li>
                    <li></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display-->
            <div class="navbar-header">
                <button type="button" ng-click="isCollapsed = !isCollapsed" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand"><img width="180" src="http://sv1.upsieutoc.com/2018/04/15/TechkidBrandColor.png" alt="TechKids"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling-->
            <div uib-collapse="isCollapsed" class="navbar-collapse collapse" aria-expanded="false" aria-hidden="true" style="height: 0px;">
                <ul class="nav navbar-nav navbar-right">

                    <li class="dropdown" uib-dropdown="">
                        <a href="/khoa-hoc-lap-trinh">
                            <div style="display: inline-block">
                                Các Khóa Học
                            </div>
                            <button type="button" class="none-btn dropdown-toggle" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false">
                                <span class="visible-xs-inline-block caret"></span>
                            </button>
                        </a>
                        <ul class="dropdown-menu" uib-dropdown-menu="" role="menu" aria-labelledby="split-button">
                            <!-- ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0" style="">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/hoc-lap-trinh-cap-ba-code-for-teen" ng-if="item.name.indexOf('Code') != -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Code for Teen</a><!-- end ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/code-intensive" ng-if="item.name.indexOf('Code') != -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Code Intensive</a><!-- end ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/code-for-everyone" ng-if="item.name.indexOf('Code') != -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Code for Everyone</a><!-- end ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/react-native" ng-if="item.name.indexOf('Code') == -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Lập Trình
                                    React Native</a><!-- end ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/android" ng-if="item.name.indexOf('Code') == -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Lập Trình
                                    Android</a><!-- end ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/web-fullstack" ng-if="item.name.indexOf('Code') == -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Lập Trình
                                    Web Fullstack</a><!-- end ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage --><a ng-href="https://techkids.edu.vn" target="_self" ng-if="item.isLandingPage" class="ng-binding ng-scope" href="https://techkids.edu.vn">Code for Kids</a><!-- end ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses --><li ng-repeat="item in courses" ng-click="isCollapsed = !isCollapsed" class="ng-scope" role="button" tabindex="0">
                                <!-- ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage --><a href="/khoa-hoc-lap-trinh/game" ng-if="item.name.indexOf('Code') == -1 &amp;&amp; !item.isLandingPage" class="ng-binding ng-scope">Lập Trình
                                    Game</a><!-- end ngIf: item.name.indexOf('Code') == -1 && !item.isLandingPage -->
                                <!-- ngIf: item.name.indexOf('Code') != -1 && !item.isLandingPage -->
                                <!-- ngIf: item.isLandingPage -->
                            </li><!-- end ngRepeat: item in courses -->
                        </ul>
                    </li>

                    <li class="dropdown">
                        <a href="/portfolio" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">
                            Project cuối khóa
                        </a>
                    </li>
                    <li class="dropdown">
                        <a href="/hoc-vien" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">
                            Học viên TechKids
                        </a>
                    </li>
                    <li class="dropdown">
                        <a href="/blogs" target="_self" class="dropdown-toggle">
                            Blog công nghệ
                        </a>
                    </li>
                </ul>
                <div class="visible-xs-block">
                    <form role="search" class="navbar-form navbar-right visible-xs-block ng-pristine ng-valid">
                        <div class="form-group">
                            <input type="text" placeholder="Search" class="form-control">
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/">TRANG CHỦ</a></li>
                        <li><a href="/tuyen-dung">Tuyển dụng</a></li>
                        <li><a href="/ve-chung-toi">VỀ CHÚNG TÔI</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</navbar>
</body>
</html>