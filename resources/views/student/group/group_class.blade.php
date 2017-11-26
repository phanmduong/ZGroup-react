@extends('layouts.public')

@section('title','colorME'.$class->course->name." ".$class->name)

@section('header','colorME'.$class->course->name." ".$class->name)

@section('content')
    <div ng-app="groupApp">
        <div class="group-cover"
             style="background-image:url('https://s3-ap-southeast-1.amazonaws.com/cmstorage/webs/cover.jpg')">
            <div class="overlay"></div>
            <div class="group-class-wrapper">
                <div class="container">
                    <img src="{{$class->course->icon_url}}" class="circle"
                         style="width: 55px;height:55px;float:left;margin-top:4px;margin-right:10px"/>
                    <div class="group-class-text">
                        <div class="group-class-name">
                            colorME {{$class->course->name}} {{$class->name}}
                        </div>
                        <div class="group-class-description">
                            {{$class->registers()->where('status',1)->count()}} Thành viên
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="newsfeed-filter" ng-controller="NavController">
            <ul id="newsfeed-filter-list">
                <a style="color: #888;" href="">
                    <li id="tab-1" class="tab-btn" ui-sref-active="tab-active"
                        style="border-right: 1px solid rgba(0,0,0,0.1)" ui-sref="topicList">
                        <span class="tab-text">Chủ đề</span>
                    </li>
                </a>
                <a style="color: #888;" href="">
                    <li id="tab-2" class="tab-btn" style="border-right: 1px solid rgba(0,0,0,0.1)" ui-sref="classInfo"
                        ui-sref-active="tab-active">
                        <span class="tab-text">Thông tin</span>
                    </li>
                </a>
                <a style="color: #888;" href="">
                    <li id="tab-3" class="tab-btn" ui-sref="members" ui-sref-active="tab-active">
                        <span class="tab-text">Thành viên</span>
                    </li>
                </a>
            </ul>
        </div>
        
        <div class="container">
            <h3 ng-hide="initLoad">Đang tải, bạn vui lòng chờ trong giây lát...</h3>
            <resolve-loader></resolve-loader>
            <div ui-view ng-hide="isStateLoading"></div>
        </div>
    
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="{{url('js/angular-ui-router.min.js')}}"></script>
    
    <script src="{{url('angularjs/common/env.js')}}"></script>
    <script>
        __env.classId = {{$class->id}};
        __env.totalStudents = {{$class->registers()->where('status',1)->count()}};
        __env.role = {{$user->role}};
        __env.token = '{{csrf_token()}}';
    </script>
    <script src="{{url('js/angular-datepicker.min.js')}}"></script>
    <script src="{{url('angularjs/group/app.js')}}"></script>
    
    <script src="{{url('angularjs/group/filters.js')}}"></script>
    
    <script src="{{url('angularjs/group/controllers/TopicListController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/ClassInfoController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/MembersController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/NavController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/AddTopicController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/SubmitController.js')}}"></script>
    <script src="{{url('angularjs/group/controllers/TopicController.js')}}"></script>
    
    <script src="{{url('angularjs/group/services/TopicData.js')}}"></script>
    <script src="{{url('Services')}}"></script>
    
    <script src="{{url('angularjs/group/directives/TopicItem.js')}}"></script>
    <script src="{{url('angularjs/group/directives/uploadItem.js')}}"></script>
    <script src="{{url('angularjs/group/directives/fileModel.js')}}"></script>
    <script src="{{url('angularjs/group/directives/resolveLoader.js')}}"></script>
    <script src="{{url('angularjs/group/directives/progressBar.js')}}"></script>
    <script src="{{url('angularjs/group/directives/productItem.js')}}"></script>
    @include('components.full_image_modal')
@endsection
