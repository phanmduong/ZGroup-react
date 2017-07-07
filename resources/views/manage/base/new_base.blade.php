@extends('layouts.app')

@section('title',($base==null)?'Tạo cơ sở mới':'Cơ sở')

@section('content')

    <div class="row">
        <form class="col s12" method="post" action="{{url('manage/storebase')}}">
            {{csrf_field()}}
            @if($base!=null)
                <input type="hidden" name="base_id" value="{{$base->id}}"/>
            @endif
            <div class="row">
                <div class="input-field col s12">
                    <input name="name" value="{{($base!=null)?$base->name:''}}" id="name" type="text" class="validate">
                    <label for="name">Tên cơ sở</label>
                </div>
                <div class="input-field col s12">
                    <input id="address" value="{{($base!=null)?$base->address:''}}" name="address" type="text"
                           class="validate">
                    <label for="address">Địa chỉ</label>
                </div>
                <div class="input-field col s12">
                    <select name="center">
                        <option value="0" {{$base!=null && $base->center == 0?'selected':''}}>No</option>
                        <option value="1" {{$base!=null && $base->center == 1?'selected':''}}>Yes</option>
                    </select>
                    <label>Cần người trực?</label>
                </div>
                <div class="col s12">
                    <input type="submit" value="submit" class="btn"/>
                </div>
            </div>

        </form>
    </div>
    @if($base != null)
        <h4>Danh sách phòng</h4>
        <form class="col s12" method="post" action="{{url('manage/storeroom')}}">
            {{csrf_field()}}
            <input type="hidden" name="base_id" value="{{$base->id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input name="name" id="name" placeholder="Tên phòng" type="text" class="validate">
                </div>
                <div class="col s12">
                    <input type="submit" value="Tạo" class="btn"/>
                </div>
            </div>

        </form>
        <div class="row">
            <div class="col s12">
                <ul class="collection with-header">
                    @foreach($base->rooms as $room)
                        <li class="collection-item">
                            <div>{{$room->name}}<a onclick="return confirm('Are you sure?')"
                                                   href="{{url('manage/deleteroom/'.$room->id)}}"
                                                   class="secondary-content"><i class="material-icons">delete</i></a>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif
    <script>
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection