@extends('layouts.app')

@section('title',$cam->name)

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">{{$cam->name}}</h3>
        </div>
        @if($cam->sended == 0)
            <div class="col s12">
                <a class="btn" href="{{url('manage/campaign/edit?id='.$cam->id)}}">Edit</a>
            </div>
        @else
            <form method="post" action="{{url('manage/sendmorelist')}}">
                {{csrf_field()}}
                <div class="col s12">
                    <p>Thêm danh sách</p>
                    <input id="list_id" name="list_id" type="hidden">
                    <ul id="list_id_tag">
                    </ul>
                </div>
                <div class="col s12">
                    <p id="message" style="color: #c50000;"></p>
                </div>
                <input type="hidden" value="{{$cam->id}}" name="cam_id">
                <div class="col s12">
                    <input type="submit" class="btn teal" value="Gửi"/>
                </div>

            </form>
        @endif
        <div class="col s12">
            <p>Subject: <strong>{{$cam->subject}}</strong></p>
            @if ($cam->subscribers_lists->count() !=0)
                <p>Danh sách:</p>
                <p>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Số lượng email</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($lists as $list)
                        <tr>
                            <td>{{$list->id}}</td>
                            <td>{{$list->name}}</td>
                            <td>{{$list->subscribers->count()}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                </p>
                <p>Số lượng email: <strong>{{$total}} emails</strong> (Đã loại những email bị trùng lặp)</p>
            @else
                <p>Danh sách: <strong>Chưa chọn</strong></p>
            @endif

            <p>Template:
                @if($cam->template!=null)
                    <strong>{{$cam->template->name}} (<a target="_blank"
                                                         href="{{url('manage/template/view?id='.$cam->template->id)}}">view</a>)</strong>
                @else
                    <strong>Chưa chọn</strong>
                @endif
            </p>
        </div>
    </div>
    @if($cam->sended == 0)
        <div class="row">
            <div class="col s12">
                <ul class="collapsible" data-collapsible="accordion">
                    <li>
                        <div class="collapsible-header"><i class="material-icons">file_upload</i>Upload Email File</div>
                        <div class="collapsible-body">
                            <div class="col s12">
                                <form method="post" enctype="multipart/form-data"
                                      action="{{url('manage/campaign/store_email_template')}}">
                                    {{csrf_field()}}
                                    <input type="hidden" name="id" value="{{$cam->id}}"/>
                                    <div class="file-field input-field">
                                        <div class="btn">
                                            <span>File</span>
                                            <input name="email_template" type="file">
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input class="file-path validate" type="text">
                                        </div>
                                    </div>
                                    <input class="btn" type="submit" value="upload"/>
                                </form>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="material-icons">folder</i>Chọn từ Email có sẵn</div>
                        <div class="collapsible-body">
                            <ul class="collection">
                                @foreach($templates as $template)
                                    @if($template->id != $cam->template_id)
                                        <li class="collection-item">{{$template->name}}
                                            <span class="secondary-content">
                                        <a href="{{url('manage/template/view?id='.$template->id)}}"><i
                                                    class="material-icons">remove_red_eye</i></a>
                                        <a href="{{url('manage/campaign/select_template?cam_id='.$cam->id.'&id='.$template->id)}}"><i
                                                    class="material-icons">forward</i></a>
                                    </span>
                                        </li>
                                    @endif
                                @endforeach

                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                @if($can_send)
                    <a class="btn red darken-4" href="{{url('manage/mail/queue?id='.$cam->id)}}">Gửi</a>
                @else
                    <p>Bạn cần <strong>nhập email template</strong> và chọn <strong>danh sách gửi</strong></p>
                    <a class="btn red darken-4 disabled" onclick="return false;">Gửi</a>
                @endif
            </div>
        </div>
    @else
        <div class="row">
            <div class="col s12">
                {{--<p>Thời gian bắt đầu gửi: <strong>{{format_date_full_option($cam->updated_at)}}</strong></p>--}}
                <p>Thời gian gửi dự kiến: <strong>{{gmdate("H:i:s", $cam->send_time)}}</strong></p>
                <p>Thời gian bắt đầu gửi: <strong>{{format_date_full_option($cam->updated_at)}}</strong></p>
                <p>Tổng số mail đã gửi: <strong>{{$cam->emails()->count()}}</strong></p>
                <p>Số mail đã được nhận({{email_status_int_to_str(1)}}):
                    <strong>{{$delivery}}</strong></p>
                <p>Số mail đã được mở({{email_status_int_to_str(3)}}):
                    <strong>{{$open}}</strong></p>
                <p>Số mail ({{email_status_int_to_str(2)}}):
                    <strong>{{$bounce}}</strong></p>
                <p>Số mail bị phàn nàn({{email_status_int_to_str(4)}}):
                    <strong>{{$complaint}}</strong></p>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <a disabled="" class="btn red darken-4 disabled" onclick="return false;">Đã gửi</a>
            </div>
        </div>
    @endif
    <script>
        $(document).ready(function () {
            var tags = {!! $tags!!};

            $("#list_id_tag").tagit({
                availableTags: tags,
                singleField: true,
                singleFieldNode: $('#list_id'),
                beforeTagAdded: function (event, ui) {
                    // do something special
                    var label = ui.tagLabel;
                    var a = tags.indexOf(label);
                    if (a === -1) {
                        $('#message').html('Danh sách bạn nhập không tồn tại. Lưu ý: bạn hãy gõ tên danh sách bắt đầu từ chữ cái đầu tiên và hệ thông sẽ gợi ý');
                        return false;
                    }
                }
            });


        });
    </script>
@endsection
