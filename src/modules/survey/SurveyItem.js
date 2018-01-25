import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, ProgressBar, Tooltip} from "react-bootstrap";
import {Link} from "react-router";
import ItemThumbnails from "../../components/common/ItemThumbnails";
import Avatar from "../../components/common/Avatar";
import Switch from 'react-bootstrap-switch';

class SurveyItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.editSurvey = this.editSurvey.bind(this);
    }

    editSurvey(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.editSurvey(this.props.survey);
    }

    render() {
        const {survey} = this.props;
        const toolTip = (
            <Tooltip id="tooltip">
                Sửa Survey
            </Tooltip>
        );
        const SurveyDisplayToolTip = (
            <Tooltip id="tooltip">
                Sửa hiển thị survey
            </Tooltip>
        );
        const percent = (
            <Tooltip id="tooltip">
                {survey.target === 0 ? 0 : (survey.take * 100 / survey.target).toFixed(2)}%
            </Tooltip>
        );
        const SurveyNametoolTip = (
            <Tooltip id="tooltip">
                {survey.name}
            </Tooltip>
        );
        return (
            <div className="col-sm-6 col-md-6 col-lg-4" id="card-email-template" key={survey.id}>
                <div className="card card-chart">
                    <div className="card-header" data-background-color="white" style={{
                        borderRadius: '10px'
                    }}>

                        <Link to={"survey/" + survey.id}>
                            <div id="simpleBarChart" className="ct-chart"
                                 style={{
                                     width: '100%',
                                     background: 'url(' + survey.image_url + ')',
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                     height: '200px',
                                     borderRadius: '10px',
                                     position: "relative"
                                 }}>
                            </div>
                        </Link>
                    </div>


                    <div className="card-content">
                        <div className="card-action">
                            <h4 className="card-title">
                                <OverlayTrigger placement="top" overlay={SurveyNametoolTip}>
                                    <Link
                                        to={"survey/" + survey.id}>
                                        {survey.name ? survey.name.length > 20 ? survey.name.slice(0, 17) + "..." : survey.name : "Chưa có tên"}
                                    </Link>
                                </OverlayTrigger>
                            </h4>


                            <OverlayTrigger placement="top" overlay={toolTip}>
                                <a onClick={this.editSurvey} type="button" style={{color: "#757575"}}>
                                    <i className="material-icons">edit</i>
                                </a>
                            </OverlayTrigger>

                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: 10,
                            paddingBottom: 10
                        }}>
                            <p>{survey.questions_count ? survey.questions_count : 0} câu hỏi</p>
                            <OverlayTrigger placement="top" overlay={SurveyDisplayToolTip}>
                                <a onClick={() => this.props.showSurveyDisplayModal(this.props.survey)}>
                                    <ItemThumbnails
                                        images={survey.survey_lessons.map((surveyLesson) => surveyLesson.course.icon_url)}/>
                                </a>
                            </OverlayTrigger>

                        </div>

                        <OverlayTrigger placement="top" overlay={percent}>
                            <ProgressBar bsStyle="success" now={survey.take * 100 / survey.target}/>
                        </OverlayTrigger>

                        <div style={{display: "flex", justifyContent: "space-between", height: 40}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                {survey.staff.avatar_url ?
                                    <Avatar size={40} url={survey.staff.avatar_url}
                                            style={{borderRadius: 6}}/> : null}
                                <div>
                                    <strong>{survey.staff.name}</strong><br/>
                                    <p className="category"
                                       style={{fontSize: 12, color: "#505050"}}>
                                        {survey.created_at}
                                    </p>
                                </div>
                            </div>

                            <div style={{display: "flex", alignItems: "center"}}>
                                <Switch
                                    onChange={() => {
                                        this.props.handleSwitch(this.props.survey);
                                    }}
                                    bsSize="mini"
                                    onText="Hiện" offText="Ẩn"
                                    value={(survey.active === 1)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

SurveyItem.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    showSurveyDisplayModal: PropTypes.func.isRequired,
    survey: PropTypes.object.isRequired,
    editSurvey: PropTypes.func.isRequired
};

export default SurveyItem;