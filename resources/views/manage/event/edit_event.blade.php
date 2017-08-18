@extends('layouts.app')

@section('title','Sự kiện')

@section('content')
    <h3 class="header">
        Sự kiện
    </h3>
    @if (count($errors) > 0)
        <ul style="color:#c50000">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif
    <div class="row">
        <form action="/manage/storeevent" method="post">
            {{csrf_field()}}
            @if(isset($event))
                <input type="hidden" name="id" value="{{$event->id}}">
            @endif
            <div class="row">
                <div class="input-field col s12">
                    <input placeholder="Tên sự kiện" id="name" value="{{isset($event) ? $event->name : ""}}"
                           name="name" type="text" class="validate">
                    <label for="name">Tên sự kiện</label>
                </div>
                <div class="input-field col s12">
                    <select name="organization_id">
                        <option value="" disabled selected>None</option>
                        @foreach($organizations as $organization)
                            <option value="{{$organization->id}}" {{isset($event) && $event->organization_id == $organization->id ? "selected" : ""}}>{{$organization->name}}
                            </option>
                        @endforeach
                    </select>
                    <label>Tổ chức</label>
                </div>
                <input type="submit" class="btn"/>
            </div>
        </form>

    </div>
    <script>
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection
