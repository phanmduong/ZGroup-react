@extends('layouts.app')

@section('title','Sửa môn học')

@section('content')
    <h3 class="header">
        {{($isEdit)? "Sửa" : "Thêm mới"}} môn học
    </h3>
    <div class="row">
        <form method="post" action="{{url('manage/storecourse')}}" enctype="multipart/form-data">
            {{csrf_field()}}
            <input type="hidden" name="id" value="{{$course->id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="name" type="text" value="{{$course->name}}" class="validate">
                    <label for="name">Tên môn</label>
                </div>
                <div class="input-field col s12">
                    <input id="description" name="description" type="text" value="{{$course->description}}"
                           class="validate">
                    <label for="description">Mô tả</label>
                </div>
                <div class="input-field col s12">
                    <input id="duration" name="duration" type="number"
                           value="{{$course->duration}}">
                    <label for="duration">Thời lượng </label>
                </div>
                <div class="input-field col s12">
                    <input id="price" name="price" type="number"
                           value="{{$course->price}}">
                    <label for="price">Giá</label>
                </div>
                <div class="col s12">
                    <label for="detail">
                        Chi tiết
                    </label>
                </div>
                <div class="input-field col s12">
                    <textarea name="detail" id="detail">{{$course->detail}}</textarea>
                </div>
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Image</span>
                            <input name="image" id="image" type="file"/>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" value="{{$course->image_name}}" type="text"/>
                        </div>
                    </div>
                    @if($isEdit)
                        <img src="{{$course->image_url}}" width="200"/>
                    @else
                        <img src="https://placehold.it/800x600" width="200"/>
                    @endif
                </div>

                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Icon</span>
                            <input name="icon" type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" value="{{$course->icon_name}}" type="text">
                        </div>
                    </div>
                    @if($isEdit)
                        <img src="{{$course->icon_url}}" height="200"/>
                    @else
                        <img src="https://placehold.it/200x200" height="200"/>
                    @endif
                </div>
                <div class="col s12">
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>Cover</span>
                            <input name="cover" type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" value="{{$course->cover_name}}" type="text">
                        </div>
                    </div>
                    @if($isEdit)
                        <img src="{{$course->cover_url}}" height="350"/>
                    @else
                        <img src="https://placehold.it/1130x350" height="350"/>
                    @endif
                </div>
                <div class="input-field col s12">
                    <input id="linkwindow" name="linkwindow" type="text"
                           value="{{$course->linkwindow}}">
                    <label for="linkwindow">Link tải phần mềm Window</label>
                </div>

                <div class="input-field col s12">
                    <input id="window_how_install" name="window_how_install" type="text"
                           value="{{$course->window_how_install}}">
                    <label for="window_how_install">Link hướng dẫn cài phần mềm window</label>
                </div>

                <div class="input-field col s12">
                    <input id="linkmac" name="linkmac" type="text"
                           value="{{$course->linkmac}}">
                    <label for="linkmac">Link tải phần mềm Mac</label>
                </div>

                <div class="input-field col s12">
                    <input id="mac_how_install" name="mac_how_install" type="text"
                           value="{{$course->mac_how_install}}">
                    <label for="mac_how_install">Link hướng dẫn cài phần mềm Mac OS</label>
                </div>

                <div class="input-field col s12">
                    <input id="sale_bonus" name="sale_bonus" type="number"
                           value="{{$course->sale_bonus}}">
                    <label for="sale_bonus">Thưởng sale</label>
                </div>

                <div class="col s12" style="padding-top:20px">
                    <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                           id="submit"/>
                </div>


            </div>
        </form>

    </div>

    @if($isEdit)
        <div class="row">
            <p><a href="{{url('manage/addlesson/'.$course->id)}}" class="waves-effect waves-light btn red lighten-1"><i
                            class="tiny-icons left fa fa-plus"></i>Thêm buổi mới</a></p>
            <h3 class="header">Danh sách buổi</h3>
            <table>
                <thead>
                <tr>
                    <th>Số thứ tự</th>
                    <th>Tên buổi</th>
                    <th>Mô tả</th>
                </tr>
                </thead>

                <tbody>
                @foreach($course->lessons->sortBy('order') as $lesson)
                    <tr>
                        <td>{{$lesson->order}}</td>
                        <td><a href="{{url('manage/editlesson/'.$lesson->id)}}">{{$lesson->name}}</a></td>
                        <td>{{$lesson->description}}</td>
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>
    @endif
    <div class="row">
        <h3 class="header">Danh sách link</h3>
        <p><a href="{{url('manage/addlink/'.$course->id)}}" class="waves-effect waves-light btn red lighten-1"><i
                        class="tiny-icons left fa fa-plus"></i>Thêm link mới</a></p>
        <table>
            <thead>
            <tr>
                <th>Tên link</th>
                <th>Hình icon</th>
                <th>Đường dẫn</th>
                <th>Mô tả</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            @foreach($course->links()->where('course_id', $course->id)->get() as $link)
                <tr>
                    <td><a href="{{url('manage/editlink/'.$link->id)}}">{{$link->link_name}}</a></td>
                    <td><img src="{{$link->link_icon_url}}" width="50px" height="50px"></td>
                    <td>{{$link->link_url}}</td>
                    <td>{{$link->link_description}}</td>
                    <td><a href="{{url('manage/deletelink/'.$link->course_id.'/'.$link->id)}}"><i class="material-icons"
                                                                                                  style="color: gray">delete</i></a>
                    </td>
                </tr>
            @endforeach

            </tbody>
        </table>
    </div>
    <script>
        $(document).ready(function () {
            CKEDITOR.replace('detail', {
                allowedContent: true
            });
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        });
    </script>

@endsection
