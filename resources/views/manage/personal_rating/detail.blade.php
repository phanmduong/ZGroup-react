@extends('layouts.app')

@section('title',$person->name)

@section('content')
    <?php
    use App\Register;
    ?>
    <div class="row">
        <h3 class="header">{{$person->name}}</h3>
        <h5></h5>
        <div class="col s12">
            <table class="responsive-table striped centered">
                <thead>
                <tr>
                    <th>Lớp</th>
                    <th>Đánh giá trung bình</th>
                    <th>Số người đánh giá</th>
                    <th></th>
                </tr>
                </thead>
                @if($role == 't')
                    <tbody>
                    @foreach($person->teach()->orderBy('created_at','desc')->where('rating_sended',1)->get() as $class)
                        <tr>
                            <?php
                            $rating_avg = Register::where('class_id', $class->id)->where('rating_teacher', '>', -1)->avg('rating_teacher');
                            $rated_number = Register::where('class_id', $class->id)->where('rating_teacher', '>', -1)->count();
                            $total_rates = Register::where('class_id', $class->id)->count();
                            if ($total_rates != 0) {
                                $rated_ratio = $rated_number * 100 / $total_rates;
                            } else {
                                $rated_ratio = 0;
                            }

                            ?>
                            <td>{{$class->name}}</td>
                            <td>{{number_format($rating_avg,1)}}</td>
                            <td>
                                {{$rated_number}}/{{$total_rates}}
                                <div class="progress">
                                    <div class="determinate" style="width: {{$rated_ratio}}%"></div>
                                </div>
                            </td>
                            <td><a href="{{url('manage/allrating?role=t&id='.$class->id)}}">Chi tiết</a></td>
                        </tr>
                    @endforeach
                    </tbody>
                @endif

                @if($role == 'ta')
                    <tbody>
                    @foreach($person->assist()->orderBy('created_at','desc')->where('rating_sended',1)->get() as $class)
                        <tr>
                            <?php
                            $rating_avg = Register::where('class_id', $class->id)->where('rating_ta', '>', -1)->avg('rating_ta');
                            $rated_number = Register::where('class_id', $class->id)->where('rating_ta', '>', -1)->count();
                            $total_rates = Register::where('class_id', $class->id)->count();
                            if ($total_rates != 0) {
                                $rated_ratio = $rated_number * 100 / $total_rates;
                            } else {
                                $rated_ratio = 0;
                            }

                            ?>
                            <td>{{$class->name}}</td>
                            <td>{{number_format($rating_avg,1)}}</td>
                            <td>
                                {{$rated_number}}/{{$total_rates}}
                                <div class="progress">
                                    <div class="determinate" style="width: {{$rated_ratio}}%"></div>
                                </div>
                            </td>
                            <td><a href="{{url('manage/allrating?role=ta&id='.$class->id)}}">Chi tiết</a></td>
                        </tr>
                    @endforeach
                    </tbody>
                @endif
            </table>

        </div>
    </div>

@endsection
