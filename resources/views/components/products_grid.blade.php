<ul class="product-list" id="grid" style="margin-top: 0;opacity: 0">
    <li class="product-item">
        <div class="card">
            <a href="{{url('/courses')}}">
                <div style="cursor: pointer;position:relative" class="card-image">
                    <img src="{{url('img/logo.jpg')}}">
                </div>
            </a>
            <div class="card-content" style="padding: 10px;border-top:1px solid #d9d9d9;padding: 5px 0 0 0;">
                <a href="{{url('/courses')}}">
                    <p style="text-align: center; background-color: #C00002; color: white;padding: 10px; font-weight: bold">
                        Đăng ký ngay
                    </p>
                </a>
            </div>
        </div>
    </li>
    @foreach($products as $product)
        @include('components.newsfeed_item', ['products' => $products])
    @endforeach
</ul>
@include('components.full_image_modal')
<script>
//    $('.product-list').css('display', 'none');
    $(document).ready(function () {
        initGallery();
        $('.product-list').css('opacity', 1);
    });
</script>

