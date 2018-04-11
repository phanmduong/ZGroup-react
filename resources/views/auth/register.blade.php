@extends('layouts.public')
@section('title','Tạo tài khoản')

@section('header', 'Tạo tài khoản')
@section('content')
    <div class="container">
        <div class="row center" style="margin-bottom: 0;">
            <h4>Đăng ký tài khoản</h4>
        </div>
        <div class="row">
            <div class="col s12 m6 offset-m3">
                <div class="card">
                    {{--<div class="col s12 center card-action card-panel red lighten-1 form-header">--}}
                        {{--<h3 class="white-text">Register</h3>--}}
                    {{--</div>--}}

                    <form method="POST" action="{{ url('/register') }}">
                        <div class="card-content">

                            {!! csrf_field() !!}

                            <div class="row">
                                <div class="input-field col s12 {{ $errors->has('name') ? ' has-error' : '' }}">
                                    <input id="name" name="name" type="text" class="validate" value="{{ old('name') }}">
                                    <label for="name">Tên của bạn</label>
                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                    @endif
                                </div>

                            </div>
                            <div class="row">
                                <div class="input-field col s12{{ $errors->has('username') ? ' has-error' : '' }}">
                                    <input id="username" name="username" type="text" class="validate"
                                           value="{{old('username')}}">
                                    <label for="username">Tên đăng nhập</label>
                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <input id="email" name="email" type="email" class="validate"
                                           value="{{ old('email') }}">
                                    <label for="email">Địa chỉ Email của bạn</label>
                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12{{ $errors->has('password') ? ' has-error' : '' }}">
                                    <input id="password" name="password" type="password" class="validate"
                                           value="{{old('password')}}">
                                    <label for="password">Mật khẩu</label>
                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                                    <input id="password_confirmation" name="password_confirmation" type="password"
                                           class="validate">
                                    <label for="password_confirmation">Xác nhận mật khẩu</label>
                                    @if ($errors->has('password_confirmation'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                        </div>
                        <div class="card-action">
                            <button class="btn waves-effect waves-light red accent-3" type="submit" name="action">Tạo tài khoản
                                <i class="material-icons right">send</i>
                            </button>
                            <a class="btn btn-link" href="{{ url('/login') }}">Đăng nhập</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('custom_script')
    <script>

    </script>
@endsection
