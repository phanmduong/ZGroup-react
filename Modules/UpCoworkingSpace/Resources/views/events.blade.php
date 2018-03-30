@extends('upcoworkingspace::layouts.master')

@section('content')
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <div class="container">
        <div class="row" style="margin-top:150px">
            <div class="blog-4">
                <div class="container">

                    <div class="row">
                        @foreach($events as $event)
                        <div class="col-md-4" style="margin-bottom: 20px">
                            <div class="card card-blog">
                                <div class="card-image" >
                                    <a href="{{'/events/' . $event->slug}}">
                                        <div style="width: 100%;
                                                    border-radius: 15px;
                                                    background: url({{$event->avatar_url}});
                                                    background-size: cover;
                                                    background-position: center;
                                                    padding-bottom: 56%;">
                                        </div>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h5 style="min-height: 50px">
                                        <a href="{{'/events/' . $event->slug}}" class="card-category text-main-color">{{$event->name}}</a>
                                    </h5>
                                    <p class="card-description" style="color: #4a4a4a">
                                        <i class="fa fa-calendar text-main-color" aria-hidden="true"></i>
                                        {{ Carbon\Carbon::parse($event->start_date)->format('d/m/Y') }}
                                        @if($event->end_date != $event->start_date)
                                            <span > - {{ Carbon\Carbon::parse($event->end_date)->format('d/m/Y') }}</span>
                                        @endif
                                    </p>
                                    <p class="card-description" style="color: #4a4a4a">
                                        <i class="fa fa-clock-o text-main-color" aria-hidden="true"></i>
                                        {{ Carbon\Carbon::parse($event->start_time)->format('H:i') }}
                                        @if($event->end_date != $event->start_date)
                                            <span > - {{ Carbon\Carbon::parse($event->end_time)->format('H:i') }}</span>
                                        @endif
                                    </p>
                                    <br>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                    <div class="row" style="background-color: #ffffff; padding: 20px">
                        <div id="loading">
                            <i class="fa fa-spinner" aria-hidden="true" id="loadingSpinner"></i>
                            <span style="font-size:16px">Đang tải ...</span>
                        </div>
                        <div id='calendar'></div>
                    </div>
                    <br>
                    <hr>

                    <div id="pagination-events">
                        <div class="pagination-area">
                            <ul class="pagination pagination-primary justify-content-center">
                                <li class="page-item">
                                    <a href="/su-kien?page=1&search={{$search}}" class="page-link">
                                        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li v-for="page in pages"
                                    v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                                    <a v-bind:href="'/su-kien?page='+page+'&search={{$search}}'" class="page-link">
                                        @{{page}}
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a href="/su-kien?page={{$total_pages}}&search={{$search}}" class="page-link">
                                        <i class="fa fa-angle-double-right" aria-hidden="true">
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@endsection
<style>
    .fc-event {
        border: 1px solid #96d21f !important;
        background-color:  #96d21f !important; /* default BACKGROUND color */

    }

    .fc-state-default { /* non-theme */
        border: none !important;
        background: #96d21f !important;
        margin: 1px !important;
        color:white !important;
    }
    .fc-state-default.fc-corner-left { /* non-theme */
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

    }

    .fc-state-default.fc-corner-right { /* non-theme */
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;

    }

    .fc-icon-left-single-arrow, .fc-icon-right-single-arrow {
        color:white;

    }
    .fc-today-button {
        visibility: hidden;
    }
    .card-category {
        font-weight: 600;
    }
    .card-blog {
        min-height: 380px;
    }
</style>

@push('scripts')

    <script>
        var pagination = new Vue({
            el: '#pagination-events',
            data: {
                pages: []
            },
        });

        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js"></script>

    <script src="./js/fullcalendar.js"></script>
    <script type="text/javascript">
        var data = [];
        var stateLoading = false;

        function loading(state){
            if(state === true) {
                document.getElementById('loading').setAttribute("style","display: block; ");
            }
            else {
                document.getElementById('loading').setAttribute("style","display: none ");
            }
        }

        function getData(year, month) {
            stateLoading = true;
            loading(stateLoading);
            axios.get(window.url + '/su-kien-data?year=' + year + '&month=' + month)
                .then(function (response) {
                    // console.log(response);
                    data = [];
                    if (response.data.events.length > 0) {
                        response.data.events.forEach(function (event) {
                            data.push(
                                {
                                    title: event.name,
                                    start: event.start_date,
                                    end: event.end_date,
                                    url: window.url + '/events/' + event.slug,
                                }
                            );
                        });
                        updateData();
                    }
                    else {
                        updateData();
                    }
                    stateLoading = false;
                    loading(stateLoading);
                }.bind(data)).catch(function (error) {
                stateLoading = false;
                loading(stateLoading);
            });


        }

        function updateData() {
            $('#calendar').fullCalendar({

                titleRangeSeparator: ' - ',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: new Date(),
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: data
            });
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', data);

        }

        var moment1;
        var moment_year;
        var moment_month;


        $(document).ready(function () {
            moment1 = new Date();
            moment_year = moment(moment1).format('YYYY');
            moment_month = moment(moment1).format('M');
            getData(moment_year, moment_month);
            $('#calendar').on('click', '.fc-next-button', function () {
                $('#calendar').fullCalendar('removeEvents');
                moment1 = $('#calendar').fullCalendar('getDate');
                moment_year = moment(moment1).format('YYYY');
                moment_month = moment(moment1).format('M');
                getData(moment_year, moment_month);
            });
            $('#calendar').on('click', '.fc-prev-button', function () {
                $('#calendar').fullCalendar('removeEvents');
                moment1 = $('#calendar').fullCalendar('getDate');
                moment_year = moment(moment1).format('YYYY');
                moment_month = moment(moment1).format('M');
                getData(moment_year, moment_month);
            });


        });

    </script>

@endpush
