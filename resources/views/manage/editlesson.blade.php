@extends('layouts.app')

@section('title','Thêm/sửa buổi học')

@section('content')
    <h3 class="header">
        {{($isEdit)?"Sửa":"Thêm mới"}} buổi học
    </h3>
    <div class="row">
        <form method="post" action="{{url('manage/storelesson')}}">
            {{csrf_field()}}
            <input type="hidden" name="id" value="{{$lesson->id}}"/>
            <input type="hidden" name="course_id" value="{{$lesson->course_id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="name" type="text" value="{{$lesson->name}}" class="validate">
                    <label for="name">Tên buổi</label>
                </div>
                <div class="input-field col s12">
                    <input id="description" name="description" type="text" value="{{$lesson->description}}"
                           class="validate">
                    <label for="description">Mô tả</label>
                </div>
            @if($lesson->id !=null)
                <div class="col s12">
                    <label>Chi tiết</label>
                </div>
                <div class="col s12">
                    <button id="btn-save-detail" class="waves-effect waves-light btn"
                            onclick="save_data('detail');return false;">Save
                    </button>

                    <a class="waves-effect waves-light btn" href="{{url('classes/'.$lesson->course_id)}}" target="_blank">Preview</a>
                    <span id="save-detail-message"></span>
                </div>
                <div class="input-field col s12">
                    <textarea id="detail" name="detail">{{$lesson->detail}}</textarea>
                </div>

                <div class="col s12" style="margin-top:25px">
                    <label>Giáo trình chi tiết</label>
                </div>
                <div class="col s12">
                    <button id="btn-save-detail_content" class="waves-effect waves-light btn"
                            onclick="save_data('detail_content');return false;">
                        Save
                    </button>
                    <a class="waves-effect waves-light btn" href="{{url('student/lessoncontent/'.$lesson->id)}}" target="_blank">Preview</a>
                    <span id="save-detail_content-message"></span>

                </div>
                <div class="input-field col s12">
                    <textarea id="detail_content" name="detail_content">{{$lesson->detail_content}}</textarea>
                </div>

                <div class="col s12" style="margin-top:25px">
                    <label>Giáo án giảng viên</label>
                </div>

                <div class="col s12">
                    <button id="btn-save-detail_teacher" class="waves-effect waves-light btn"
                            onclick="save_data('detail_teacher');return false;">
                        Save
                    </button>
                    <span id="save-detail_teacher-message"></span>
                </div>
                <div class="input-field col s12">
                    <textarea id="detail_teacher" name="detail_teacher">{{$lesson->detail_teacher}}</textarea>
                </div>
                @endif

                <div class="input-field col s12">
                    <input id="order" name="order" type="number" value="{{$lesson->order}}"
                           class="validate">
                    <label for="order">Số thứ tự</label>
                </div>


                <div class="col s12" style="padding-top:20px">
                    <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                           id="submit"/>
                </div>


            </div>
        </form>

    </div>
    <script>
        CKEDITOR.on('dialogDefinition', function (ev) {
            // Take the dialog name and its definition from the event data.
            var dialogName = ev.data.name;
            var dialogDefinition = ev.data.definition;
            // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
            if (dialogName == 'image') {
                var infoTab = dialogDefinition.getContents('info');
                dialogDefinition.removeContents('Link');
                console.log(infoTab);
                infoTab.remove('txtHeight');
                infoTab.remove('txtWidth');
                infoTab.remove('txtBorder');
                infoTab.remove('txtHSpace');
                infoTab.remove('txtVSpace');
                infoTab.remove('cmbAlign');
                infoTab.remove('txtAlt');
            }
        });
        function save_data(field) {
            $('#save-' + field + '-message').html('<strong class="green-text text-darken-1" style="margin-left:10px">  Đang lưu....</strong>');
            var url = '{{url('manage/savelesson')}}';
            var data = CKEDITOR.instances[field].getData();
            $('#btn-save-' + field).prop("disabled",true);
            $.post(
                    url,
                    {
                        field: field,
                        lesson_id:{{$lesson->id}},
                        data: data,
                        _token: '{{csrf_token()}}'
                    },
                    function (data, status) {
                        $('#save-' + field + '-message').html('<strong class="green-text text-darken-1" style="margin-left:10px">' + data + '</strong>');
                        $('#btn-save-' + field).prop("disabled",false);
                    }
            );
        }
        CKEDITOR.replace('detail', {
            allowedContent: true,
            filebrowserUploadUrl: "{{url('uploadfile?owner_id='.$owner_id)}}"
        });
        CKEDITOR.replace('detail_content', {
            allowedContent: true,
            filebrowserUploadUrl: "{{url('uploadfile?owner_id='.$owner_id)}}"
        });
        CKEDITOR.replace('detail_teacher', {
            allowedContent: true,
            filebrowserUploadUrl: "{{url('uploadfile?owner_id='.$owner_id)}}"
        });
        $(document).ready(function () {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
            $(document).ready(function () {
                $('select').material_select();
            });
            $('#detail').trigger('autoresize');
        });
    </script>

@endsection
