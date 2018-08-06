import React from "react";
import Loading from "../../components/common/Loading";
// import * as helper from "../../helpers/helper";
// import PropTypes from "prop-types";
import store from "./statisticsStore";
import {observer} from "mobx-react/index";
import moment from "moment";
import {Bar} from 'react-chartjs-2';

// function getMonday(d) {
//     d = new Date(d);
//     let day = d.getDay(),
//         diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
//     return new Date(d.setDate(diff));
// }


function countData(day) {
    let cnt = Math.floor(store.date_array.length / day);
    let new_date_array = [];
    let new_register_by_date_view = [];
    let new_register_by_date_done = [];
    let new_register_by_date_cancel = [];
    let new_register_by_date_seed = [];
    let tmp_view = 0;
    let tmp_done = 0;
    let tmp_seed = 0;
    let tmp_cancel = 0;
    // console.log(cnt,"cnt");
    if (cnt === 0) {
        new_date_array = [...new_date_array, store.date_array[day * cnt] + " - " + store.date_array[store.date_array.length - 1]];
        for (let i = day * cnt; i < store.date_array.length; i++) {
            tmp_view += store.register_by_date_view[i];
            tmp_done += store.register_by_date_done[i];
            tmp_seed += store.register_by_date_seed[i];
            tmp_cancel += store.register_by_date_cancel[i];
        }
        new_register_by_date_view = [...new_register_by_date_view, tmp_view];
        new_register_by_date_done = [...new_register_by_date_done, tmp_done];
        new_register_by_date_seed = [...new_register_by_date_seed, tmp_seed];
        new_register_by_date_cancel = [...new_register_by_date_cancel, tmp_cancel];
    }
    else {

        for (let j = 0; j < cnt - 1; j++) {
            new_date_array = [...new_date_array, store.date_array[day * j] + " - " + store.date_array[day * j + day - 1]];
            for (let i = day * j; i < day * j + day; i++) {
                tmp_view += store.register_by_date_view[i];
                tmp_done += store.register_by_date_done[i];
                tmp_seed += store.register_by_date_seed[i];
                tmp_cancel += store.register_by_date_cancel[i];
            }
            new_register_by_date_view = [...new_register_by_date_view, tmp_view];
            new_register_by_date_done = [...new_register_by_date_done, tmp_done];
            new_register_by_date_seed = [...new_register_by_date_seed, tmp_seed];
            new_register_by_date_cancel = [...new_register_by_date_cancel, tmp_cancel];

            tmp_view = 0;
            tmp_cancel = 0;
            tmp_done = 0;
            tmp_seed = 0;

            // console.log(j, " : ", new_date_array, " - ", new_register_by_date_done);
        }
        new_date_array = [...new_date_array, store.date_array[day * cnt - day] + " - " + store.date_array[store.date_array.length - 1]];
        for (let i = day * cnt - day; i < store.date_array.length; i++) {
            tmp_view += store.register_by_date_view[i];
            tmp_done += store.register_by_date_done[i];
            tmp_seed += store.register_by_date_seed[i];
            tmp_cancel += store.register_by_date_cancel[i];
        }
        new_register_by_date_view = [...new_register_by_date_view, tmp_view];
        new_register_by_date_done = [...new_register_by_date_done, tmp_done];
        new_register_by_date_seed = [...new_register_by_date_seed, tmp_seed];
        new_register_by_date_cancel = [...new_register_by_date_cancel, tmp_cancel];
    }

    // console.log(new_date_array, "qqqqqq", new_register_by_date_view);
    store.new_date_array = new_date_array;
    store.new_register_by_date_seed = new_register_by_date_seed;
    store.new_register_by_date_cancel = new_register_by_date_cancel;
    store.new_register_by_date_done = new_register_by_date_done;
    store.new_register_by_date_view = new_register_by_date_view;
}

@observer
class RegistersChart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    onChangeToLastWeek = () => {
        store.start_time_form = moment(store.start_time_form);
        store.start_time_form = store.start_time_form.subtract(7, 'days');
        let clone_start_time_form = store.start_time_form.clone();
        store.end_time_form = clone_start_time_form.add(6, 'days').format("YYYY-MM-DD");
        store.start_time_form = store.start_time_form.format("YYYY-MM-DD");
        // console.log(store.start_time.format("YYYY-MM-DD"),"xxxxxxx");
        store.loadChart();
    }

    onChangeToNextWeek = () => {
        store.start_time_form = moment(store.start_time_form);
        store.start_time_form = store.start_time_form.add(7, 'days');
        let clone_start_time_form = store.start_time_form.clone();
        store.end_time_form = clone_start_time_form.add(6, 'days').format("YYYY-MM-DD");
        store.start_time_form = store.start_time_form.format("YYYY-MM-DD");
        store.loadChart();
    }

    countByWeek = () => {
        // store.start_time_form = moment(getMonday(new Date()));
        // let clone_start_time_form = store.start_time_form.clone();
        // store.end_time_form = clone_start_time_form.add(6,'days').format("YYYY-MM-DD");
        // store.start_time_form = store.start_time_form.format("YYYY-MM-DD");
        // console.log(store.start_time_form,"xxxxxxx",store.end_time_form);
        // store.loadChart();
        countData(7);
    }
    countByDay = () => {
        store.new_date_array = store.date_array;
        store.new_register_by_date_seed = store.register_by_date_seed;
        store.new_register_by_date_cancel = store.register_by_date_cancel;
        store.new_register_by_date_done = store.register_by_date_done;
        store.new_register_by_date_view = store.register_by_date_view;
    }
    countByMonth = () => {
        // store.start_time_form = moment(getMonday(new Date()));
        // let clone_start_time_form = store.start_time_form.clone();
        // store.end_time_form = clone_start_time_form.add(6,'days').format("YYYY-MM-DD");
        // store.start_time_form = store.start_time_form.format("YYYY-MM-DD");
        // console.log(store.start_time_form,"xxxxxxx",store.end_time_form);
        // store.loadChart();
        countData(30);
    }

    render() {

        // console.log(store.totalRegisterPages,"ssssss");


        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <h4 className="card-title">
                                        <strong>Biểu đồ đăng kí</strong>
                                    </h4>

                                    <div id="room-calender-"
                                         className="fc fc-unthemed fc-ltr"
                                    >
                                        <div className="fc-toolbar fc-header-toolbar">
                                            <div className="fc-left">
                                                {/*<div className="fc-button-group">*/}
                                                {/*<button type="button"*/}
                                                {/*className="fc-prev-button fc-button fc-state-default fc-corner-left"*/}
                                                {/*aria-label="prev"*/}
                                                {/*onClick={() => this.onChangeToLastWeek()}*/}
                                                {/*>*/}
                                                {/*<span*/}
                                                {/*className="fc-icon fc-icon-left-single-arrow"/>*/}
                                                {/*</button>*/}
                                                {/*<button type="button"*/}
                                                {/*className="fc-next-button fc-button fc-state-default fc-corner-right"*/}
                                                {/*aria-label="next"*/}
                                                {/*onClick={() => this.onChangeToNextWeek()}*/}
                                                {/*>*/}
                                                {/*<span*/}
                                                {/*className="fc-icon fc-icon-right-single-arrow"/>*/}
                                                {/*</button>*/}
                                                {/*</div>*/}
                                                <button type="button"
                                                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right "
                                                    // disabled   fc-state-disabled
                                                        onClick={() => this.countByDay()}
                                                >Ngày
                                                </button>
                                                <button type="button"
                                                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right "
                                                    // disabled   fc-state-disabled
                                                        onClick={() => this.countByWeek()}
                                                >Tuần
                                                </button>
                                                <button type="button"
                                                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right "
                                                    // disabled   fc-state-disabled
                                                        onClick={() => this.countByMonth()}
                                                >Tháng
                                                </button>


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <br/>
                                <br/>

                                {
                                    store.isLoadingRegisterSummary ?
                                        <Loading/>
                                        :
                                        <Bar
                                            data={store.dataSet}
                                        />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegistersChart.propTypes = {};


export default RegistersChart;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
