<!DOCTYPE html>
<html>
<head>
    <title>Xoá register</title>
</head>
<body>
<table>
    <tr>
        <td>ID</td>
        <td>{{$student->id}}</td>
    </tr>
    <tr>
        <td>Tên</td>
        <td>{{$student->name}}</td>
    </tr>
    <tr>
        <td>Lớp</td>
        <td>{{$class->name}}</td>
    </tr>
    <tr>
        <td>ID lớp</td>
        <td>{{$class->id}}</td>
    </tr>
    <tr>
        <td>Người xoá ID</td>
        <td>{{$staff->id}}</td>
    </tr>
    <tr>
        <td>Tên người xoá</td>
        <td>{{$staff->name}}</td>
    </tr>
    <tr>
        <td>Email người xoá</td>
        <td>{{$staff->email}}</td>
    </tr>
</table>
</body>
</html>

