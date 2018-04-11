@extends('layouts.app')

@section('title','Quản lý nhân sự')

@section('content')
    <div ng-app="roleApp">
        <div class="manage-nav" ng-controller="NavController">
            <ul class="manage-nav-list">
                <a href="#/">
                    <li ng-class="{'active': $route.current.activetab == 'nhanviens'}" class="manage-nav-tab-btn">
                        <span>Nhân viên</span>
                    </li>
                </a>

                <a href="#/chuc-vu">
                    <li ng-class="{'active': $route.current.activetab == 'chucvus'}" class="manage-nav-tab-btn">
                        <span>Chức vụ</span>
                    </li>
                </a>
            </ul>
        </div>
        <loading></loading>
        <div ng-view="" ng-show="!isRouteLoading"></div>

    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.7/angular-route.min.js"></script>

    
    <script src="{{url('angularjs/common/env.js')}}"></script>

    <script src="{{url('angularjs/role/app.js')}}"></script>

    <script src="{{url('angularjs/role/controllers/StaffListController.js')}}"></script>
    <script src="{{url('angularjs/role/controllers/RoleListController.js')}}"></script>
    <script src="{{url('angularjs/role/controllers/RoleEditController.js')}}"></script>
    <script src="{{url('angularjs/role/controllers/NavController.js')}}"></script>
    <script src="{{url('angularjs/role/controllers/AddStaffController.js')}}"></script>

    <script src="{{url('angularjs/role/directives/staffRow.js')}}"></script>
    <script src="{{url('angularjs/role/directives/loading.js')}}"></script>
    <script src="{{url('angularjs/role/directives/delete.js')}}"></script>

    <script src="{{url('angularjs/common/filters/pagination.js')}}"></script>

    <script src="{{url('Services')}}"></script>
    <script src="{{url('angularjs/role/services/RoleData.js')}}"></script>
    <script src="{{url('angularjs/role/services/TabData.js')}}"></script>

    <script>
        $(document).ready(function () {
            // Select - Single
            $('select:not([multiple])').material_select();
        });
    </script>
@endsection