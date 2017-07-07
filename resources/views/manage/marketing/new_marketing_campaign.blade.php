@extends('layouts.app')

@section('title','Tạo chiến dịch marketing')

@section('content')
    <div class="row">
        <h3 class="header">Tạo chiến dịch</h3>
    </div>
    <div class="row">
        <form method="post" action="{{url('manage/store-marketing-campaign')}}">
            {{csrf_field()}}
            <div class="input-field col s12">
                <input name="name" id="name" type="text" class="validate">
                <label for="name">Name</label>
            </div>
            <div class="col s12">
                <input class="btn" type="submit"/>
            </div>
        </form>
    </div>
@endsection
