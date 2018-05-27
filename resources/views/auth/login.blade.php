@extends('layouts.public')

@section('title','Đăng nhập')

@section('header', 'Đăng nhập')

@section('content')
    <div class="container">
        <div class="row center" style="margin-bottom: 0;">
            <h4>Đăng nhập</h4>
        </div>
        <div class="row">
            <div class="col s12 m6 offset-m3">
                <div class="card">
                    {{--<div class="col s12 center card-action card-panel red lighten-1 form-header">--}}
                    {{--<h3 class="white-text text-uppercase">Log in</h3>--}}
                    {{--</div>--}}
                    <form method="POST" action="{{ url('/login') }}">
                        <div class="card-content">
                            <div class="row">
                                {!! csrf_field() !!}


                                <div class="input-field col s12{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <input id="email" name="email" type="email" class="validate"
                                           value="{{ old('email') }}" autofocus>
                                    <label for="email">Email</label>
                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
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
                                <div class="input-field col s12">
                                    <input type="checkbox" id="remember" name="remember"/>
                                    <label for="remember">Ghi nhớ đăng nhập</label>
                                </div>
                            </div>
                        </div>
                        <div class="card-action">

                            <button class="btn waves-effect waves-light red accent-3" type="submit" name="action">Đăng nhập
                                <i class="material-icons right">send</i>
                            </button>
                            {{--                            <a class="btn btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a>--}}
                            <a class="btn btn-link" href="{{ url('/register') }}">Tạo tài khoản</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>
@endsection