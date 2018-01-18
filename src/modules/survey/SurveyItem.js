import React from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from "react-router";

class SurveyItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {survey} = this.props;
        const SurveyNameToolTip = (
            <Tooltip id="tooltip">
                {survey.name}
            </Tooltip>
        );
        return (
            <div key={survey.id} className="col-md-4 col-sm-6">
                <Link to={"survey/" + survey.id}
                      style={{
                          width: "100%",
                          background: "white",
                          color: "#455a64",
                          textAlign: "left"
                      }}
                      className="btn btn-default btn-lg">


                    <div className="dropdown" style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px"
                    }}>
                        <a className="dropdown-toggle btn-more-dropdown"
                           type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">

                            <li className="more-dropdown-item">
                                <a onClick={this.onEditClick}>
                                    <i className="material-icons"
                                       style={{fontSize: "18px"}}>edit</i>
                                    Chỉnh sửa
                                </a>
                            </li>
                        </ul>
                    </div>


                    <OverlayTrigger placement="top" overlay={SurveyNameToolTip}>
                        <div className="row"
                             style={{
                                 fontSize: "16px",
                                 fontWeight: 600,
                                 whiteSpace: "normal"
                             }}>
                            <i className="material-icons">list</i> {survey.name.length > 20 ? survey.name.slice(0, 17) + "..." : survey.name}
                        </div>
                    </OverlayTrigger>
                    <div className="row"
                         style={{
                             height: "5px",
                             marginTop: "10px",
                             marginBottom: "10px",
                             background: survey.color ? survey.color : "#d9d9d9"
                         }}/>
                    <div className="row" style={{
                        textTransform: "none",
                        marginBottom: "10px"
                    }}>
                        <br/>
                        {survey.questions_count ? survey.questions_count : 0} câu
                        hỏi
                        <br/>
                    </div>
                    <div className="row"
                         style={{
                             display: "flex",
                             flexFlow: "row-reverse wrap",
                             height: "29px"
                         }}>

                        {/*{*/}
                        {/*survey.members && survey.members.map((member) => {*/}
                        {/*return (*/}
                        {/*<div*/}
                        {/*onClick={(event) => {*/}
                        {/*if (isAdmin) {*/}
                        {/*event.preventDefault();*/}
                        {/*event.stopPropagation();*/}
                        {/*this.onEditClick(event);*/}
                        {/*}*/}
                        {/*}}*/}
                        {/*key={member.id}*/}
                        {/*style={{padding: "2px 0px"}}>*/}
                        {/*<div style={{*/}
                        {/*width: "25px",*/}
                        {/*marginRight: "5px",*/}
                        {/*height: "25px",*/}
                        {/*backgroundPosition: "center center",*/}
                        {/*backgroundSize: "cover",*/}
                        {/*borderRadius: "4px",*/}
                        {/*backgroundImage: `url('${member.avatar_url}')`*/}
                        {/*}}/>*/}
                        {/*</div>*/}
                        {/*);*/}
                        {/*})*/}
                        {/*}*/}

                    </div>
                    <div className="ripple-container"/>
                </Link>
            </div>
        );
    }
}

SurveyItem.propTypes = {
    survey: PropTypes.object.isRequired
};

export default SurveyItem;