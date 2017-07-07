<table class="responsive-table striped">
    <thead>
    <tr>
        <th>Số thứ tự</th>
        <th>Tên buổi</th>
        <th>Thời gian</th>
        <th></th>
    </tr>
    </thead>

    <tbody>
    @foreach($lessons as $lesson)
        <tr>
            <td>{{$lesson->order}}</td>
            <td>{{$lesson->name}}</td>
            <td>
                <input value="{{$lesson->pivot->time?format_date_eng($lesson->pivot->time):''}}"
                       id="class-lesson-time{{$lesson->id}}" class="datepicker" type="text"/>
            </td>
            <td>
                <button class="waves-effect waves-light btn waves-input-wrapper" onclick="save({{$lesson->id}})">Lưu
                </button>
                <span id="message{{$lesson->id}}"></span>
            </td>
        </tr>
    @endforeach


    </tbody>
</table>
<script>
    $(document).ready(function () {
        $('.datepicker').pickadate();
    });
</script>