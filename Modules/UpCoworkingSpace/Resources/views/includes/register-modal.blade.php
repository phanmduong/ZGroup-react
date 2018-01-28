@extends('upcoworkingspace::layouts.master')

<div id="registerModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí</h3></div>
            <div id="modal-body" class="modal-body">
                <div class="container">
                    <div class="row" style="padding: 10px">
                        <select id="sel1" class="form-control">
                            <option value="Chuyển khoản">Cơ sở 1</option>
                            <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                                Cơ sở 2
                            </option>
                        </select>

                    </div>
                    <div class="row" style="padding: 10px">
                        <select id="sel1" class="form-control">
                            <option value="Chuyển khoản">Cơ sở 1</option>
                            <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                                Cơ sở 2
                            </option>
                        </select>

                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">

                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">

                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a>
                                <div class="card card-profile"
                                     style="padding-bottom: 70%; background-size: cover; background-position: center; background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">
                                </div>
                                <h6>
                                    Thanh vien linh hoat
                                </h6>
                                <p>
                                    Sample description
                                </p>
                            </a>
                        </div>
                    </div>
                    <div class="row">

                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="btn-purchase" class="btn btn-sm btn-main"
                        style="margin: 10px 10px 10px 0px !important;">Đăng kí</i>
                </button>
            </div>
        </div>
    </div>
</div>

@push('script')
    <script>
        var registerModal = new Vue(
        {
            el: "#registerModal",
            data: {
                provinces: [],
                bases: [],
                provinceId: ''
            },
            methods: {

            },
            mounted: function () {

            }
        })
    </script>
@endpush
