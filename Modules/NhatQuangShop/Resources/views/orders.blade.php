@extends('nhatquangshop::layouts.manage')
@section('data')
    <h4><span style="font-weight:bold">Các đơn hàng</span></h4>
            <div class="table-responsive" style ="margin-top: 20px">
                <table class="table">
                    <tr>
                        <th class="text-center">#</th>
                        <th>OrderCode</th>
                        <th class="text-right">Status Order</th>
                        <th class="text-right">Actions</th>
                    </tr>
                    <tbody>
                    @if (count($orders) > 0)
                        @foreach($orders as$order)
                    <tr>
                        <td class="text-center">{{$order->id}}</td>
                        <td>
                            @if($order->code != null )
                                <a href="orders/{{$order->id}}" class="btn btn-round btn-twitter">
                                   {{$order->code}}
                                </a>
                                @else  <a href="orders/{{$order->id}}" class="btn btn-round btn-twitter">
                                Chưa có code
                            </a>
                                @endif
                        </td>
                        <td class="text-right">{{$order->status}}</td>
                        <td class="td-actions text-right">

                                <button  type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Profile" class="btn btn-info btn-link btn-sm">
                                    <i class="fa fa-user"></i>
                                </button>


                            <button type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Profile" class="btn btn-success btn-link btn-sm">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>
                @endforeach
                        @endif
                    </tbody>
                </table>
            </div>
        @include('pagination.custom', ['paginator' => $orders])

@endsection
