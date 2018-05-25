@foreach($product->comments as $comment)
    @include('components.comment_item',['comment'=>$comment])
@endforeach