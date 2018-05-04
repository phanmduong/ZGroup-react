<div class="form-group">
    <label for="question{{$question->id}}">{{$question->content}}</label>
    @foreach($question->answers as $answer)
        <div class="form-check">
            <input class="form-check-input" 
                required
                name="{{$question->order}}" 
                type="radio" id="answer{{$answer->id}}"
                value="{{$answer->content}}"/>
            <label for="answer{{$answer->id}}" class="form-check-label">{{$answer->content}}</label>
        </div>
    @endforeach
</div>