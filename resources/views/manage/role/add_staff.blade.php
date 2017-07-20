@extends('layouts.app')

@section('title','Quản lý nhân sự')

@section('content')
    <H2>Thêm nhân viên</H2>
    <style>
        [type="checkbox"]:not(:checked), [type="checkbox"]:checked {
            position: relative;
            left: 0;
            visibility: visible;
        }
    </style>
    <form>
        <label for="email">Email</label>
        <input name="email" type="text" id="email">
        <label for="username">Username</label>
        <input name="username" type="text" id="username">
        <label for="name">Họ và tên</label>
        <input name="name" type="text" id="name">
        <label><input type="checkbox" value="" id="marital">Tình trạng hôn nhân</label>
    </form>
    <button id="add-staff">THÊM</button>
    <script>
        $('#add-staff').click(function () {
//            console.log($('#marital').prop('checked'))
            $.post('http://api.phanmduong.ml/manage/staff/add-staff?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cL2FwaS5jbG9uZWNvbG9ybWUuZGV2XC9sb2dpbiIsImlhdCI6MTUwMDU0NjY3NSwiZXhwIjoxNTAxMTUxNDc1LCJuYmYiOjE1MDA1NDY2NzUsImp0aSI6IjJlYmIyMjc1MjFmMDM3MzllNDU5NWY3MzBkYTVlN2RjIn0.1tuERaIBAIe_eEP5EgCZJ2tiW-o_vBwFyGXOeKhi3Pg',
                {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    username: $('#username').val(),
                    marital: $('#marital').prop('checked') ? 1 : 0,

                }, function (data, status) {
                console.log(data);
                    if (data.data) {
                        alert("Thêm nhân viên thành công");
                    } else {
                        alert("Thêm nhân viên thất bại");
                    }
                });
        })
    </script>
@endsection