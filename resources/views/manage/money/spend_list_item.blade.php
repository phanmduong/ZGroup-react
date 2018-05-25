<tr>
    <td>{{$transaction->sender->name}}</td>
    <td>{!!transaction_type($transaction->type)!!}</td>
    <td>{{currency_vnd_format($transaction->money)}}</td>
    <td>
        @if($transaction->type == 0)
            Người nhận: <strong>{{$transaction->receiver->name}}</strong>
        @else
            {{$transaction->note}}
        @endif
    </td>
    <td>{{format_date_full_option($transaction->created_at)}}</td>
    <td>{{currency_vnd_format($transaction->sender_money)}}</td>
</tr>