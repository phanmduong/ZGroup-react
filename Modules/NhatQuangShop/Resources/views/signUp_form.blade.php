@extends('nhatquangshop::layouts.master')

@section('content')
<div class="container" style="margin-top: 150px">
    <div role="form" id="contact-form" method="post" action="#" >
    

                                        <input type="hidden" name="_token" value="v2gWN5Rc92VPKhAUcUjgHBnOygQRYzJmcZXbFMBd">
                                        <div class="card-block">
                                            <div class="form-group label-floating">
                                                <label class="control-label">Họ và tên (*) </label>
                                                <input id="e-name" name="name" class="form-control" placeholder="John">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email (*)</label>
                                                <input id="e-email" type="email" name="email" class="form-control" placeholder="johnwick@best.com">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Số điện thoại</label>
                                                <input id="e-phone" name="phone" class="form-control" placeholder="Ví dụ: 0123456789">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Địa chỉ </label>
                                                <input id="e-address" name="name" class="form-control" placeholder="1, Vu Pham Ham">
                                            </div>
                        
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div id="alert"> </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                                                                                                                                                                                                                                                                                                            
                                                </div>
                                                <div class="col-md-6">
                                                    <button type="submit" class="btn btn-primary pull-right" id="submit-1">Submit
                                                    </button></div>

                                            </div>
                                        </div>
    </div>
</div>

@endsection