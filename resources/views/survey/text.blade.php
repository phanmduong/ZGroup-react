<div class="form-group">
    <label for="question{{$question->id}}">{{$question->content}}</label>
    <input id="question{{$question->id}}" name="{{$question->order}}" required type="text" class="form-control">    
    <div class="invalid-feedback">
        Bạn cần nhập nội dung
    </div>
</div>