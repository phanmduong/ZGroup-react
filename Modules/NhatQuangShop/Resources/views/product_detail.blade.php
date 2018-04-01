@extends('nhatquangshop::layouts.manage')
@section('content')
    <style>
        img {
            max-width: 100%;
            /* 2 */
        }

        .ir {
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
        }

        .gallery {
            overflow: hidden;
        }

        .gallery__hero {
            overflow: hidden;
            position: relative;
            padding: 2em;
            margin: 0 0 0.3333333333em;
            background: #fff;
        }

        .is-zoomed .gallery__hero {
            cursor: move;
        }

        .is-zoomed .gallery__hero img {
            max-width: none;
            position: absolute;
            z-index: 0;
            top: -50%;
            left: -50%;
        }

        .gallery__hero-enlarge {
            position: absolute;
            right: 0.5em;
            bottom: 0.5em;
            z-index: 1;
            width: 30px;
            height: 30px;
            opacity: 0.5;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iNS4wIC0xMC4wIDEwMC4wIDEzNS4wIiBmaWxsPSIjMzRCZjQ5Ij48cGF0aCBkPSJNOTMuNTkzIDg2LjgxNkw3Ny4wNDUgNzAuMjY4YzUuNDEzLTYuODczIDguNjQyLTE1LjUyNiA4LjY0Mi0yNC45MTRDODUuNjg3IDIzLjEwNCA2Ny41OTMgNSA0NS4zNDMgNVM1IDIzLjEwNCA1IDQ1LjM1NGMwIDIyLjI0IDE4LjA5NCA0MC4zNDMgNDAuMzQzIDQwLjM0MyA5LjQgMCAxOC4wNjItMy4yNCAyNC45MjQtOC42NTNsMTYuNTUgMTYuNTZjLjkzNy45MjcgMi4xNjIgMS4zOTYgMy4zODggMS4zOTYgMS4yMjUgMCAyLjQ1LS40NyAzLjM5LTEuMzk2IDEuODc0LTEuODc1IDEuODc0LTQuOTEyLS4wMDItNi43ODh6bS00OC4yNS0xMC43MWMtMTYuOTU0IDAtMzAuNzUzLTEzLjc5OC0zMC43NTMtMzAuNzUyIDAtMTYuOTY0IDEzLjgtMzAuNzY0IDMwLjc1My0zMC43NjQgMTYuOTY0IDAgMzAuNzUzIDEzLjggMzAuNzUzIDMwLjc2NCAwIDE2Ljk1NC0xMy43ODggMzAuNzUzLTMwLjc1MyAzMC43NTN6TTYzLjAzMiA0NS4zNTRjMCAyLjM0NC0xLjkwNyA0LjI2Mi00LjI2MiA0LjI2MmgtOS4xNjR2OS4xNjRjMCAyLjM0NC0xLjkwNyA0LjI2Mi00LjI2MiA0LjI2Mi0yLjM1NSAwLTQuMjYyLTEuOTE4LTQuMjYyLTQuMjYydi05LjE2NGgtOS4xNjRjLTIuMzU1IDAtNC4yNjItMS45MTgtNC4yNjItNC4yNjIgMC0yLjM1NSAxLjkwNy00LjI2MiA0LjI2Mi00LjI2Mmg5LjE2NHYtOS4xNzVjMC0yLjM0NCAxLjkwNy00LjI2MiA0LjI2Mi00LjI2MiAyLjM1NSAwIDQuMjYyIDEuOTE4IDQuMjYyIDQuMjYydjkuMTc1aDkuMTY0YzIuMzU1IDAgNC4yNjIgMS45MDcgNC4yNjIgNC4yNjJ6Ii8+PC9zdmc+);
            background-repeat: no-repeat;
            -webkit-transition: opacity 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
            transition: opacity 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .gallery__hero-enlarge:hover {
            opacity: 1;
        }

        .is-zoomed .gallery__hero-enlarge {
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iNS4wIC0xMC4wIDEwMC4wIDEzNS4wIiBmaWxsPSIjMzRCZjQ5Ij48cGF0aCBkPSJNOTMuNTkzIDg2LjgxNkw3Ny4wNDUgNzAuMjY4YzUuNDEzLTYuODczIDguNjQyLTE1LjUyNiA4LjY0Mi0yNC45MTRDODUuNjg3IDIzLjEwNCA2Ny41OTMgNSA0NS4zNDMgNVM1IDIzLjEwNCA1IDQ1LjM1NGMwIDIyLjI0IDE4LjA5NCA0MC4zNDMgNDAuMzQzIDQwLjM0MyA5LjQgMCAxOC4wNjItMy4yNCAyNC45MjQtOC42NTNsMTYuNTUgMTYuNTZjLjkzNy45MjcgMi4xNjIgMS4zOTYgMy4zODggMS4zOTYgMS4yMjUgMCAyLjQ1LS40NyAzLjM5LTEuMzk2IDEuODc0LTEuODc1IDEuODc0LTQuOTEyLS4wMDItNi43ODh6TTE0LjU5IDQ1LjM1NGMwLTE2Ljk2NCAxMy44LTMwLjc2NCAzMC43NTMtMzAuNzY0IDE2Ljk2NCAwIDMwLjc1MyAxMy44IDMwLjc1MyAzMC43NjQgMCAxNi45NTQtMTMuNzkgMzAuNzUzLTMwLjc1MyAzMC43NTMtMTYuOTUzIDAtMzAuNzUzLTEzLjgtMzAuNzUzLTMwLjc1M3pNNTguNzcyIDQ5LjYxSDMxLjkyYy0yLjM1NSAwLTQuMjYzLTEuOTA3LTQuMjYzLTQuMjZzMS45MDgtNC4yNjMgNC4yNjItNC4yNjNINTguNzdjMi4zNTQgMCA0LjI2MiAxLjkwOCA0LjI2MiA0LjI2MnMtMS45MSA0LjI2LTQuMjYyIDQuMjZ6Ii8+PC9zdmc+);
        }

        .gallery__thumbs {
            text-align: center;
            background: #fff;
        }

        .gallery__thumbs a {
            display: inline-block;
            width: 20%;
            padding: 0.5em;
            opacity: 0.75;
            -webkit-transition: opacity 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
            transition: opacity 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .gallery__thumbs a:hover {
            opacity: 1;
        }

        .gallery__thumbs a.is-active {
            opacity: 0.2;
        }
    </style>
    <div class="container" >
        <br><br><br><br><br>
        <br><br>
        <div class="col-md-12 row">
            <div class="col-md-4">

                <div class="container">
                    <div id="js-gallery" class="gallery">
                        <div class="gallery__hero">
                            <img id="zoom" src="{{$good->avatar_url}}" data-zoom-image="{{$good->avatar_url}}">
                        </div>
                        <div class="gallery__thumbs">
                            <a href="{{$good->avatar_url}}"
                               data-gallery="thumb" class="is-active">
                                <img src="{{$good->avatar_url}}">
                            </a>
                            @if($images_good && count($images_good)>0)
                                @foreach($images_good as $image_good)
                            <a href="{{$image_good}}"
                               data-gallery="thumb" class="is-active">
                                <img src="{{$image_good}}">
                            </a>
                                @endforeach
                                @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4 class="title">Title</h4>
                <h6 class="category">{{$good->goodCategory->name}}</h6>
                <p class="description">
                    {{$good->name}}
                </p>
                <hr>
                <h4><strong>{{number_format($good->price, 0)}}đ</strong></h4>
                <br>
                <hr>
                <p class="description">Màu sắc:</p>
                <div class="radio">
                    <input type="radio" name="radio1" id="radio1" value="option1">
                    <label for="radio1">
                        Đen
                    </label>
                </div>
                <div class="radio">
                    <input type="radio" name="radio1" id="radio2" value="option2" checked="">
                    <label for="radio2">
                        Trắng
                    </label>
                </div>
                <br>
                <p class="description">Số lượng: Còn 4 sản phẩm</p>
                <br>
                <div class="col-md-12 row" id = "product_info">
                    <div class="col-md-6">
                        <button v-on:click="openBuyModal({{$good->id}})" type="button" class="btn btn-primary">Cho vào giỏ hàng</button>
                    </div>
                    {{--<div>@{{good}}</div>--}}
                </div>

                <br><br>
            </div>
            <div class="col-md-2 card-block" style="background-color: #fff">
                <p>Vị trí của bạn:</p>
                <h6 class="category">175 Chùa Láng</h6>
                <hr>
                <p>Giao hàng bởi</p>
                <h6 class="category">Adayroi</h6>
                <br>
                <p>Chính sách đổi trả của Adayroi</p>
                <br>
                <p>Sản phẩm không áp dụng tiêu điểm VinID</p>
                <hr>
                <p>Sản phẩm được cung cấp bởi</p>
                <h6 class="category">KEETOOL</h6>
            </div>
        </div>
        <br>
        <br>
        <div class="col-md-12 row">
            <div class="col-md-10">
                <div class="card-block" style="background-color: #fff">
                    <h4 class="title">
                        Thông tin sản phẩm
                    </h4>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td class="text-left"><b>Mã sản phẩm</b></td>
                            <td class="text-left" colspan="2">{{$good->code}}</td>
                        </tr>
                        <tr>
                            <td class="text-left"><b>Kích thước</b></td>
                            @if($size !=null)
                                <td class="text-left" colspan="2">{{$size}}</td>
                            @else
                                <td class="text-left" colspan="2">Bạn chưa chọn size</td>
                            @endif
                        </tr>
                        <tr>
                            <td class="text-left"><b>Màu</b></td>
                            @if($color !=null)
                            <td class="text-left" colspan="2">{{$color}}</td>
                                @else
                            <td class="text-left" colspan="2">Bạn chưa chọn màu </td>
                                @endif
                        </tr>
                        <tr>
                            <td class="text-left"><b>Khối lượng</b></td>
                            <td class="text-left" colspan="2">Nặng lắm</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="col-md-2 card-block" style="background-color: #fff">
                <p>Sản phẩm tương tự</p>
                <br>
                @if($relateGoods && count($relateGoods) > 0)
                    @foreach($relateGoods as $relateGood)
                <div>
                    <div class="img-container">
                        <img src="{{$relateGood->avatar_url}}" alt="Agenda">
                    </div>
                    <br>
                    <p class="category">{{$relateGood->name}}</p>
                    <h6>{{ number_format($relateGood->price, 0) }}đ</h6>
                    <br>
                </div>
                    @endforeach
                    @else
                    <div class="img-container">
                       <h3>Không có sản phẩm liên quan</h3>
                    </div>
                    @endif

            </div>
        </div>
        <br>
        <br>
    </div>
@endsection
@push('scripts')
    <script>
        $("#zoom").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            easing : true,
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 500,
            lensFadeIn: 500,
            lensFadeOut: 500
        });
    </script>
@endpush