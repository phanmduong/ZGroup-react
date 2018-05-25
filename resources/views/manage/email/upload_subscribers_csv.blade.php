@extends('layouts.app')

@section('title','Danh sách')

@section('content')

    <div class="row">
        <div class="col s12">
            <h3 class="header">Import CSV</h3>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <p>Bạn có thể tải file mẫu <a href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/sample.csv">tại
                    đây</a> (file xls cũng được)</p>
        </div>
    </div>
    <div class="row">
        <form class="col s12" method="post" enctype="multipart/form-data"
              action="{{url('manage/subscribers_list/handle_file_upload')}}">
            {{csrf_field()}}
            <input type="hidden" name="list_id" value="{{$list_id}}"/>
            <div class="row">
                <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" name="csv">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                    </div>
                </div>
            </div>
            <input type="submit" class="btn" value="send"/>
            <a href="{{url('manage/subscribers?list_id='.$list_id)}}" class="btn red darken-4">Back</a>
        </form>
    </div>
    <div class="row">
        @if(Session::has('imported'))
            <div class="col s12">
                Đã import: <strong>{{Session::get('imported')}}</strong> email
            </div>
        @endif

        @if(Session::has('duplicated'))
            <div class="col s12">
                Bị trùng <strong>{{Session::get('duplicated')}}</strong> email
            </div>
        @endif
    </div>
@endsection
