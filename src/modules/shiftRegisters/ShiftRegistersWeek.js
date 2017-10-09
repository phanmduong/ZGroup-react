import React from 'react';
import ShiftDates from './shift/ShiftDates';

class ShiftRegistersWeek extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let currentWeek = this.props.currentWeek;
        let shiftRegisters = this.props.shiftRegisters;
        if (shiftRegisters[currentWeek]) {
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
                            <h6><strong>Tổng thời gian làm việc: 16h/15h</strong></h6>
                            <div className="progress progress-line-warning">
                                <div className="progress-bar progress-bar-success"
                                />
                            </div>
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
                </div>
            );
        } else {
            return (<div>
                Không có lịch trực
            </div>);
        }
    }
}


export default ShiftRegistersWeek;
