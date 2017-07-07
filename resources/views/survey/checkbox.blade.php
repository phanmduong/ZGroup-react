<p>
    {{$question->content}}
</p>
@foreach($question->answers as $answer)
    <p>
        <input type="checkbox" id="answer{{$answer->id}}" name="question{{$question->id}}[]" value="{{$answer->content}}"/>
        <label for="answer{{$answer->id}}">{{$answer->content}}</label>
    </p>
@endforeach