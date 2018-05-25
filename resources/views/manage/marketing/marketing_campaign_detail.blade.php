@extends('layouts.app')

@section('title','Danh sách chiến dịch')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">{{$campaign->name}}</h3>
        </div>
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/marketing-campaign-detail/'.$campaign->id.'?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>

        <div class="col s12">
            <h5>Tình trạng chốt đơn của các nhân viên</h5>
            <div style="padding: 20px 0">
                @foreach($salers as $saler)
                    {{$saler->name}}
                    : {{$saler->sale_registers()->where('money','>',0)
                    ->where('gen_id',$current_gen->id)->where('campaign_id',$campaign->id)->count()}}
                    /{{$saler->sale_registers()->where('gen_id',$current_gen->id)->where('campaign_id',$campaign->id)->count()}}
                    <div class="progress">
                        <div class="determinate"
                             style="width: {{$saler->sale_registers()
                             ->where('money','>',0)->where('gen_id',$current_gen->id)
                             ->where('campaign_id',$campaign->id)->count()*100/
                             $saler->sale_registers()
                             ->where('gen_id',$current_gen->id)->where('campaign_id',$campaign->id)->count()}}%"></div>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col s12">
            <h5>Đăng kí/đóng tiền trong từng ngày</h5>
            <canvas id="registers-paid-chart" style="width: 100%;"></canvas>
        </div>
    </div>

    <script>


        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
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


            // Đăng kí/đóng tiền trong từng ngày
            var campaignData = {
                labels: JSON.parse('{!!  $date_labels!!}'),
                datasets: [
                    {
                        label: "Số người đăng kí theo ngày",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: JSON.parse('{!! $total_registers_data !!}')
                    },
                    {
                        fillColor: "rgba(255,0,100,0.5)",
                        strokeColor: "rgba(255,0,100,0.5)",
                        highlightFill: "rgba(255,0,100,0.5)",
                        highlightStroke: "rgba(255,0,100,0.5)",
                        data: JSON.parse('{!! $total_paids_data !!}')
                    }
                ]
            };
            var ctxRegistersPaids = $("#registers-paid-chart").get(0).getContext("2d");
            new Chart(ctxRegistersPaids).Bar(campaignData, options);
        });
    </script>
@endsection
