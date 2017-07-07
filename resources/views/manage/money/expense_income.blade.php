@extends('layouts.app')

@section('title','Cân đối thu chi')

@section('content')
    <h3 class="header">
        Cân đối thu chi
    </h3>
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($years as $y)
                    <option value="{{url('manage/expenseincome/'.$y)}}"
                            {{$year == $y?"selected":""}}>Năm {{$y}}</option>
                @endforeach
            </select>
            <label>Năm</label>
        </div>
    </div>

    <div class="row">
        <div class="col s12 m8">
            <canvas id="incomeExpenseChart" height="500" width="800"></canvas>
        </div>
    </div>



    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js"></script>
    <script>
        $(document).ready(function () {
            $(document).ready(function () {
                $('select').material_select();
                $("#gen-select").change(function () {
                    if ($(this).val() != '') {
                        window.location.href = $(this).val();
                    }
                });
            });

            var data = {
                labels:{!!  $months_str!!},
                datasets: [
                    {
                        label: "Thu",
                        backgroundColor: "rgba(151,187,205,0.5)",
                        borderWidth: 1,
                        data: {!! $income_str!!},
                    },
                    {
                        label: "Chi",
                        backgroundColor: "rgba(255,0,100,0.5)",
                        borderWidth: 1,
                        data: {!!$expense_str!!},
                    }
                ]
            };
            var ctx = "incomeExpenseChart";
            var chartInstance = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var value = tooltipItem.yLabel;
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);

                                // Convert the array to a string and format the output
                                value = value.join('.');
                                return value + " vnđ";
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,

                                // Return an empty string to draw the tick line but hide the tick label
                                // Return `null` or `undefined` to hide the tick line entirely
                                userCallback: function (value, index, values) {
                                    // Convert the number to a string and splite the string every 3 charaters from the end
                                    value = value.toString();
                                    value = value.split(/(?=(?:...)*$)/);

                                    // Convert the array to a string and format the output
                                    value = value.join('.');
                                    return value + " vnđ";
                                }
                            }
                        }]
                    }
                }
            });
        });

    </script>
@endsection
