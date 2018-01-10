@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        @if(count($errors) > 0)
            @include("errors.validate")
        @endif
        <form action="/manage/account_change" method="post">
            <table cellpadding="10px">
                <tr class="border-0 ">
                    <td class="text-left border-white">Họ và tên :</td>
                    <th><input type="text" value="{{$user->name}}" placeholder="Tên của bạn" class="form-control"
                               name="name" size="50px">
                    </th>
                </tr>
                <tr>
                    <td class="text-left">Email :</td>
                    <th><input type="text" value="{{$user->email}}" placeholder="Địa chỉ email của bạn"
                               class="form-control"
                               name="email" size="50px"></th>
                </tr>
                <tr>
                    <td class="text-left">Di động :</td>
                    <th><input type="text" value="{{$user->phone}}" placeholder="Số điện thoại của bạn"
                               class="form-control"
                               name="phone" size="50px"></th>
                </tr>
                <tr>
                    <td class="text-left">Địa chỉ :</td>
                    <th><input type="text" value="{{$user->address}}" placeholder="Địa chỉ của bạn" class="form-control"
                               name="address" size="50px"></th>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" class="btn btn-info">Cập nhập thông tin</button>
                        <a href="/manage/account" class="btn btn-default">Thoát</a>
                    </td>
                </tr>
            </table>
            <br>

        </form>

    </div>
@endsection