@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">

        <table cellpadding="10px">
            <tr class="border-0 ">
                <td class="text-left border-white">Họ và tên :</td>
                <th>{{$user->name}}</th>
            </tr>
            <tr>
                <td class="text-left">Email :</td>
                <th>{{$user->email}}</th>
            </tr>
            <tr>
                <td class="text-left">Giới tính :</td>
                <th>{{$user->gender == 1 ? 'Nữ ':  'Nam'}}</th>
            </tr>
            <tr>
                <td class="text-left">Di động :</td>
                <th>{{$user->phone}}</th>
            </tr>
            <tr>
                <td class="text-left">Địa chỉ :</td>
                <th>{{$user->address}}</th>
            </tr>
            <tr>
                <td class="text-left">Ví cọc :</td>
                <th>{{$user->deposit}}</th>
            </tr>
            <tr>
                <td class="text-left">Ví lưu động :</td>
                <th>{{$user->money}}</th>
            </tr>

        </table>
        <br>
        <a href="/manage/account_change" class="btn btn-info">Đổi thông tin</a>
        <a href="/manage/password_change" class="btn btn-primary">Đổi mật khẩu</a>
        <a href="/logout" class="btn btn-default">Đăng xuất</a>
    </div>
@endsection