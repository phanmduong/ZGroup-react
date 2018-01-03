@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="row">
        <div class="col-md-8 offset-md-2">
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
                        <td>{{$order->code}}</td>
                        <td class="text-right">{{$order->status}}</td>
                        <td class="td-actions text-right">
                            <button type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Profile" class="btn btn-info btn-link btn-sm">
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
    </div>
    {{ $orders->links() }}

@endsection
