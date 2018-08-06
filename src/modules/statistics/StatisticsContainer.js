import React from "react";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import store from "./statisticsStore";
import Select from '../../components/common/Select';
import {connect} from "react-redux";
import {observer} from "mobx-react/index";
import FormInputDate from "../../components/common/FormInputDate";
import ListRegisters from "./ListRegisters";
import RegistersChart from "./RegistersChart";

@observer
class StatisticsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
    }

    componentWillMount() {
        store.selectedBaseId = this.props.user.base_id;
        store.loadBases();
        store.loadRooms();
        store.loadRoomTypes();
        store.loadChart();
        store.loadRegisters(1);
        // this.onChangeToThisWeek();
    }

    onChangeRoom(value) {
        store.selectedRoomId = value;
        store.loadChart();
        store.loadRegisters(1);

    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadChart();
        store.loadRegisters(1);

    }

    onChangeRoomType(value) {
        store.selectedRoomTypeId = value;
        store.loadChart();
        store.loadRegisters(1);

    }


    updateFormDate = (event) => {
        const field = event.target.name;
        store[field] = event.target.value;
        // console.log(store[field],"kkkkkkk",field);
        // console.log("xxxxxxx",moment(store.start_time_form_form).format("YYYY-MM-DD"));
        store.loadChart();
        store.loadRegisters(1);
    }


    render() {

        // console.log(store.totalRegisterPages,"ssssss");


        return (
            <div>
                {store.isExporting ?
                    <Loading/>
                    :
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
                                        <div className="row">
                                            <div className="col-md-3">
                                                <FormInputDate
                                                    label="Từ ngày"
                                                    name="start_time_form"

                                                    updateFormData={this.updateFormDate}
                                                    id="form-start-time"
                                                    value={store.start_time_form}
                                                    maxDate={store.end_time_form}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormInputDate
                                                    label="Đến ngày"
                                                    name="end_time_form"
                                                    updateFormData={this.updateFormDate}
                                                    id="form-end-time"
                                                    value={store.end_time_form}
                                                    minDate={store.start_time_form}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <RegistersChart/>
                                    <ListRegisters/>
                                </div>
                        }
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

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
