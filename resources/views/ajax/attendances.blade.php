<div class="row">
    <div class="col s4">
        Họ tên
    </div>
    <div class="col s8">
        {{$student->name}}
    </div>
    <div class="col s4">
        Email
    </div>
    <div class="col s8">
        {{$student->email}}
    </div>
    <div class="col s4">
        Lớp đăng kí
    </div>
    <div class="col s8">
        {{$register->studyClass->name}}
    </div>
</div>
<div class="row">
    <div class="col s12">
        <ul class="collection with-header">
            @foreach($attendances as $attendance)
                <li class="collection-item">
                    <div>Buổi {{$attendance->classLesson->lesson->order}}: {{$attendance->classLesson->lesson->name}}
                        <div class="switch secondary-content">
                            <label>
                                <input name="status" id="attend_status{{$attendance->id}}"
                                       onclick="change_attend_status({{$attendance->id}});"
                                       type="checkbox" {{($attendance->status==1)?"checked":""}} />
                                <span class="lever"></span>
                            </label>
                        </div>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
</div>