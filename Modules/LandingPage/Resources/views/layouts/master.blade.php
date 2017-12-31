<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Tạo landingpage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/landingpage-libs/" target="_blank">
    <!-- Loading Bootstrap -->
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet">
    <!-- Loading Flat UI -->
    <link href="css/flat-ui.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/spectrum.css" rel="stylesheet">
    <link href="css/chosen.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://keetool.s3.amazonaws.com/logo/logo.png">
    <!-- Font Awesome -->
    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="js/redactor/redactor.css" rel="stylesheet">
    <link rel="stylesheet" href="css/pixicon.css">
    <script>
        var landingpage_id;
        var path_landingpage;
        var token = localStorage.getItem('token');
        if (token == undefined || token == null || token == '') {
            window.open("{{config("app.protocol")."manage.".config("app.domain")}}/login", "_self");
        }
    </script>
</head>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<![endif]-->
</head>
<body>
<div id="loader">
    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513614828XX7yezVsBmicbFA.gif" alt="Loading..."
         style="width: 330px!important; height: auto!important;">
    <span>Loading FLATPACK Elements...</span>
    <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
</div>
@yield('content')
<div class="sandboxes" id="sandboxes" style="display: none"></div>

<!-- Load JS here for greater good =============================-->
<script src="js/jquery-1.8.3.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.ui.touch-punch.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-select.js"></script>
<script src="js/bootstrap-switch.js"></script>
<script src="js/flatui-checkbox.js"></script>
<script src="js/flatui-radio.js"></script>
<script src="js/jquery.tagsinput.js"></script>
<script src="js/flatui-fileinput.js"></script>
<script src="js/jquery.placeholder.js"></script>
<script src="js/jquery.zoomer.js"></script>
<script src="js/application.js"></script>
<script src="js/spectrum.js"></script>
<script src="js/chosen.jquery.min.js"></script>
<script src="js/redactor/redactor.min.js"></script>
<script src="js/redactor/table.js"></script>
<script src="js/redactor/bufferButtons.js"></script>
<script src="js/src-min-noconflict/ace.js"></script>
<script src="elements.json"></script>
<script src="js/builder.js"></script>
<script>
    $(function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        /*if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            $('.modes #modeContent').parent().hide();
        } else {
            $('.modes #modeContent').parent().show();
        }*/
    })


    $(document).ready(function () {
        $('#domain-landing-page').text(window.location.origin);
        $("#exportSubmit").click(function () {
            $(this).html("<i class=\"fa fa-refresh fa-spin\"/> Đang xuất");
            uploadServer();
        });

        $("#savePage").click(function (e) {
            if (pendingChanges) {
                savePage(e);
                var data = Object.assign({}, localStorage);
                delete data.token;
                delete data.user;
                console.log(data);
                console.log(JSON.stringify(data));
                saveServer(JSON.stringify(data));
                var sadsa = JSON.stringify(data);
                console.log(JSON.parse(sadsa));
            }
        });

    });

    function saveServer(data) {
        $.post("{{config("app.protocol")."manageapi.".config("app.domain")}}/build-landing-page/save?token=" + localStorage.getItem("token"), {
            content_landing_page: data,
            id: landingpage_id ? landingpage_id : '',
            path: path_landingpage ? path_landingpage : ''
        }, function (data, status) {
            if (data.status === 1) {
                landingpage_id = data.data.id;
            } else {
                console.log("Có lỗi xảy ra");
            }
            console.log(data);
        });
    }

    function uploadServer() {
        var data = {};
        $("#exportModal").find("input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        console.log(data);
        $.post("{{config("app.protocol")."manageapi.".config("app.domain")}}/build-landing-page/export?token=" + localStorage.getItem("token"), data, function (data, status) {
            $("#exportSubmit").html("<i class=\"pi pixicon-download\"></i> Xuất");
            $('#exportModal').modal('toggle');
            $("#exportModalSuccess").modal('show');
            $("#open-link-landingpage").attr("href", "{{ config("app.protocol") . config("app.domain") . "/landing-page/"}}" +data.data.url);
            path_landingpage = data.data.url;
        });
    }
</script>
</body>
</html>
