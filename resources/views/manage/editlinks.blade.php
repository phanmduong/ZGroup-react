@extends('layouts.app')

@section('title','Thêm link')

@section('content')
    <h3 class="header">
        {{($isEdit)?"Sửa":"Thêm mới"}} link
    </h3>
    <div class="row">
        <form method="post" action="{{url('manage/storelink')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <input type="hidden" name="id" value="{{isset($link) ? $link->id : ''}}"/>
            <input type="hidden" id="course_id" name="course_id"
                   value="{{isset($link) ? $link->course_id : $course_id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="link_name" type="text" value="{{isset($link)? $link->link_name : ''}}"
                           class="validate">
                    <label for="link_name">Tên link</label>
                </div>
                <div class="input-field col s12">
                    <input id="description" name="link_url" type="text" value="{{isset($link) ? $link->link_url : ''}}"
                           class="validate">
                    <label for="link_description">Đường dẫn</label>
                </div>
                <div class="input-field col s12">
                    <textarea id="textarea1" name="link_description"
                              class="materialize-textarea">{{isset($link) ? $link->link_description : ''}}</textarea>
                    <label for="textarea1">Mô tả</label>
                </div>
                <div class="file-field input-field col s12">
                    <div class="btn">
                        <span>Upload</span>
                        <input name="link_icon" type="file" multiple>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Tải icon của link">
                    </div>
                </div>
                <div class="col s12" style="padding-top:20px">
                    <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                           id="submit"/>
                </div>
                @if($isEdit)
                    <div class="col s12" style="padding-top:20px">
                        <a href="{{url('manage/deletelink/'.$link->course_id.'/'.$link->id)}}" class="waves-effect
                    waves-light btn red darken-1" name="delete"
                           id="delete">Xóa link</a>
                    </div>

                @endif
            </div>
        </form>

    </div>
@endsection
