@extends('layouts.app')

@section('title','Tổ chức')

@section('content')
    <h3 class="header">
        Tổ chức
    </h3>
    @if (count($errors) > 0)
        <ul style="color:#c50000">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif
    <div class="row">
        <form action="/manage/storeorganization" method="post">
            <input type="hidden" name="id" value="{{isset($organization) ? $organization->id : ""}}">
            {{csrf_field()}}
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Tên tổ chức" value="{{isset($organization) ? $organization->name : ""}}"
                           name="name" id="name" type="text" class="validate">
                    <label for="name">Tên tổ chức</label>
                </div>
                <div class="input-field col s12">
                    <input type="submit" class="btn"/>
                </div>
            </div>
        </form>

    </div>

@endsection
