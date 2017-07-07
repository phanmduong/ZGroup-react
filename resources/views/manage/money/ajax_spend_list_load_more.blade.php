@foreach($transactions as $transaction)
    @include('manage.money.spend_list_item',$transaction)
@endforeach