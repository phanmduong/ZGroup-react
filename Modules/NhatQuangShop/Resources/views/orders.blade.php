@extends('nhatquangshop::layouts.manage')
@section('data')
            <h4 class="title"><small>ORDERS</small></h4>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Order Code</th>
                        <th class="text-right">Status Order</th>
                        <th class="text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    @if (count($orders) > 0)
                        @foreach($orders as$order)
                    <tr>
                        <td class="text-center">{{$order->id}}</td>
                        <td>
                            @if($order->code != null )
                                {{$order->code}}
                                @else Chưa có
                                @endif
                        </td>
                        <td class="text-right">{{$order->status}}</td>
                        <td class="td-actions text-right">

                                <a href="orders/{{$order->id}}" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Profile" class="btn btn-info btn-link btn-sm">
                                    <i class="fa fa-user"></i>
                                </a>


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
        <div class = "row">
            <div class = "col-md-2  "></div>
            <div class = "col-md-10 ">{{ $orders->links() }}</div>
        </div>

@endsection
