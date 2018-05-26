@extends('layouts.app')

@section('title','Đăng kí trực')

@section('content')
    <div ng-app="regisShiftApp">
        <div class="manage-nav">
            <ul class="manage-nav-list">
                <a>
                    <li ui-sref-active="active" ui-sref="shifts" style="width: 150px" class="manage-nav-tab-btn">
                        <span>Đăng kí trực</span>
                    </li>
                </a>
                <a>
                    <li ui-sref-active="active" ui-sref="progress" style="width: 150px" class="manage-nav-tab-btn">
                        <span>Thống kê trực</span>
                    </li>
                </a>
                <a>
                    <li ui-sref-active="active" ui-sref="shift-picks" style="width: 150px" class="manage-nav-tab-btn">
                        <span>Lịch sử đăng ký</span>
                    </li>
                </a>
            </ul>
        </div>
        <resolve-loader></resolve-loader>
        <div ui-view ng-hide="isStateLoading"></div>
        <h3 ng-hide="isStateLoading==true || isStateLoading==false">Đang tải dữ liệu...</h3>
    </div>

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="{{url('js/angular-ui-router.min.js')}}"></script>

    <script src="{{url('angularjs/common/env.js')}}"></script>
    <script>
        __env.user_id = {{$user->id}};
        var gens = '{!!  $gens!!}';
        __env.gens = JSON.parse(gens);

        __env.current_gen_id = {{$current_gen_id}};
    </script>
    <script src="{{url('angularjs/regisshift/app.js')}}"></script>

    <script src="{{url('angularjs/regisshift/controllers/ShiftListController.js')}}"></script>
    <script src="{{url('angularjs/regisshift/controllers/ProgressController.js')}}"></script>
    <script src="{{url('angularjs/regisshift/controllers/ShiftPickController.js')}}"></script>

    <script src="{{url('angularjs/regisshift/services/ShiftData.js')}}"></script>
    <script src="{{url('Services')}}"></script>

    <script src="{{url('angularjs/regisshift/directives/resolveLoader.js')}}"></script>



@endsection