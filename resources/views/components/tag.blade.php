@foreach(explode(",", $current_product->tags) as $tag)
    <div class="chip">{{$tag}}</div>
@endforeach