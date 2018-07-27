import React from "react";
import Loading from "../../components/common/Loading";
// import * as helper from "../../helpers/helper";
import PropTypes from "prop-types";
import store from "./statisticsStore";
import Select from '../../components/common/Select';
import {connect} from "react-redux";
import {observer} from "mobx-react/index";
import moment from "moment";
import {Bar} from 'react-chartjs-2';

// const legendOpts = {
//     display: false,
//     position: 'top',
//     fullWidth: true,
// };
function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

// getMonday(new Date());

@observer
class StatisticsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.state = {
            dataSet: {
                labels: ["sd","sad","wqed"],
                datasets: [{
                    label: "view",
                    backgroundColor: '#ffaa00',
                    borderColor: '#ffaa00',
                    data: [2, 2, 2],
                },
                ]
            },
            options :  {scale : {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 3,
                        }
                    }]
                }},
        };
    }

    componentWillMount() {
        store.selectedBaseId = this.props.user.base_id;
        this.onChangeToThisWeek();
        store.loadBases();
        store.loadRooms();
        store.loadRoomTypes();
    }

    initChart = (dataSet) => {
        this.setState({dataSet});
    }

    onChangeRoom(value) {
        store.selectedRoomId = value;
        store.loadChart();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadChart();
    }

    onChangeRoomType(value) {
        store.selectedRoomTypeId = value;
        store.loadChart();
    }

    onChangeToLastWeek = () => {
        store.start_time = store.start_time.subtract(7, 'days');
        store.loadChart();
    }

    onChangeToNextWeek = () => {
        store.start_time = store.start_time.add(7, 'days');
        store.loadChart();
    }

    onChangeToThisWeek = () => {
        store.start_time = moment(getMonday(new Date()));
        store.loadChart();
    }


    render() {



        return (
            <div>
                {
                    store.isLoadingBases || store.isLoadingRooms || store.isLoadingRoomTypes
                        ?
                        (
                            <Loading/>
                        )
                        :
                        <div>
                            <div>
                                <div className="row">
                                    <div className="col-sm-4 col-xs-5">
                                        <Select
                                            defaultMessage={'Chọn cơ sở'}
                                            options={store.basesData}
                                            value={store.selectedBaseId}
                                            onChange={this.onChangeBase}
                                        />
                                    </div>
                                    <div className="col-sm-4 col-xs-3">
                                        <Select
                                            defaultMessage={'Chọn loại phòng'}
                                            options={store.roomTypesData}
                                            value={store.selectedRoomTypeId}
                                            onChange={this.onChangeRoomType}
                                        />
                                    </div>
                                    <div className="col-sm-4 col-xs-4">
                                        <Select
                                            defaultMessage={'Chọn phòng'}
                                            options={store.roomsData}
                                            value={store.selectedRoomId}
                                            onChange={this.onChangeRoom}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="tab-content">
                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <h4 className="card-title">
                                                        <strong>Số lượng đăng kí theo tuần</strong>
                                                    </h4>

                                                    <div id="room-calender-" className="fc fc-unthemed fc-ltr"
                                                        // style={{padding: 20}}
                                                    >
                                                        <div className="fc-toolbar fc-header-toolbar">
                                                            <div className="fc-left">
                                                                <div className="fc-button-group">
                                                                    <button type="button"
                                                                            className="fc-prev-button fc-button fc-state-default fc-corner-left"
                                                                            aria-label="prev"
                                                                            onClick={() => this.onChangeToLastWeek()}
                                                                    >
                                                                    <span
                                                                        className="fc-icon fc-icon-left-single-arrow"/>
                                                                    </button>
                                                                    <button type="button"
                                                                            className="fc-next-button fc-button fc-state-default fc-corner-right"
                                                                            aria-label="next"
                                                                            onClick={() => this.onChangeToNextWeek()}
                                                                    >
                                                                    <span
                                                                        className="fc-icon fc-icon-right-single-arrow"/>
                                                                    </button>
                                                                </div>
                                                                <button type="button"
                                                                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right "
                                                                    // disabled   fc-state-disabled
                                                                        onClick={() => this.onChangeToThisWeek()}
                                                                >Tuần này
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <br/>
                                                <br/>

                                                {
                                                    store.isLoadingRegisterSummary  ?
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
                        </div>
                }

            </div>
        );
    }
}

StatisticsContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(StatisticsContainer);
