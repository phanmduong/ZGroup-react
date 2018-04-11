@extends('layouts.app')

@section('title','Tổng kết sale')

@section('content')
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/sales?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>
    <div class="row">
        @foreach($salers as $saler)
            <div class="col s12">
                <img style="width:15px;height:15px" src="{{$saler->avatar_url}}">
                <strong>{{$saler->name}}</strong>
            </div>
            <div class="col s12 m6">
                @if ($saler->count_total != 0)
                    <div class="progress" style="height: 10px">
                        <div class="determinate" style="width: {{$saler->count_paid*100/$saler->count_total}}%"></div>
                    </div>
                    <p>
                        Tỉ lệ chốt đơn: <strong>{{round($saler->count_paid*100/$saler->count_total)}} %
                            ({{$saler->count_paid}}
                            /{{$saler->count_total}})</strong>
                    </p>
                @else
                    <p>Chưa chốt đơn nào</p>
                @endif
                <table>
                    <thead>
                    <tr>
                        <th>Tên lớp</th>
                        <th>Số đăng kí</th>
                        <th>Số tiền</th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach($saler->registers as $course)
                        <tr>
                            <td>{{$course['name']}}</td>
                            <td>{{$course['count']}}</td>
                            <td>{{currency_vnd_format($course['count'] * $course['sale_bonus'])}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

                <p>
                <table>
                    <thead>
                    <tr>
                        <th>Mức thưởng</th>
                        <th>Số đăng ký</th>
                        <th>Số tiền</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>Thưởng 20k</td>
                        <td>{{$saler->bonus_20}}</td>
                        <td>{{currency_vnd_format($saler->bonus_20 * 20000)}}</td>
                    </tr>

                    <tr>
                        <td>Thưởng 50k</td>
                        <td>{{$saler->bonus_50}}</td>
                        <td>{{currency_vnd_format($saler->bonus_50 * 50000)}}</td>
                    </tr>

                    </tbody>
                </table>
                </p>

                <p>
                    Thưởng tổng cộng: <strong>{{currency_vnd_format($saler->bonus)}}</strong>
                </p>
                <div>
                    <a class="btn" href="/manage/sale-list?gen_id={{$gen_id}}&saler_id={{$saler->id}}">Xem danh sách</a>
                </div>
            </div>

            @if($saler->draw_pie_chart)
                <div class="col s12 m6">
                    <canvas id="campaign-chart{{$saler->id}}" style="width: 100%;"></canvas>
                    <p style="text-align: center"><strong>Số lượng nộp tiền theo chiến dịch</strong></p>
                </div>
            @endif

            <div class="col s12">
                <canvas id="personal-chart{{$saler->id}}" style="width: 100%;"></canvas>
            </div>
            <script>
                var options = {
                    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                    scaleBeginAtZero: true,

                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines: true,

                    //String - Colour of the grid lines
                    scaleGridLineColor: "rgba(0,0,0,.05)",

                    //Number - Width of the grid lines
                    scaleGridLineWidth: 1,

                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,

                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines: true,

                    //Boolean - If there is a stroke on each bar
                    barShowStroke: true,

                    //Number - Pixel width of the bar stroke
                    barStrokeWidth: 2,

                    //Number - Spacing between each of the X value sets
                    barValueSpacing: 5,

                    //Number - Spacing between data sets within X values
                    barDatasetSpacing: 1

                    //String - A legend template
                };
                var personal{{$saler->id}} = {
                    labels: JSON.parse('{!!  $date_array!!}'),
                    datasets: [
                        {
                            label: "Số người đăng kí theo ngày",
                            fillColor: "rgba(151,187,205,0.5)",
                            strokeColor: "rgba(151,187,205,0.8)",
                            highlightFill: "rgba(151,187,205,0.75)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: JSON.parse('{!! json_encode($saler->registers_by_date_personal) !!}')
                        },
                        {
                            label: "Số người đăng kí theo ngày",
                            fillColor: "rgba(255,0,100,0.5)",
                            strokeColor: "rgba(255,0,100,0.5)",
                            highlightFill: "rgba(255,0,100,0.5)",
                            highlightStroke: "rgba(255,0,100,0.5)",
                            data: JSON.parse('{!! json_encode($saler->paid_by_date_personal) !!}')
                        }
                    ]
                };


                var ctxPersonalRegisterData{{$saler->id}} = $("#personal-chart{{$saler->id}}").get(0).getContext("2d");
                var dateRegisterPersonal{{$saler->id}} = new Chart(ctxPersonalRegisterData{{$saler->id}}).Bar(personal{{$saler->id}}, options);
            </script>
            @if($saler->draw_pie_chart)
                <script>
                    var pieChartdata{{$saler->id}} = {!!  $saler->campaign_paids!!};

                    var pieChartContext{{$saler->id}} = $("#campaign-chart{{$saler->id}}").get(0).getContext("2d");

                    var pieChart{{$saler->id}} = new Chart(pieChartContext{{$saler->id}})
                        .Pie(pieChartdata{{$saler->id}}, {
                            animateRotate: false
                        });
                </script>
            @endif
        @endforeach
    </div>
    <script>
        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
        });
    </script>
@endsection
