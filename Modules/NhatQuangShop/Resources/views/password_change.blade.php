@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        @if(count($errors) > 0)
            @include("errors.validate")
        @endif
        @if(session('error'))
            @include("errors.error")
        @endif
        <form action="/manage/password_change" method="post">
            <table cellpadding="10px">
                <tr class="border-0 ">
                    <td class="text-left border-white">Mật khẩu hiện tại :</td>
                    <th><input type="password" placeholder="Mật khẩu hiện tại của bạn" class="form-control"
                               name="password" size="50px" value="{{old("password")}}"></th>
                </tr>
                <tr>
                    <td class="text-left">Mật khẩu mới :</td>
                    <th><input type="password" placeholder="Mật khẩu mới" class="form-control"
                               name="newPassword" size="50px" value="{{old("newPassword")}}"></th>
                </tr>
                <tr>
                    <td class="text-left">Xác nhận mật khẩu :</td>
                    <th><input type="password" placeholder="Xác nhận mật khẩu" class="form-control"
                               name="againPassword" size="50px" value="{{old("againPassword")}}"></th>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" class="btn btn-primary">Cập nhập mật khẩu</button>
                        <a href="/manage/account" class="btn btn-default">Thoát</a>
                    </td>
                </tr>
            </table>
            <br>

        </form>
    </div>

    <script>
        $('form').submit(function () {

        });
    </script>
@endsection