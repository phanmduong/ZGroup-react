@extends('layouts.app')

@section('title','Quản lý lịch trực')

@section('content')
    <div ng-app="shiftApp">
        <div class="manage-nav">
            <ul class="manage-nav-list">
                <a>
                    <li ui-sref-active="active" ui-sref="shiftSessions" style="width: 150px" class="manage-nav-tab-btn">
                        <span>Danh sách ca trực</span>
                    </li>
                </a>
                
                <a>
                    <li ui-sref-active="active" ui-sref="createShiftSession" class="manage-nav-tab-btn">
                        <span>Tạo ca trực</span>
                    </li>
                </a>
            </ul>
        </div>
        <resolve-loader></resolve-loader>
        <div ui-view ng-hide="isStateLoading"></div>
    </div>
    
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="{{url('js/angular-ui-router.min.js')}}"></script>
    
    
    <script src="{{url('angularjs/common/env.js')}}"></script>
    
    <script src="{{url('angularjs/shift/app.js')}}"></script>
    
    <script src="{{url('angularjs/shift/controllers/ShiftSessionController.js')}}"></script>
    <script src="{{url('angularjs/shift/controllers/CreateShiftSessionController.js')}}"></script>
    <script src="{{url('angularjs/shift/controllers/EditShiftSessionController.js')}}"></script>
    
    <script src="{{url('angularjs/shift/services/ShiftData.js')}}"></script>
    
    <script src="{{url('angularjs/shift/directives/resolveLoader.js')}}"></script>



@endsection