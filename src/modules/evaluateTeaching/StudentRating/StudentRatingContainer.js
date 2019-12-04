import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateTeachingStudentRatingStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {isEmptyInput, validateLinkImage} from "../../../helpers/helper";
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
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    renderRating() {
        let rate = 5;
        rate = _.meanBy(this.store.data, 'rating');
        rate = rate > 0 ? Math.round(rate * 10) / 10 : 5;
        return (
            <div>
                <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                     style={{marginBottom: 20}}>
                    <div>{rate}/5</div>
                    <Star
                        maxStar={5}
                        value={rate}
                        disable
                    />
                </div>
                <div>
                    {
                        this.store.commentsDictionary.map((comment) => {
                            return (
                                <div
                                    className={"btn btn-round " + (comment.point == 1 ? "btn-success" : "btn-primary")}>
                                    {comment.word} ({comment.frequency})
                                </div>
                            );
                        })
                    }
                </div>
                <br/>
                {
                    this.store.getData.map((classData, index) => {
                        return (
                            <div key={index}>
                                <div className="flex-row-center" style={{margin: '20px 0'}}>
                                    <img
                                        className="image-class-attendance-class-dashboard"
                                        src={classData.registers[0] ? classData.registers[0].course_avatar_url : ''}/>
                                    <div className="text-h5">
                                        <strong>{classData.registers[0] ? classData.registers[0].class_name : ''}</strong>
                                    </div>
                                </div>
                                {
                                    classData.registers.map((register) => {
                                        return (
                                            <div className="flex-row-center" style={{margin: '30px 30px'}}>
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

        )
            ;
    }

    render() {
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }

                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                    >
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(this.store.user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {this.store.user.name}
                        </div>
                    </div>
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
};

export default StudentRatingContainer;

