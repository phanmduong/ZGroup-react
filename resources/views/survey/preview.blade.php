@foreach($survey->questions as $question)
    @include(question_view($question->type), ['question' => $question])
@endforeach