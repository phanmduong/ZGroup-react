import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateClassStudentRatingStore";
import {observer} from "mobx-react";
import {getShortName, isEmptyInput, validateLinkImage} from "../../../helpers/helper";
import _ from 'lodash';
import Star from "../../../components/common/Star";
import {NO_AVATAR} from "../../../constants/env";
import PropTypes from "prop-types";

@observer
class StudentRatingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        };
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedTeaching,
            this.props.selectedBaseId, this.props.selectedGenId, this.props.user);
        this.store.loadData(this.props.info.id);
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    renderRating() {

        const isTeacher = this.props.selectedTeaching == "teacher";
        let rate = _.meanBy(this.store.data, 'rating');
        rate = rate > 0 ? Math.round(rate * 10) / 10 : 5;
        return (
            <div className="panel-group" id="accordion"
                 role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab"
                         id={"heading_" + isTeacher}>
                        <a role="button" data-toggle="collapse"
                           data-parent="#accordion"
                           href={"#collapse_" + isTeacher}
                           aria-expanded="false"
                           aria-controls={"collapse_" + isTeacher}
                           className="collapsed">
                            <div className="margin-left-10 margin-bottom-20">
                                <div className="flex flex-space-between">
                                    <div className="text-h5">
                                        <strong>{this.props.selectedTeaching == "teacher" ? "Giảng viên" : "Trợ giảng"} : {rate}/5</strong>
                                        <a className="panel-title"><i className="material-icons">keyboard_arrow_down</i></a>
                                    </div>
                                    <div className="flex flex-justify-content-center"><Star
                                        maxStar={5}
                                        value={rate}
                                        disable
                                    /></div>

                                </div>

                                <div>
                                    {
                                        this.store.commentsDictionary.map((comment) => {
                                            return (
                                                <div
                                                    className={"btn btn-round " + (comment.point == 1 ? "btn-success" : "btn-danger")}>
                                                    {comment.word} ({comment.frequency})
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <br/>

                            </div>
                        </a>
                        <div id={"collapse_" + isTeacher}
                             className="panel-collapse collapse"
                             role="tabpanel"
                             aria-labelledby={"heading_" + isTeacher}
                             aria-expanded="false"
                             style={{height: '0px'}}>
                            <div className="panel-body">
                                {
                                    this.store.getData.map((classData, index) => {
                                        return (
                                            <div key={index}>

                                                {
                                                    classData.registers.map((register) => {
                                                        return (
                                                            <div className="flex-row-center  margin-bottom-20">
                                                                <img
                                                                    className="image-class-attendance-class-dashboard"
                                                                    src={register.student && !isEmptyInput(register.student.avatar_url) ? register.student.avatar_url : NO_AVATAR}/>
                                                                <div className="flex flex-col" style={{flex: 1}}>
                                                                    <div className="flex-row-center flex-space-between">
                                                                        <a href={"/sales/info-student/" + register.student.id}
                                                                           target="_blank">
                                                                            <div
                                                                                className="bold">{register.student ? register.student.name : ''}</div>
                                                                        </a>
                                                                        <Star
                                                                            maxStar={5}
                                                                            value={register.rating}
                                                                            disable
                                                                        />
                                                                    </div>
                                                                    <div className="note">
                                                                        {register.comment}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
            ;
    }

    render() {
        const {info} = this.props;
        return (
            <div>
                <div>
                    {this.props.selectedTeaching == "teacher" &&
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                    >
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(info.course.icon_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {info.name}
                        </div>
                        <p className="description">
                            {(info.teacher ) &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + info.teacher.color}}
                            >
                                {getShortName(info.teacher.name)}
                            </button>}
                            {(info.teacher_assistant) &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + info.teacher_assistant.color}}
                            >
                                {getShortName(info.teacher_assistant.name)}
                            </button>}
                        </p>
                        <br/>
                    </div>}
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            {this.renderRating()}
                        </div>
                    }

                </div>
            </div>

        );
    }


}

StudentRatingContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    info: PropTypes.number.isRequired,
};

export default StudentRatingContainer;

