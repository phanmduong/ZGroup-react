@extends('layouts.app')

@section('title','Danh sách chiến dịch')

@section('content')
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/sale-list?gen_id='.$gen->id.'&saler_id='.$saler_id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <table class="responsive-table striped">
                <thead>
                <tr>
                    <th>
                        Họ tên

                        <!--begin order by users.name-->
                        <div>
                            <a href="{{url('manage/sale-list?order=users.name&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=users.name&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by users.name-->
                    </th>
                    <th>
                        Email
                        <!--begin order by users.email-->
                        <div>
                            <a href="{{url('manage/sale-list?order=users.email&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=users.email&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by users.email-->
                    </th>
                    <th>
                        Phone
                        <!--begin order by users.phone-->
                        <div>
                            <a href="{{url('manage/sale-list?order=users.phone&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=users.phone&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by users.phone-->
                    </th>
                    {{--<th data-field="price">Coupon</th>--}}
                    <th>
                        Môn học
                        <!--begin order by courses.name-->
                        <div style="min-width: 40px">
                            <a href="{{url('manage/sale-list?order=courses.name&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=courses.name&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by courses.name-->
                    </th>
                    <th>
                        Lớp
                        <!--begin order by classes.name-->
                        <div style="min-width: 40px">
                            <a href="{{url('manage/sale-list?order=classes.name&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=classes.name&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by classes.name-->
                    </th>
                    <th>
                        Ngày đăng kí
                        <!--begin order by registers.created_at-->
                        <div style="min-width: 40px">
                            <a href="{{url('manage/sale-list?order=registers.created_at&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=registers.created_at&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by registers.created_at-->
                    </th>
                    <th>
                        Số tiền
                        <!--begin order by registers.created_at-->
                        <div style="min-width: 40px">
                            <a href="{{url('manage/sale-list?order=registers.money&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=registers.money&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by registers.created_at-->
                    </th>
                    <th>
                        Chiến dịch
                        <!--begin order by marketing_campaign.name-->
                        <div style="min-width: 40px">
                            <a href="{{url('manage/sale-list?order=marketing_campaign.name&direction=desc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_down</i>
                            </a>
                            <a href="{{url('manage/sale-list?order=marketing_campaign.name&direction=asc&gen_id='.$current_gen->id.'&saler_id='.$saler_id)}}">
                                <i class="material-icons">keyboard_arrow_up</i>
                            </a>
                        </div>
                        <!--end order by marketing_campaign.name-->
                    </th>
                    <th>Lịch sử gọi</th>
                </tr>
                </thead>

                <tbody>
                @foreach($registers as $register)
                    <tr>
                        <td><a href="{{url('manage/changeclass/'.$register->id)}}">{{$register->user->name}}</a></td>
                        <td>
                            {{$register->user->email}}
                        </td>
                        <td>{{$register->user->phone}}</td>
                        {{--<td>{{$register->coupon}}</td>--}}
                        <td><img width="40" style="margin: 0 10px" class="circle"
                                 src="{{$register->studyClass->course->icon_url}}"/>
                        </td>
                        <td>{{$register->studyClass->name}}</td>
                        <td>{{date("j/n/Y",strtotime($register->created_at))}}</td>
                        <td style="width: 120px">

                            @if($register->money > 0)
                                <div style="text-align:center;padding:5px 10px;color:white;
                            border-radius: 3px;
                            background: #c50000;">{{currency_vnd_format($register->money)}}
                                </div>
                            @else
                                Chưa nộp tiền
                            @endif
                        </td>
                        <td style="width: 120px">
                            <a href="{{url('manage/marketing-campaign-detail/'.$register->marketing_campaign->id)}}"
                               style=" display:block;text-align:center;padding:5px 10px;color:white;
                                       border-radius: 3px;
                                       background: {{"#".$register->marketing_campaign->color}};">{{$register->marketing_campaign->name}}</a>
                        </td>
                        <td>
                            <a class="btn" href="{{url('manage/telesalehistory?page=1&user_id='.$register->user_id)}}">
                                <i style="color:white" class="material-icons">phone</i>
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
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
        });
    </script>
@endsection
