import React from "react";
import {observer} from "mobx-react";

import {getShortName, validateLinkImage} from "../../../helpers/helper";
import {RATIO_ATTENDANCE_CLASS} from "../../../constants/constants";


@observer
class HomeworkDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }


    renderAttendance() {
        const successColor = '#2EBE21';
        const failColor = '#c50000';
        const {data} = this.props;
        const ratio_hw = Math.round(data.attendance_success * 100 / data.attendance_count);

        const attendanceColor = ratio_hw >= RATIO_ATTENDANCE_CLASS ? successColor : failColor;
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
                                    {`${Math.round(ratio_hw)}%/${RATIO_ATTENDANCE_CLASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: ratio_hw + '%',
                                         backgroundColor: attendanceColor
                                     }}/>
                            </div>


                        </div>

                        <div className="panel-body" style={{paddingLeft: 30}}>
                            {
                                data.attendance.map((lesson, index) => {
                                    const ratio =lesson.total ?  lesson.hw * 100 / lesson.total : 0;
                                    return (
                                        <div key={index}>
                                            <div className="flex flex flex-space-between"
                                                 style={{marginTop: 10}}>
                                                <div
                                                    className="bold">Buổi {index + 1} - {lesson.hw}/{lesson.total}</div>
                                                <div className="bold">
                                                    {`${Math.round(ratio)}%/${RATIO_ATTENDANCE_CLASS}%`}
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar"
                                                     style={{
                                                         width: ratio + '%',
                                                         backgroundColor: ratio >= RATIO_ATTENDANCE_CLASS ? successColor : failColor
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
                        <div>Tỉ lệ học viên làm bài tập về nhà</div>
                        <p className="description">
                            {data.teacher &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher.color}}
                            >
                                {getShortName(data.teacher.name)}
                            </button>}
                            {data.teaching_assistant &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teaching_assistant.color}}
                            >
                                {getShortName(data.teaching_assistant.name)}
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

HomeworkDetailContainer.propTypes = {};

export default HomeworkDetailContainer;
