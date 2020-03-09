import React from "react";
import {observer} from "mobx-react";

import {getShortName, validateLinkImage} from "../../../helpers/helper";
import {RATIO_ATTENDANCE_CLASS} from "../../../constants/constants";
import TooltipButton from "../../../components/common/TooltipButton";


@observer
class TopicDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }


    renderTopic(data, real_register_count) {
        const successColor = '#2EBE21';
        const failColor = '#c50000';
        const warningColor = '#F9D616';
        const grayColor = '#DDDDDD';
        const unchecked = data.submitted - data.rejected - data.accepted;
        const raito_hw = (data.submitted * 100 / real_register_count);
        const raito_hw_success = (data.accepted * 100 / real_register_count);
        const raito_hw_reject = (data.rejected * 100 / real_register_count);
        const raito_hw_unchecked = (unchecked * 100 / real_register_count);
        const widthRaitoHomeWork = (raito_hw / RATIO_ATTENDANCE_CLASS * 100);
        const attendanceColor = raito_hw >= RATIO_ATTENDANCE_CLASS ? successColor : failColor;
        return (
            <div>
                <div className="panel-group" id="accordion"
                     role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="flex" role="tab"
                             id="heading_">
                            <div className="img"
                                 style={{
                                     background: 'url(' + validateLinkImage(data.avatar_url) + ') center center / cover',
                                     width: '100px',
                                     height: '60px',
                                     borderRadius:5
                                 }}
                            />
                            <div className="flex flex-col flex-space-around" style={{marginLeft: 15}}>
                                <div className="bold" style={{color: 'black', fontSize: 18}}>{data.title}</div>
                                <div>
                                    Tạo bởi <strong>{data.creator.name}</strong> - {data.created_at}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: widthRaitoHomeWork + '%',
                                         backgroundColor: attendanceColor
                                     }}/>
                            </div>


                        </div>

                        <div className="panel-body" style={{paddingLeft: 120}}>
                            <div>
                                <div className="flex flex-space-between"
                                     style={{marginTop: 10}}>
                                    <div>Số lượng đã nộp bài
                                    </div>
                                    <div className="bold">
                                        {`${data.submitted}/${real_register_count}`}
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar"
                                         style={{
                                             width: raito_hw + '%',
                                             backgroundColor: raito_hw >= RATIO_ATTENDANCE_CLASS ? successColor : failColor
                                         }}/>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body" style={{paddingLeft: 120}}>
                            <div>
                                <div className="flex flex-space-between">
                                    <div>Số lượng đã duyệt bài
                                    </div>
                                    <div className="bold">
                                        {/*{`${data.accepted}/${data.rejected}/${unchecked}/${real_register_count}`}*/}
                                        {`${data.accepted}/${data.rejected}/${unchecked}/${real_register_count-data.submitted}`}
                                    </div>
                                </div>
                                <div className="progress">
                                    <TooltipButton placement="top" text={`Đạt yêu cầu: ${data.accepted}`}>
                                        <div className="progress-bar"
                                             style={{
                                                 width: raito_hw_success + '%',
                                                 backgroundColor: successColor
                                             }}/>
                                    </TooltipButton>
                                    <TooltipButton placement="top" text={`Chưa duyệt: ${unchecked}`}>
                                        <div className="progress-bar"
                                             style={{
                                                 width: raito_hw_unchecked + '%',
                                                 backgroundColor: warningColor
                                             }}/>
                                    </TooltipButton>
                                    <TooltipButton placement="top" text={`Chưa đạt yêu cầu: ${data.rejected}`}>
                                        <div className="progress-bar"
                                             style={{
                                                 width: (raito_hw_reject) + '%',
                                                 backgroundColor: failColor
                                             }}/>
                                    </TooltipButton>
                                        <TooltipButton placement="top" text={`Không nộp bài: ${real_register_count - data.submitted}`}>
                                        <div className="progress-bar"
                                             style={{
                                                 width: (100 - raito_hw) + '%',
                                                 backgroundColor: grayColor
                                             }}/>
                                    </TooltipButton>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <hr/>
            </div>

        );
    }

    render() {
        const data = {...this.props.data};
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
                        {this.props.data.topics.map(obj => this.renderTopic(obj, data.real_register_count))}
                        {(!this.props.data.topics || this.props.data.topics.length == 0) && <h4>Không có topic nào.</h4>}
                    </div>


                </div>
            </div>

        );
    }
}

TopicDetailContainer.propTypes = {};

export default TopicDetailContainer;
