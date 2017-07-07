@extends('layouts.app')

@section('title','Subscribers')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">{{$list->name}}</h3>
        </div>

        <div class="col s12">
            <a class="waves-effect waves-light btn" href="{{url('manage/new_subscriber?list_id='.$list->id)}}">Thêm
                người đăng kí</a>
            <a class="waves-effect waves-light btn" href="{{url('manage/upload_subscribers_csv?list_id='.$list->id)}}">Upload
                csv</a>
        </div>
        <div class="col s12">
            <p>Số lượng email: <strong>{{$list->subscribers()->count()}}</strong></p>
        </div>
    </div>
    @if($num_subscribers == 0)
        <div class="row">
            <div class="col s12 center">
                <h4>Danh sách này chưa có người đăng kí</h4>
            </div>
        </div>
    @else
        <div class="row">
            <div class="col s12">
                <form>
                    <input required placeholder="Email" type="text" name="q">
                    <input type="hidden" name="list_id" value="{{$list->id}}"/>
                    <input type="submit" class="btn blue" value="Search"/>
                </form>
            </div>
        </div>
        @if(isset($subscribers) && $subscribers!=null)
            <div class="row">
                <div class="col s12">
                    <h5>50 kết quả đầu tiên</h5>
                </div>
                <div class="col s12">
                    <table>
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Lần sửa cuối</th>
                            <th>Ngày tạo</th>
                        </tr>
                        </thead>

                        <tbody>
                        @foreach($subscribers as $subscriber)
                            <tr>
                                <td>{{$subscriber->email}}</td>
                                <td>{{$subscriber->name}}</td>
                                <td>{{format_date_full_option($subscriber->updated_at)}}</td>
                                <td>{{format_date_full_option($subscriber->created_at)}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        @endif
    @endif
@endsection
