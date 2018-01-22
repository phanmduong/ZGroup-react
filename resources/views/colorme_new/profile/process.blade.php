@extends('colorme_new.layouts.profile')


@section('content_profile')
    <div class="home-page-wrapper">
        <div class="product-list-wrapper">

            @if (count($paid_courses_user) > 0)
                <div class="col-md-12">
                    <h3>KHÓA HỌC ĐÃ MUA</h3>
                </div>


                @foreach($paid_courses_user as $course)
                    <div class="product-wrapper">
                        <a href="/course/{{convert_vi_to_en($course['name'])}}">
                            <div class="product-item">
                                <div style="background-image: url({{$course['icon_url']}}); background-size: cover; background-position: center center; padding-bottom: 70%">
                                </div>
                                <div class="w3-light-grey" style="background: rgba(39,187,42,0.33)!important">
                                    <div class="w3-grey"
                                         style="height:20px;width:{{round($course['total_passed']*100/$course['total_lesson'])}}%; background:#27bb2a!important">
                                        <p style="color:white;padding-left:10px">
                                            {{round($course['total_passed']*100/$course['total_lesson'])}}%
                                        </p>
                                    </div>
                                </div>
                                <div class="product-info">

                                    <div class="media"
                                         style="font-size: 12px; margin-top: 10px; padding: 5px 10px;">
                                                <span style="color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;">
                                                    {{$course['name']}}</span>
                                        <div class="media-body"><span>
                                                        <div class="timestamp" style="font-size: 11px;">{{$course['duration']}}
                                                            buổi
                                                        </div>
                                                        <div class="timestamp"
                                                             style="line-height: 15px;font-size: 11px; color: #111111;">{{$course['description']}}</div>
                                                    </span></div>
                                    </div>
                                    <div style="border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 45px; width: 100%;"></div>
                                    <div style="position: absolute; bottom: 5px;">
                                        <div class="product-tool">
                                        </div>
                                    </div>
                                    <button class="btn-register"
                                            style="color: #76b031; font-size: 13px; position: absolute; bottom: 10px; right: 5px; padding: 5px 10px!important;">
                                        <i class="fa fa-graduation-cap" aria-hidden="true"></i> Học ngay
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            @else
                <div class="col-md-12" style="margin-bottom: 100px">
                    <h3>BẠN CHƯA CÓ KHÓA HỌC</h3>
                </div>
            @endif
        </div>
        <div id="app" style="display: none"></div>
    </div>
@endsection

@push('scripts')
    <script src="{{url('colorme-react/bundle.js')}}?85438888"></script>
@endpush