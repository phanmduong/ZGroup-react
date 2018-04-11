@extends('layouts.app')

@section('title','Dashboard')

@section('content')
    {{--<style>--}}
    {{--.tabs::-webkit-scrollbar {--}}
    {{--display: none;--}}
    {{--}--}}

    {{--</style>--}}
    <div class="row">
        <select id="gen-select">
            @foreach($gens as $gen)
                <option {{($current_gen->id == $gen->id)?"selected":""}} value="{{$gen->id}}">Khoá {{$gen->name}}</option>
            @endforeach
        </select>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s3" onclick="getDashboardData()"><a href="#data-all-base">Tất cả</a></li>
                @foreach($bases as $base)
                    <li class="tab col s3" onclick="getDashboardData({{$base->id}})"><a href="#data-base-{{$base->id}}"
                        >{{$base->name}}</a></li>
                @endforeach
            </ul>
        </div>
        @foreach($bases as $base)
            <div id="data-base-{{$base->id}}" class="col s12"></div>
        @endforeach
        
        <div id="data-all-base" class="col s12"></div>
    </div>



    <script>
        var preloader = "<div style='text-align:center;width:100%;margin-top:30px'>" 
                    + "<div class='preloader-wrapper big active'>"
                    + "<div class='spinner-layer spinner-blue'>"
                    + "<div class='circle-clipper left'>"
                    + "<div class='circle'></div>"
                    + "</div><div class='gap-patch'>"
                    + "<div class='circle'></div>"
                    + "</div><div class='circle-clipper right'>"
                    + "<div class='circle'></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>";
        var current_base_id;
        var current_gen_id = {{$current_gen->id}};
        $(document).ready(function() {
            $('select').material_select();
            $('#gen-select').on('change', function() {
                current_gen_id = this.value;
                if (current_base_id){
                    getDashboardData(current_base_id); 
                } else{
                    getDashboardData(); 
                }
                
            });
        });
        var previousContainer = "#data-all-base";
        function getDashboardData(base_id) {
            var url = '{{url('manage/getdashboarddata')}}';
            $(previousContainer).html(preloader);
            var dataContainer = "#data-all-base";
            previousContainer = "#data-all-base";
            if (base_id) {
                current_base_id = base_id;
                url = url + "?base_id=" + base_id;
                dataContainer = "#data-base-" + base_id;
                previousContainer = dataContainer;
                $(dataContainer).html(preloader);
                if (current_gen_id) {
                    url = url + "&gen_id=" + current_gen_id;
                }
            } else {
                current_base_id = null; 
                if (current_gen_id) {
                    url = url + "?gen_id=" + current_gen_id;
                }
            }   

            $.get(
                    url,
                    function (data, status) {
                        $(dataContainer).html(data);
                        console.log(status);
                    }
            ).fail(function () {
                $(dataContainer).html('<h3>Có lỗi xảy ra</h3>');
            });
        }
        $(document).ready(function () {
            $('ul.tabs').tabs();
            getDashboardData();

        });
    </script>
@endsection
