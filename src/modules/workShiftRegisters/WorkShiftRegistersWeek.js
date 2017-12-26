import React from 'react';
import ShiftDates from './shift/ShiftDates';
import {MAX_TIME_WORK_SHIFT_REIGSTER} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import _ from 'lodash';
import StatisticShift from './shift/StatisticShift';
import PropTypes from 'prop-types';
import {convertTimeToSecond} from "../../helpers/helper";

class ShiftRegistersWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState(
            {
                showModal: true,
            }
        );
    }

    render() {
        let currentWeek = this.props.currentWeek;
        let shiftRegisters = this.props.shiftRegisters;


        if (shiftRegisters[currentWeek]) {
            let sumTimeShiftOfWeek = helper.sumTimeWorkShiftOfWeek(shiftRegisters[currentWeek], this.props.userId);

            let statisticShift = [];

            shiftRegisters[currentWeek].dates.map(function (date) {
                date.shifts.map(function (shift) {
                    let totalTime = convertTimeToSecond(shift.end_time) - convertTimeToSecond(shift.start_time);
                    shift.users.map(function (userData) {

                        let users = statisticShift.filter(function (user) {
                            return user.id === userData.id;
                        });
                        if (users[0]) {
                            users[0].total_shift += 1;
                            users[0].total_time += totalTime;
                        } else {
                            statisticShift = [{...userData, total_shift: 1, total_time: totalTime}, ...statisticShift];
                        }
                    });
                });
            });

            statisticShift = _.sortBy(statisticShift, (user) => user.total_time);
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-4 col-xs-12">
                            <h2>
                                <strong className="margin-right-10">Tuần {shiftRegisters[currentWeek].week}</strong>
                                <button
                                    className={"btn btn-round btn-fab btn-fab-mini margin-right-10 " + (currentWeek === 0 ? "btn-default" : "btn-rose" )}
                                    onClick={() => this.props.changeCurrentWeek(-1)}
                                >
                                    <i className="material-icons">keyboard_arrow_left</i>
                                    <div className="ripple-container"/>
                                </button>
                                <button
                                    className={"btn btn-round btn-fab btn-fab-mini margin-right-10 " +
                                    (currentWeek >= this.props.shiftRegisters.length - 1 ? "btn-default" : "btn-rose")}
                                    onClick={() => this.props.changeCurrentWeek(1)}>

                                    <i className="material-icons">keyboard_arrow_right</i>
                                    <div className="ripple-container"/>
                                </button>
                            </h2>
                            <h6><strong>Tổng thời gian làm việc: {helper.getHoursTime(sumTimeShiftOfWeek)}h/
                                {helper.getHoursTime(MAX_TIME_WORK_SHIFT_REIGSTER)}h</strong></h6>
                            <div className="progress progress-line-warning">
                                <div className="progress-bar progress-bar-success"
                                     style={{width: helper.convertTimeToSecond(sumTimeShiftOfWeek) * 100 / helper.convertTimeToSecond(MAX_TIME_WORK_SHIFT_REIGSTER) + '%'}}
                                />
                            </div>
                            <button className="btn btn-rose" onClick={() => this.openModal()}>Thống kê</button>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {
                            this.props.shiftRegisters[currentWeek].dates &&
                            this.props.shiftRegisters[currentWeek].dates.map((date, index) => {
                                return <ShiftDates date={date} key={index}/>;
                            })
                        }
                    </div>
                    <Modal show={this.state.showModal} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông kê lịch trực tuần {shiftRegisters[currentWeek].week}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StatisticShift
                                statisticShift={statisticShift}
                                maxTotalShift={statisticShift[statisticShift.length - 1] ? statisticShift[statisticShift.length - 1].total_shift : 0}
                                maxTotalTime={statisticShift[statisticShift.length - 1] ? statisticShift[statisticShift.length - 1].total_time : 0}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            );
        } else {
            return (<h3>
                Không có lịch trực
            </h3>);
        }
    }
}

ShiftRegistersWeek.propTypes = {
    currentWeek: PropTypes.number.isRequired,
    shiftRegisters: PropTypes.array.isRequired,
    changeCurrentWeek: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
};

export default ShiftRegistersWeek;
