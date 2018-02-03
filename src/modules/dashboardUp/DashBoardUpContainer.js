import React from "react";
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
// import * as dashBoardAction from "./dashBoardAction";
import Loading from '../../components/common/Loading';
import FormInputDate from "../../components/common/FormInputDate";
import {Panel} from 'react-bootstrap';
import PropTypes from "prop-types";
import DashBoardUpComponent from "./DashBoardUpComponent";

class DashBoardUpContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedMonth: 10,
            openFilter: false,
            selectedBase: 0,
            filter: {
                startTime: '',
                endTime: '',
            }
        };
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.getBases = this.getBases.bind(this);
        this.onchangeBase = this.onchangeBase.bind(this);
        this.loadSeats = this.loadSeats.bind(this);
    }

    componentWillMount() {
        this.props.dashBoardAction.loadBases();
        this.props.dashBoardAction.loadRooms();
    }

    loadSeats(from, to, roomId) {
        this.props.dashBoardAction.loadSeats(from, to, roomId);
    }

    onChangeMonth(value) {
        this.setState({selectedMonth: value});
    }

    getBases() {
        let data = [];
        data = this.props.bases.map((base) => {
            return {
                key: base.id,
                value: base.name,
            };
        });

        return [{
            key: 0,
            value: "Tất cả"
        }, ...data];
    }

    onchangeBase(value) {
        this.setState({selectedBase: value});
        if (value === 0) this.props.dashBoardAction.loadRooms(); else
            this.props.dashBoardAction.loadRooms(value);

    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;
        this.setState({filter: filter});
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoadingBases || this.props.isLoadingRooms ? <Loading/> : (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn tháng'}
                                        options={[
                                            {
                                                key: "1",
                                                value: "Tháng 1",
                                            },
                                            {
                                                key: "2",
                                                value: "Tháng 2",
                                            },
                                            {
                                                key: "3",
                                                value: "Tháng 3",
                                            },
                                            {
                                                key: "4",
                                                value: "Tháng 4",
                                            },
                                            {
                                                key: "5",
                                                value: "Tháng 5",
                                            },
                                            {
                                                key: "6",
                                                value: "Tháng 6",
                                            },
                                            {
                                                key: "7",
                                                value: "Tháng 7",
                                            },
                                            {
                                                key: "8",
                                                value: "Tháng 8",
                                            },
                                            {
                                                key: "9",
                                                value: "Tháng 9",
                                            },
                                            {
                                                key: "10",
                                                value: "Tháng 10",
                                            },
                                            {
                                                key: "11",
                                                value: "Tháng 11",
                                            },
                                            {
                                                key: "12",
                                                value: "Tháng 12",
                                            },

                                        ]}
                                        value={this.state.selectedMonth}
                                        onChange={this.onChangeMonth}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.getBases()}
                                        value={this.state.selectedBase}
                                        onChange={this.onchangeBase}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-info btn-rose btn-round"
                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                            </div>
                            <Panel collapsible expanded={this.state.openFilter}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">filter_list</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Bộ lọc
                                                    <small/>
                                                </h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-start-time"
                                                            value={this.state.filter.startTime}
                                                            maxDate={this.state.filter.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-end-time"
                                                            value={this.state.filter.endTime}
                                                            minDate={this.state.filter.startTime}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <DashBoardUpComponent
                                {...this.props}
                                loadSeats={this.loadSeats}
                            />
                        </div>
                    )

                }
            </div>
        );
    }
}

DashBoardUpContainer.propTypes = {
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    seats: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    dashBoardAction: PropTypes.object.isRequired,
    isLoadingRooms: PropTypes.bool.isRequired,
    isLoadingSeats: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingBases: state.dashboardUp.isLoadingBases,
        bases: state.dashboardUp.bases,
        isLoadingRooms: state.dashboardUp.isLoadingRooms,
        rooms: state.dashboardUp.rooms,
        seats: state.dashboardUp.seats,
        rooms_count: state.dashboardUp.rooms_count,
        isLoadingSeats: state.dashboardUp.isLoadingSeats,
        seats_count: state.dashboardUp.seats_count,
        domain: state.seat.domain,
        available_seats: state.dashboardUp.available_seats,
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         // dashBoardAction: bindActionCreators(dashBoardAction, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DashBoardUpContainer);
export default connect(mapStateToProps)(DashBoardUpContainer);