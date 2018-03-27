@extends('nhatquangshop::layouts.master')

@section('content')
    <div class="container">
        <div class="row" style="margin-top:150px">
            <div class="col-8">
                <div class="blog-4">
                    <div class="container">
                        <div class="row">
                            @foreach($events as $event)
                                <div class="col-md-6">
                                    <div class="card card-plain card-blog text-center">
                                        <div class="card-image">
                                            <a href="">
                                                <img class="img img-raised" src="{{$event->avatar_url}}">
                                            </a>
                                        </div>
                                        <div class="card-block">
                                            <h3 class="card-title">
                                                <a href="{{route('detail', ['slug' => $event->slug])}}">{{$event->name}}</a>
                                            </h3>
                                            <p class="card-description">
                                                {{ Carbon\Carbon::parse($event->start_date)->format('d/m/Y') }}
                                                @if($event->end_date != $event->start_date)
                                                    <span> -  {{ Carbon\Carbon::parse($event->end_date)->format('d/m/Y') }}</span>
                                                @endif
                                            </p>
                                            <p class="card-description">
                                                {{ Carbon\Carbon::parse($event->start_time)->format('H:i') }}
                                                @if($event->end_date != $event->start_date)
                                                    <span> -  {{ Carbon\Carbon::parse($event->end_time)->format('H:i') }}</span>
                                                @endif
                                            </p>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
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
            <div class="col-4">
                Something will be displayed
            </div>
        </div>
    </div>

@endsection

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
@endpush