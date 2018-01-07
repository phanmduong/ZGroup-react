@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF; margin-bottom: 20px">
        <h4><span style="font-weight:bold">Các đơn hàng</span></h4>
        <div class="table-responsive" style="margin-top: 20px">
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
                                <a href="orders/{{$order->id}}" data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="View Profile" class="btn btn-info btn-link btn-sm">
                                    <i class="fa fa-user"></i>
                                </a>
                                <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                        data-original-title="Edit Profile" class="btn btn-success btn-link btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                        data-original-title="Remove" class="btn btn-danger btn-link btn-sm">
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                @endif
                </tbody>
            </table>
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-8" style="margin: auto">
                    <ul class="pagination pagination-primary">
                        @if($orders->currentPage() != 1)
                            <li class="page-item">
                                <a class="page-link" href="/manage/orders?page=1"
                                   aria-label="Previous">
                                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="{{ $orders->previousPageUrl() }}" aria-label="Previous">
                                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                                </a>
                            </li>
                        @else
                        @endif

                        @for($i = 1; $i <= $orders->count(); $i++)
                            @if($orders->currentPage() == $i)
                                <li class="active page-item"><a class="page-link"
                                                                href="/manage/orders?page={{$i}}">{{$i}}</a>
                                </li>
                            @else
                                <li class="page-item"><a class="page-link"
                                                         href="/manage/orders?page={{$i}}">{{$i}}</a>
                                </li>
                            @endif
                        @endfor
                        @if($orders->currentPage() != $orders->count())
                            <li class="page-item">
                                <a class="page-link" href="{{ $orders->nextPageUrl() }}" aria-label="Previous">
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link"
                                   href="/manage/orders?page={{$orders->count()}}"
                                   aria-label="Next">
                                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        @else
                        @endif

                    </ul>
                </div>
            </div>

        </div>
    </div>

@endsection
