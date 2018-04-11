<html lang="vi" ng-app="StudentApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Angular Material style sheet -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo url('css/student.css') ?>">
    <title>colorME</title>
    <style>
        #main-nav {
            background: url('img/banner.jpg') center/cover;
            height: 180px;
        }
        .navbar-default .navbar-nav>li>a {
            color: white;
        }
    </style>
</head>
<body>
<!-- Fixed navbar -->

<div class="container" ng-view>


</div> <!-- /container -->


<script src="<?php echo url('js/jquery-1.12.0.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo url('js/angular.min.js') ?>"></script>
<script src="<?php echo url('js/bootstrap.min.js') ?>"></script>
<script src="<?php echo url('js/angular-route.min.js') ?>"></script>

<script>
    angular.module('StudentApp', ['ngRoute'])
        .constant('baseURL', '<?php echo url('/') ?>' + '/');
    //.constant('baseURL', 'http://colorme.vn/')

</script>
<script src="<?php echo url('js/routes.js') ?>"></script>
<script src="<?php echo url('js/controllers/controller.js') ?>"></script>
</body>
</html>

<!--
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
-->