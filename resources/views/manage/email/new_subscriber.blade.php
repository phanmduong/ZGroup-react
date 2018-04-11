@extends('layouts.app')

@section('title','Add Emails')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">Thêm emails</h3>
        </div>
    </div>
    <div class="row">
        <form class="col s12" method="post" action="{{url('manage/store_subscriber')}}">
            {{csrf_field()}}
            <div class="row">
                {{--<div class="input-field col s12">--}}
                {{--<div class="row">--}}
                {{--<textarea id="emails" name="emails" class="materialize-textarea"></textarea>--}}
                {{--<label for="emails">Paste nội dung có chứa emails vào đây (Các email cần được ngăn cách bởi dấu--}}
                {{--bất kì. Ví dụ: Phẩy, Cách, Chấm ...)</label>--}}
                {{--</div>--}}
                {{--</div>--}}
                <div class="col s12">
                    <p>Paste nội dung có chứa emails vào đây (Các email cần được ngăn cách bởi dấu Phẩy hoặc dấu Cách.)</p>
                    <input id="emails" name="emails" type="hidden"required >
                    <ul id="email_tags">
                    </ul>
                </div>
            </div>
            <input type="hidden" name="list_id" value="{{$list_id}}"/>
            <div class="row">
                <div class="col s12">
                    <input type="submit" class="btn"/>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="collapsible" data-collapsible="accordion">


                @if(Session::has('imported'))
                    <li>
                        <div class="collapsible-header"> Đã import: <strong>{{count(Session::get('imported'))}}</strong>
                            email
                        </div>
                        <div class="collapsible-body">
                            <p>Danh sách email đã import:</p>
                            <p>
                                @foreach(Session::get('imported') as $email)
                                    <span>{{$email}}, </span>
                                @endforeach
                            </p>
                        </div>
                    </li>
                @endif

                @if(Session::has('duplicated'))
                    <li>
                        <div class="collapsible-header"> Bị trùng:
                            <strong>{{count(Session::get('duplicated'))}}</strong> email
                        </div>
                        <div class="collapsible-body">
                            <p>Danh sách email bị trùng:</p>
                            <p>
                                @foreach(Session::get('duplicated') as $email)
                                    <span>{{$email}}, </span>
                                @endforeach
                            </p>
                        </div>
                    </li>
                @endif
            </ul>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("#email_tags").tagit({
                singleField: true,
                singleFieldNode: $('#emails'),
                beforeTagAdded: function (event, ui) {

                    if (!ui.duringInitialization) {
                        var tagArray = ui.tagLabel.split(/[\s,]+/);
                        if (tagArray.length > 1) {
                            for (var i = 0, max = tagArray.length; i < max; i++) {
                                $("#email_tags").tagit("createTag", tagArray[i]);
                            }
                            return false;
                        }
                    }
                }

            });
        });
    </script>
@endsection
