@extends('layouts.app')

@section('title','Survey')

@section('content')
    <h5>{{$survey->name}}</h5>
    <a class="waves-effect waves-light btn modal-trigger" href="#preview">Preview</a>
    
    
    <!-- Modal Structure -->
    <div id="preview" class="modal">
        <div class="modal-content">
            <h4 style="margin-bottom: 10px">Preview</h4>
            <form method="post" action="{{url('survey/storesurveyanswer')}}">
                {{csrf_field()}}
                <input type="hidden" value="{{$survey->id}}" name="survey_id">
                <input type="hidden" value="18" name="class_id">
                <div id="preview_content"></div>
            </form>
        </div>
    
    </div>
    <form method="post" action="{{url('manage/storequestion')}}">
        <div class="row">
            {{csrf_field()}}
            <div class="input-field col s12 m4">
                <input type="text" class="validate" name="question_content" id="question_content">
                <label for="question_content">Câu hỏi</label>
            </div>
            <div class="input-field col m4 s12">
                <input type="text" class="validate" name="order" id="order">
                <label for="order">Số thứ tự</label>
            </div>
            <div class="input-field col s4">
                <select name="type">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="0">{{question_type(0)}}</option>
                    <option value="1">{{question_type(1)}}</option>
                    <option value="2">{{question_type(2)}}</option>
                </select>
                <label>Loại câu hỏi</label>
            </div>
            <input type="hidden" name="survey_id" value="{{$survey->id}}"/>
            <div class="col s12">
                <input class="waves-effect waves-light btn" type="submit" value="Tạo"/>
            </div>
        </div>
    </form>
    
    
    <ul class="collapsible" data-collapsible="accordion">
        @foreach($survey->questions->sortBy('order') as $question)
            <li id="question-{{$question->id}}">
                <div class="collapsible-header">{{$question->order}}
                    . {{$question->content}} {!! ($question->type != 0)?"(<span id='answer-count-".$question->id."'>".$question->answers()->count()."</span> lựa chọn)":'' !!}
                    <span style="float:right">
                        <span>{{question_type($question->type)}}</span>
                        <span style="color:red;margin-left:15px" id="delete-{{$question->id}}">
                            <a href="#" style="color:red" onclick="deleteQuestion({{$question->id}})">Delete</a>
                        </span>
                    </span>
                </div>
                @if($question->type!=0)
                    <div class="collapsible-body">
                        
                        <div class="row">
                            <div class="input-field col m5 s8">
                                <input type="text" class="validate" name="input-answer-{{$question->id}}"
                                       id="input-answer-{{$question->id}}">
                                <label for="order">Câu trả lời</label>
                            </div>
                            <div style="padding-top: 15px" class="col m7 s4">
                                
                                <button onclick="saveAnswer({{$question->id}})" class="waves-effect waves-light btn">
                                    Thêm
                                </button>
                            </div>
                        </div>
                        
                        <div class="row" id="answersContainer{{$question->id}}">
                            
                            
                            <ul class="collection">
                                @foreach($question->answers as $answer)
                                    <li class="collection-item">{{$answer->content}}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                @endif
            </li>
        @endforeach
    </ul>
    <script>
        function deleteQuestion(question_id) {
            $('#delete-' + question_id).text('deleting');
            $.post(
                    '{{url('api/deletequestion')}}',
                    {
                        question_id: question_id,
                        _token: '{{csrf_token()}}',
                    }, function (data, status) {
                        console.log(data);
                        $('#question-' + question_id).remove();
                    }
            );
        }
        function saveAnswer(question_id) {
            var content = $('#input-answer-' + question_id).val();
            $('#input-answer-' + question_id).val('');
            var answerCount = parseInt($('#answer-count-' + question_id).html());
            $('#answer-count-' + question_id).html(++answerCount);
            $('#answersContainer' + question_id).append('<p>' + content + '</p>');
            $.post(
                    '{{url('survey/storeanswer')}}',
                    {
                        question_id: question_id,
                        _token: '{{csrf_token()}}',
                        answer_content: content
                    }, function (data, status) {
                        console.log(data)
                    }
            );
        }
        $(document).ready(function () {
            $('select').material_select();
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            
            $('.modal').modal(
                    {
                        dismissible: true, // Modal can be dismissed by clicking outside of the modal
                        opacity: .5, // Opacity of modal background
                        in_duration: 300, // Transition in duration
                        out_duration: 200, // Transition out duration
                        ready: function () {
                            
                            $.post(
                                    '{{url('survey/preview')}}',
                                    {
                                        _token: '{{csrf_token()}}',
                                        survey_id: '{{$survey->id}}',
                                    },
                                    function (data, status) {
                                        $('#preview_content').html(data);
                                    }
                            );
                        }, // Callback for Modal open
                        complete: function () {
                            $('#preview_content').html('Đang tải');
                        } // Callback for Modal close
                    }
            );
        });
    </script>

@endsection
