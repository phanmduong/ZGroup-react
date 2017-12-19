<div>
    @foreach($books as $book)
        <div class="row" id="book-{{$book->id}}" style="margin-bottom:20px;">
            <div class="col-md-1 h-center">
                <img class="shadow-image"
                     src="{{$book->avatar_url}}">
            </div>
            <div class="col-md-4">
                <p><b style="font-weight:600;">{{$book->name}}</b></p>
                <p>-{{$book['coupon_value'] * 100}}%</p>
            </div>
            <div class="col-md-3 h-center">
                <button onclick="removeItem({{$book->id}}, {{$book->price * (1 - $book['coupon_value'])}})"
                        class="btn btn-success btn-just-icon btn-sm">
                    <i class="fa fa-minus"></i>
                </button>
                &nbsp
                <button onclick="addItem({{$book->id}},{{$book->price * (1 - $book['coupon_value'])}})"
                        class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-plus"></i>
                </button>
                &nbsp
                <b style="font-weight:600;" id="good-{{$book->id}}-number" }> {{$book->number}} </b>
            </div>
            <div class="col-md-2 h-center">
                <p>{{currency_vnd_format($book->price * (1 - $book['coupon_value']))}}</p>
            </div>
            <div class="col-md-2 h-center">
                <p>
                    <b style="font-weight:600;" id="book-{{$book->id}}-price"
                       data-price="{{$book->price * (1 - $book['coupon_value']) * $book->number}}">
                        {{currency_vnd_format($book->price * (1 - $book['coupon_value']) * $book->number)}}
                    </b>
                </p>
            </div>
        </div>
    @endforeach
</div>
<hr>
<div class="row">
    <div class="col-md-4">
        <h4 class="text-left"><b>Tổng</b></h4>
    </div>
    <div class="col-md-8" id="total-price" data-price="{{$total_price}}" }>
        <h4 class="text-right"><b>{{currency_vnd_format($total_price)}}</b></h4>
    </div>
</div>
<div class="row" style="padding-top:20px;">
    <div class="col-md-12" >
        <div style="font-weight: 600">Lưu ý: chi phí ship được tính như sau:</div>
        <div>Ship nội thành Hà Nội và Sài Gòn: 20k</div>
        <div>Ship vào Sài Gòn: 30k</div>
        <div>Ship đến tỉnh thành khác: 30k</div>
    </div>
</div>


</div>