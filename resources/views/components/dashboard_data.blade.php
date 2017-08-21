<div class="row">
    <div class="col s12 m6">
        <p>Tổng số tiền đã thu <strong>{{currency_vnd_format($total_money)}}</strong></p>
        <p>Tổng số đăng kí <strong>{{$register_number}}</strong></p>
        <p>Số học viên nộp 0 đồng <strong>{{$zero_paid_num}}</strong></p>
        <p>Số lượng học viên đã đóng tiền <strong>{{$paid_number}}</strong></p>
        <p>Số lượng học viên chưa gọi điện <strong>{{$uncalled_number}}</strong></p>
        <p>Tổng số lớp <strong>{{$total_classes}}</strong></p>
        <p>Số ngày còn lại <strong>{{$remain_days}}</strong></p>
        <p>Doanh thu chỉ tiêu <strong>{{currency_vnd_format($target_revenue)}}</strong></p>

        <div>
            {{currency_vnd_format($total_money)}}/{{currency_vnd_format($target_revenue)}}
            <div class="progress" style="height: 10px">
                <div class="determinate" style="width: {{$total_money*100/$target_revenue}}%"></div>
            </div>
        </div>


    </div>
    @if(isset($campaign_paids))
        <div class="col s12 m6">
            <canvas id="campaign-chart" style="width: 100%;"></canvas>
            <p style="text-align: center"><strong>Số lượng nộp tiền theo chiến dịch</strong></p>
        </div>

        <script>
            var pieChartdata = {!! $campaign_paids!!};

            var pieChartContext = $("#campaign-chart").get(0).getContext("2d");

            var pieChart = new Chart(pieChartContext)
                .Pie(pieChartdata, {
                    animateRotate: false
                });
        </script>
    @endif

    @if(count($registers_by_date_personal_temp)>0)
        <div class="col s12" style="padding-bottom: 40px">
            <div>
                <div class="progress" style="height: 10px">
                    <div class="determinate" style="width: {{$count_paid*100/$count_total}}%"></div>
                </div>
            </div>
            <p>
                Tỉ lệ chốt đơn: <strong>{{round($count_paid*100/$count_total)}} %
                    ({{$count_paid}}
                    /{{$count_total}})</strong>
            </p>
            <p>
                Thưởng: <strong>{{$bonus}}</strong>
            </p>
            <div>
                <a class="btn" href="/manage/sale-list?gen_id={{$gen_id}}&saler_id={{$user_id}}">Xem danh sách</a>
            </div>
        </div>

        <h3 class="header">Số lượng đăng kí theo ngày của {{$user->name}}</h3>
        <canvas id="date-register-personal" style="width: 100%;"></canvas>

    @endif

    <div class="col s12">
        <h3 class="header">Số lượng đăng kí theo ngày</h3>
        <canvas id="date-register" style="width: 100%;"></canvas>
    </div>
    <div class="col s12">
        <h3 class="header">Số lượng đăng kí theo giờ</h3>
        <canvas id="hour-register" style="width: 100%;"></canvas>
    </div>

    <div class="col s12">
        <h3 class="header">Doanh thu theo ngày</h3>
        <canvas id="date-money" style="width: 100%;"></canvas>
    </div>

    @if($orders_by_hour)
        <div class="col s12">
            <h3 class="header">Số đơn đặt hàng sách trong vòng 28 ngày</h3>
            <canvas id="date-order" style="width: 100%;"></canvas>
        </div>
    @endif

    <div class="col s12">
        <h3 class="header">Danh sách lớp</h3>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th></th>
                <th>Tên</th>
                <th style="width:70px">Cơ sở</th>
                <th>Học viên đã nộp tiền</th>
                <th>Số người đăng kí</th>
                <th>Thời gian học</th>
                <th>Ngày khai giảng</th>
                <th>Trạng thái Lớp</th>
                {{--<th style="min-width: 170px">Kích hoạt</th>--}}
            </tr>
            </thead>

            <tbody>
            @foreach($classes as $class)
                <tr>
                    <td>
                        <img width="40" class="circle" src="{{$class->course->icon_url}}"/>
                    </td>
                    <td><a href="{{url('classes/'.$class->id.'/students')}}">{{$class->name}}</a></td>
                    <td>{{$class->base ? $class->base->name : "Không thuộc cơ sở nào"}}</td>
                    <td class="green-text">
                        @if($class->target>0)
                            {{$class->registers->where('status',1)->count()}}/{{$class->target}}
                            <div class="progress">
                                <div class="determinate"
                                     style="{!!'width:'.(($class->registers->where('status',1)->count()*100)/$class->target)!!}%"></div>
                            </div>
                        @endif

                    </td>
                    <td class="blue-text">
                        @if($class->regis_target>0)
                            {{$class->registers->count()}}/{{$class->regis_target}}
                            <div class="progress blue lighten-4">
                                <div class="determinate blue"
                                     style="{!!'width:'.(($class->registers->count()*100)/$class->regis_target)!!}%"></div>
                            </div>
                        @endif
                    </td>
                    <td>
                        {{$class->study_time}}
                    </td>
                    <td>
                        {{$class->datestart}}
                    </td>
                    <td>
                        @if($user->role == 2)
                            <div class="switch">
                                <label>
                                    <input name="status" id="class_status{{$class->id}}"
                                           onclick="change_status({{$class->id}});"
                                           type="checkbox" {{($class->status==1)?"checked":""}} />
                                    <span class="lever"></span>
                                </label>
                            </div>
                        @else
                            {{($class->status==1)?"Mở":"Đóng"}}
                        @endif
                    </td>
                    {{--<td id="activate{{$class->id}}">--}}
                        {{--@if($class->activated == 1)--}}
                            {{--<strong class="cyan-text">Đã kích hoạt</strong>--}}
                        {{--@else--}}
                            {{--<button onclick="activate('{{$class->id}}')" class="waves-effect waves-light btn cyan">--}}
                                {{--Kích--}}
                                {{--hoạt--}}
                            {{--</button>--}}
                        {{--@endif--}}
                    {{--</td>--}}
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
<script>

    function activate(id) {
        $('#activate' + id).html("<strong class='red-text'>Đang gửi mail...</strong>");
        $.post('{{url('manage/activateclass')}}', {
            _token: '{{csrf_token()}}',
            class_id: id
        }, function (data, status) {
            $('#activate' + id).html(data);
            $('#class_status' + id).removeAttr("checked");
        });
    }
    function change_status(id) {
        $.post("{{url('manage/changeclassstatus')}}",
            {
                "class_id": id,
                '_token': '{{csrf_token()}}'
            },
            function (data, status) {
                console.log(status);
            });
    }

    var ctx = $("#date-register").get(0).getContext("2d");

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

    var data = {
        labels: JSON.parse('{!!  $date_array!!}'),
        datasets: [
            {
                label: "Số người đăng kí theo ngày",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: JSON.parse('{!! $registers_by_date !!}')
            },
            {
                fillColor: "rgba(255,0,100,0.5)",
                strokeColor: "rgba(255,0,100,0.5)",
                highlightFill: "rgba(255,0,100,0.5)",
                highlightStroke: "rgba(255,0,100,0.5)",
                data: JSON.parse('{!! $paid_by_date !!}')
            }
        ]
    };


    var hourdata = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: "Số người đăng kí theo giờ",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: JSON.parse('{!! $registers_by_hour !!}')
            }
        ]
    };

    var dateMoney = {
        labels: JSON.parse('{!!  $date_array!!}'),
        datasets: [
            {
                label: "Doanh thu theo ngày",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: JSON.parse('{!! $money_by_date !!}')
            }
        ]
    };

    var ctxhour = $("#hour-register").get(0).getContext("2d");
    var ctxMoneyDate = $("#date-money").get(0).getContext("2d");


    var dateRegister = new Chart(ctx).Bar(data, options);

    var hourRegister = new Chart(ctxhour).Bar(hourdata, options);
    var dateMoneyChart = new Chart(ctxMoneyDate).Bar(dateMoney, options);
</script>
@if(count($registers_by_date_personal_temp)>0)
    <script>
        var register_personal_data = {
            labels: JSON.parse('{!!  $date_array!!}'),
            datasets: [
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: JSON.parse('{!! json_encode($registers_by_date_personal) !!}')
                },
                {
                    fillColor: "rgba(255,0,100,0.5)",
                    strokeColor: "rgba(255,0,100,0.5)",
                    highlightFill: "rgba(255,0,100,0.5)",
                    highlightStroke: "rgba(255,0,100,0.5)",
                    data: JSON.parse('{!! json_encode($paid_by_date_personal) !!}')
                }
            ]
        };
        if ($("#date-register-personal").get(0)) {
            var ctxPersonalRegisterData = $("#date-register-personal").get(0).getContext("2d");
            var dateRegisterPersonal = new Chart(ctxPersonalRegisterData).Bar(register_personal_data, options);
        }
    </script>
@endif
@if($orders_by_hour)
    <script>
        var ctxOrderDate = $("#date-order").get(0).getContext("2d");
        var orderdata = {
            labels: JSON.parse('{!! $month_ago!!}'),
            datasets: [
                {
                    label: "Số đơn đặt hàng sách trong vòng 28 ngày",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: JSON.parse('{!! $orders_by_hour !!}')
                }
            ]
        };
        var dateOrder = new Chart(ctxOrderDate).Bar(orderdata, options);
    </script>
@endif