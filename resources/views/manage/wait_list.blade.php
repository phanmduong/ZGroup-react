@extends('layouts.app')

@section('title','Danh sách chờ')

@section('content')
    <h3 class="header">
        Danh sách chờ
    </h3>
    <div class="row">
        <div class="input-field col s12 m6">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/waitlist?gen_id='.$gen->id.'&base_id='.$current_base_id. "&is_paid=$is_paid")}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
        <div class="input-field col s12 m6">
            <select id="base-select">
                @foreach($bases as $base)
                    <option value="{{url('manage/waitlist?gen_id='.$current_gen->id.'&base_id='. $base->id. "&is_paid=$is_paid")}}"
                            {{$base->id == $current_base_id?"selected":""}}>{{$base->name}}</option>
                @endforeach

                <option value="{{url('manage/waitlist?gen_id='.$current_gen->id."&base_id=&paid=$is_paid")}}"
                        {{!$current_base_id?"selected":""}}>Toàn bộ
                </option>
            </select>
            <label>Cơ sở</label>
        </div>
        <div class="input-field col s12 m6">
            <select id="paid-select">
                <option value="{{url('manage/waitlist?gen_id='.$current_gen->id.'&base_id='. $base->id. "&is_paid=1")}}"
                        {{$is_paid == 1?"selected":""}}>Đã đóng tiền
                </option>
                <option value="{{url('manage/waitlist?gen_id='.$current_gen->id.'&base_id='. $current_base_id. "&is_paid=0")}}"
                        {{$is_paid == 0 ? "selected":""}}>Chưa đóng tiền
                </option>
            </select>
            <label>Trạng thái nộp tiền</label>
        </div>
        <div class="input-field col s12 m6">
            <a class="btn waves-effect"
               href="{{url("manage/downloadwaitlist?base_id=$current_base_id&is_paid=$is_paid&gen_id=".$current_gen->id)}}">
                Download danh sách chờ
            </a>
        </div>
    </div>

    @if(\Illuminate\Support\Facades\Session::has('change_class_message'))
        <div class="row">
            <div class="col s12">
                <div class="card-panel">
                    <span class="green-text darken-3">{!!  \Illuminate\Support\Facades\Session::get('change_class_message')!!}</span>
                </div>
            </div>
        </div>
    @endif
    <div class="row">
        <form>
            <input type="hidden" name="gen_id" value="{{$current_gen->id}}">
            <input type="hidden" name="base_id" value="{{$current_base_id}}">
            <input type="hidden" name="is_paid" value="{{$is_paid}}">
            <div class="col s12 m6">
                <input name="q" value="{{$query}}" type="text" placeholder="Email, Ghi chú hoặc Tên"/>
            </div>
            <div class="col s12 m4">
                <input type="submit" class="btn" value="search"/>
            </div>
        </form>
    </div>
    <div class="row">
        <p>Tổng số đăng kí: <strong>{{$total}}</strong></p>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th></th>
                <th data-field="id">Họ tên</th>
                <th data-field="name">Email</th>
                <th data-field="price">Phone</th>
                <th>Ghi chú</th>
                {{--<th data-field="price">Coupon</th>--}}
                <th>Saler</th>
                <th>Chiến dịch</th>
                <th>Đã đóng</th>
                <th>Lớp</th>
                <th>Ngày đăng kí</th>
                <th>Huỷ</th>
            </tr>
            </thead>

            <tbody>
            @foreach($registers as $register)
                <tr>
                    <td>
                        <a href="{{url('manage/telesalehistory?page=1&user_id='.$register->user_id)}}">
                            @if($register->call_status == 0)
                                <i style="color: #a5a5a5;" class="material-icons">phone</i>
                            @elseif($register->call_status == 2)
                                <i style="color: #c50000;" class="material-icons">phone</i>
                            @else
                                <i style="color: #43a047;" class="material-icons">phone</i>
                            @endif
                        </a>
                    </td>
                    <td><a href="{{url('manage/changeclass/'.$register->id)}}">{{$register->user->name}}</a></td>
                    <td>
                        <a href="{{url('manage/study-history/'.$register->user_id)}}">
                            {{$register->user->email}}
                        </a>
                    </td>
                    <td>{{$register->user->phone}}</td>
                    <td>{{$register->note}}</td>
                    @if ($register->saler)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#{{$register->saler->color}}">{{$register->saler->name}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Không có</td>
                    @endif
                    @if ($register->marketing_campaign)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#{{$register->marketing_campaign->color}}">{{$register->marketing_campaign->name}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Không có</td>
                    @endif
                    @if ($register->status == 1)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#c50000">{{currency_vnd_format($register->money)}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Chưa đóng tiền</td>
                    @endif

                    <td>{{$register->studyClass->name}}</td>
                    <td>{{format_date($register->created_at)}}</td>
                    <td>
                        <a onclick="return confirm('Bạn chắc chắn huỷ đăng kí này? ');"
                           href="{{url('manage/deleteregister/'.$register->id)}}"><i
                                    class="small material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect"
                       href="{{url('manage/waitlist?page='.($current_page-1)."&base_id=$current_base_id&is_paid=$is_paid&gen_id=".$current_gen->id.'&q='.$query)}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect"
                           href="{{url('manage/waitlist?page='.$i."&base_id=$current_base_id&is_paid=$is_paid&gen_id=".$current_gen->id.'&q='.$query)}}">{{$i}}</a>
                    </li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect"
                       href="{{url('manage/waitlist?page='.($current_page+1)."&base_id=$current_base_id&is_paid=$is_paid&gen_id=".$current_gen->id.'&q='.$query)}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
    <script>

        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() !== '') {
                    window.location.href = $(this).val();
                }
            });
            $("#paid-select").change(function () {
                if ($(this).val() !== '') {
                    window.location.href = $(this).val();
                }
            });
            $("#base-select").change(function () {
                if ($(this).val() !== '') {
                    window.location.href = $(this).val();
                }
            });
        });


    </script>
@endsection
