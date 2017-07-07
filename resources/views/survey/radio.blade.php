<p>
    {{$question->content}}
</p>
@foreach($question->answers as $answer)
    <p>
        <input class="with-gap" name="question{{$question->id}}" type="radio" id="answer{{$answer->id}}"
               value="{{$answer->content}}"/>
        <label for="answer{{$answer->id}}">{{$answer->content}}</label>
    </p>
@endforeach