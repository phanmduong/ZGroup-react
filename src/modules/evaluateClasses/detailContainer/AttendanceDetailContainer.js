import React from "react";
import {observer} from "mobx-react";

import {getShortName, validateLinkImage} from "../../../helpers/helper";
import {RATIO_ATTENDANCE_CLASS} from "../../../constants/constants";
import PropTypes from "prop-types";


@observer
class AttendanceDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }


    renderAttendance() {
        const successColor = '#2EBE21';
        const failColor = '#c50000';
        const {data} = this.props;
        const raitoAttendance = Math.round(data.attendance_success * 100 / data.attendance_count);
        const widthRaitoAttendance = Math.round(raitoAttendance);
        const attendanceColor = raitoAttendance >= RATIO_ATTENDANCE_CLASS ? successColor : failColor;
        return (
            <div>

                <div className="panel-group" id="accordion"
                     role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab"
                             id={"heading_"}>
                            <div className="flex flex flex-space-between" style={{marginTop: 10}}>
                                <div className="bold" style={{color: 'black'}}>Tổng thể</div>
                                <div className="bold" style={{color: 'black'}}>
                                    {`${Math.round(raitoAttendance)}%/${100}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: widthRaitoAttendance + '%',
                                         backgroundColor: attendanceColor
                                     }}/>
                            </div>


                        </div>

                        <div className="panel-body" style={{paddingLeft: 30}}>
                            {
                                data.attendance.map((lesson, index) => {
                                    if(!lesson) return (<div key={index}></div>);
                                    const raito =Math.round(data.real_register_count ?  lesson.present * 100 / data.real_register_count : 0);
                                    const width =Math.round(raito );
                                    return (
                                        <div key={index}>
                                            <div className="flex flex flex-space-between"
                                                 style={{marginTop: 10}}>
                                                <div
                                                    className="bold">Buổi {index+1} - {lesson.present}/{data.real_register_count}</div>
                                                <div className="bold">
                                                    {`${Math.round(raito)}%/${100}%`}
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar"
                                                     style={{
                                                         width: width + '%',
                                                         backgroundColor: raito >= RATIO_ATTENDANCE_CLASS ? successColor : failColor
                                                     }}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                </div>

            </div>

        );
    }

    render() {
        const {data} = this.props;
        return (
            <div>

                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(data.course.icon_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {data.name}
                        </div>
                        <div>Tỉ lệ học viên tham gia các buổi</div>
                        <p className="description">
                            {data.teacher &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher.color}}
                            >
                                {getShortName(data.teacher.name)}
                            </button>}
                            {data.teacher_assistant &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher_assistant.color}}
                            >
                                {getShortName(data.teacher_assistant.name)}
                            </button>}
                        </p>
                        <br/>
                    </div>

                    <div>
                        {this.renderAttendance()}
                    </div>


                </div>
            </div>

        );
    }
}

AttendanceDetailContainer.propTypes = {
    data: PropTypes.object
};

export default AttendanceDetailContainer;
