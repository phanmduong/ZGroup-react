<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Tạo landingpage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/landingpage-libs/" target="_blank">
    <!-- Loading Bootstrap -->
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <!-- Loading Flat UI -->
    <link href="css/flat-ui.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/spectrum.css" rel="stylesheet">
    <link href="css/chosen.css" rel="stylesheet">
    <link rel="shortcut icon" href="{{config("app.favicon")}}">
    <!-- Font Awesome -->
    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="js/redactor/redactor.css" rel="stylesheet">
    <link rel="stylesheet" href="css/pixicon.css">
    <script>
        var landingpage_id;
        var path_landingpage;
        var domain = "{{config("app.protocol").config("app.domain")}}"
        var token = localStorage.getItem('token');
        if (token == undefined || token == null || token == '') {
            window.open("{{config("app.protocol")."manage.".config("app.domain")}}/login", "_self");
        }
    </script>
    <style>
        label.error {
            color: red;
            font-weight: 200 !important;
        }
    </style>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.min.js"></script>

<script src="js/chosen.jquery.min.js"></script>
<script src="js/redactor/redactor.min.js"></script>
<script src="js/redactor/table.js"></script>
<script src="js/redactor/bufferButtons.js"></script>
<script src="js/src-min-noconflict/ace.js"></script>
<script src="elements.json"></script>
<script src="js/builder.js?123"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
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
        $('#imageFileField').on('change',function(evt) {
            if (evt.target.files[0] && evt.target.files[0].name.indexOf(" ")>0){
                $(this).val("");
                toastr.warning("Tên file không được rỗng");
            };
        });
        setTimeout(function () {
        }, 1000);
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.indexOf(" ") < 0 && value != "";
        }, "Vui lòng không nhập khổng trắng");
        jQuery.validator.addMethod("specialChars", function (value, element) {
            var regex = new RegExp("^[a-zA-Z0-9\.-]+$");
            var key = value;

            if (!regex.test(key)) {
                return false;
            }
            return true;
        }, "Vui lòng không nhập kí tự đặc biệt");
        $('#domain-landing-page').text(domain);
        $("#saveModal form").validate({
            rules: {
                name: "required",
            },
            messages: {
                name: "Vui lòng nhập tên landing page"
            }
        });
        $("#exportModal form").validate({
            rules: {
                link_landing_page: {
                    required: true,
                    noSpace: true,
                    specialChars: true
                }
            },
            messages: {
                link_landing_page: {
                    required: "Vui lòng nhập đường dẫn",
                }
            }
        });
        $("#exportSubmit").click(function () {
            if ($("#exportModal form").valid()) {
                $(this).html("<i class=\"fa fa-refresh fa-spin\"/> Đang xuất");
                uploadServer();
            }
        });

//        $("#savePage").click(function (e) {
//            if (pendingChanges) {
//                savePage(e);
//                var data = Object.assign({}, localStorage);
//                delete data.token;
//                delete data.user;
//                console.log(data);
//                console.log(JSON.stringify(data));
//                saveServer(JSON.stringify(data));
//                var sadsa = JSON.stringify(data);
//                console.log(JSON.parse(sadsa));
//            }
//        });


        $("#savePageModal").click(function (e) {
            if ($("#saveModal form").valid()) {
                $(this).html("<i class=\"fa fa-refresh fa-spin\"/> Đang lưu");
                $(this).addClass("disabled");
                savePage(e);
                var data = Object.assign({}, localStorage);
                delete data.token;
                delete data.user;
                saveServer(JSON.stringify(data), $("#landingpage_name").val());
            }
        })

    });

    function saveServer(data, name) {
        $.post("{{config("app.protocol")."manageapi.".config("app.domain")}}/build-landing-page/save?token=" + localStorage.getItem("token"), {
            content_landing_page: data,
            id: landingpage_id ? landingpage_id : '',
            path: path_landingpage ? path_landingpage : '',
            name: name
        }, function (data, status) {
            if (data.status === 1) {
                landingpage_id = data.data.id;
                toastr.success("Lưu thành công");
                $('#saveModal').modal('toggle');
            } else {
                toastr.error("Có lỗi xảy ra");
            }
            $("#savePageModal").html("<i class=\"pi pixicon-square-check\"></i> Lưu");
            $("#savePageModal").removeClass("disabled");
        });
    }

    function uploadServer() {
        $("#exportSubmit").addClass("disabled");
        var data = {};
        $("#exportModal").find("input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        console.log(data);
        $.post("{{config("app.protocol")."manageapi.".config("app.domain")}}/build-landing-page/export?token=" + localStorage.getItem("token"), data, function (data, status) {
            if (data.status === 1) {
                toastr.success("Xuất landing page thành công");
                $('#exportModal').modal('toggle');
                $("#exportModalSuccess").modal('show');
                $("#open-link-landingpage").attr("href", domain + "/landing-page/" + data.data.url);
                path_landingpage = data.data.url;
                $("#domain-landing-page-save").text(domain + "/landing-page/" + path_landingpage);
                $("#domain-landing-page-save").attr("href", domain + "/landing-page/" + path_landingpage);
            } else {
                toastr.error(data.message);
            }
            $("#exportSubmit").html("<i class=\"pi pixicon-download\"></i> Xuất");
            $("#exportSubmit").removeClass("disabled");
        });
        
    }
</script>
</body>
</html>
