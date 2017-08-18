@extends('layouts.app')

@section('title','Danh sách khoá học')

@section('content')
    <h3 class="header">
        Khoá
    </h3>
    <div class="row">
        <p>Tổng số khoá: <strong>{{$total}}</strong></p>


        <p>Khoá tuyển sinh hiện tại: <strong>{{$current_gen->name}}</strong></p>
        <p>Khoá giảng dạy hiện tại: <strong>{{$current_teach_gen->name}}</strong></p>


        <p>
            <a class="modal-trigger waves-effect waves-light btn" href="#modal-add-gen1">
                <i class="tiny-icons left fa fa-plus"></i>Thêm khoá mới
            </a>
        </p>

        <!-- Modal Structure -->
        <div id="modal-add-gen1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <form method="post" action="{{url('manage/storegen')}}">
                    {{csrf_field()}}

                    <div class="row">
                        <div class="input-field col s12">
                            <input id="name" name="name" type="text" class="validate">
                            <label for="name">Tên khoá</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="description" name="description" type="text">
                            <label for="description">Mô tả</label>
                        </div>
                        <div class="col s12">
                            <label>Thời gian bắt đầu</label>
                            <input id="start_time" name="start_time" type="text" placeholder="Thời gian bắt đầu"
                                   class="datepicker">
                        </div>
                        <div class="col s12">
                            <label>Thời gian kết thúc</label>
                            <input id="end_time" name="end_time" placeholder="Thời gian kết thúc" type="text"
                                   class="datepicker">
                        </div>

                        <div class="col s12">
                            <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                                   id="submit"/>
                        </div>


                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Done</a>
            </div>

        </div>

        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết</th>
                <th>Danh sách học viên đóng tiền</th>
            </tr>
            </thead>

            <tbody>
            @foreach($gens as $gen)
                <tr>
                    <td><a href="{{url('manage/editgen/'.$gen->id)}}">{{$gen->name}}</a></td>
                    <td>{{date('d/m/Y',strtotime($gen->start_time))}}</td>
                    <td>{{date('d/m/Y',strtotime($gen->end_time))}}
                    <td><a href="{{url('/download/danh-sach-hoc-vien-dong-tien?genid='.$gen->id)}}"
                           class="waves-effect waves-light btn">Download</a></td>

                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/gens/'.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/gens/'.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect" href="{{url('manage/gens/'.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
    <script>
        $(document).ready(function () {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
            $('.datepicker').datepicker();
        });
    </script>

@endsection
