/**
 * Created by phanmduong on 12/27/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import Select from "react-select";
import * as workShiftRegisterActions from '../workShiftRegisterActions';
import {groupBy, isEmptyInput} from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import AttendanceShift from "./AttendanceShift";
import PropTypes from 'prop-types';

class DetailShift extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectStaffId: ''
        };
        this.changeStaff = this.changeStaff.bind(this);
    }

    changeStaff(value) {
        const staffId = value && value.id ? value.id : '';
        this.setState({
            selectStaffId: staffId
        });
        this.props.workShiftRegisterActions.loadDetailShiftsUser(this.props.baseId, this.props.genId, this.props.week, staffId);
    }

    render() {
        let users = [];
        this.props.users.forEach(staff => {
            users.push({
                ...staff, ...{
                    value: staff.id,
                    label: staff.name
                }
            });
        });

        let shifts = [];

        if (!isEmptyInput(this.state.selectStaffId)) {
            shifts = groupBy(this.props.detailShifts, shift => shift.date, ["date", "shifts"]);
        }


        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-control">Nhân viên</label>
                            <Select
                                name="form-field-name"
                                value={this.state.selectStaffId}
                                options={users}
                                onChange={this.changeStaff}
                                optionRenderer={(option) => {
                                    return (
                                        <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                    );
                                }}
                                valueRenderer={(option) => {
                                    return (
                                        <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                    );
                                }}
                                placeholder="Chọn nhân viên"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        !isEmptyInput(this.state.selectStaffId) &&
                        (
                            this.props.isLoadingDetailShifts ? <Loading/>
                                :
                                (
                                    shifts.map((shift, index1) => {
                                        return (
                                            <div className="col-md-6" key={index1}>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title"><strong>{shift.date}</strong></h4>
                                                    </div>
                                                    <div className="card-content">
                                                        {
                                                            shift.shifts.map((shiftData, index) => {
                                                                return (
                                                                    <AttendanceShift
                                                                        most_early_time={this.props.start_time}
                                                                        most_late_time={this.props.end_time}
                                                                        shift={shiftData}
                                                                        key={index}
                                                                    />
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )
                        )
                    }
                </div>


            </div>

        );
    }
}

DetailShift.propTypes = {
    isLoadingDetailShifts: PropTypes.bool.isRequired,
    detailShifts: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    end_time: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    workShiftRegisterActions: PropTypes.object.isRequired,
    baseId: PropTypes.number.isRequired,
    genId: PropTypes.number.isRequired,
    week: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingDetailShifts: state.workShiftRegisters.isLoadingDetailShifts,
        detailShifts: state.workShiftRegisters.detailShifts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        workShiftRegisterActions: bindActionCreators(workShiftRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailShift);
