@extends('colorme_new.layouts.master')
@section('content')
<div class="container">
	<div class="row text-center">
        <div class="col-sm-8 col-sm-offset-2">
            <div class="panel panel-default" style="margin: 50px 10px;padding: 30px 10px">
                <div class="panel-body">
                        <p style="font-size:20px;color:#5C5C5C;">
                            Chào mừng bạn đến với đại gia đình ColorME. <br>
                            Email của bạn đã được ColorME xác thực thành công.
                        </p>
                        <a class="btn btn-success" style="color:white;margin-top:20px" onclick="vueNav.openModalLogin()">     Đăng nhập ngay      </a>
                </div>
            </div>                
        </div>
        
	</div>
</div>
@endsection