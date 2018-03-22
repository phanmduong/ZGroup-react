@foreach($rule_chapters as $rule_chapter)
    <h4><strong>PHẦN {{$rule_chapter->order}}: {{$rule_chapter->name}}</strong></h4>
    <p>{{$rule_chapter->description}}</p>
    @foreach($rule_chapter->rules as $rule_parent)
        <h6><strong>Mục {{$rule_parent->order}}: {{$rule_parent->name}}</strong></h6>
        {{$rule_parent->description}}
        @if(count($rule_parent->rule_childs) > 0)
            <blockquote style="font-size:15px">
                @foreach($rule_parent->rule_childs as $rule_child)
                    <strong>Điều {{$rule_child->order}}: {{$rule_child->name}}</strong>
                    <br>{{$rule_child->description}}<br>
                    @if(count(($rule_child->finesRewards)) > 0)
                        <blockquote style="font-size:15px">
                            @foreach($rule_child->finesRewards as $fineReward)
                                @if($fineReward->kind == 1)
                                    <strong style="color:#c50000">Hình thức xử lý: </strong>{{$fineReward->description}}
                                    <br/>
                                @else
                                    <strong style="color:#00c505">Thưởng: </strong>{{$fineReward->description}}<br/>
                                @endif
                            @endforeach
                        </blockquote>
                    @endif
                @endforeach
            </blockquote>
        @endif
    @endforeach
    <br/>
    <br/>
@endforeach


