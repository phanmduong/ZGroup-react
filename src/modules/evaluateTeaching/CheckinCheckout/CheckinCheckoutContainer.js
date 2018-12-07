import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateTeachingCheckInCheckoutStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {validateLinkImage} from "../../../helpers/helper";
import AttendanceClass from "../../dashboard/AttendanceClass";
import AttendanceTeacher from "./AttendanceTeacher";
import * as helper from "../../../helpers/helper";
import {RATIO_CHECKIN_CHECKOUT_TEACHING_PASS} from "../../../constants/constants";

@observer
class CheckinCheckoutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        }
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

    render() {
        return (
            <div>
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
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
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
                        <div>Lịch sử Check in/ Check out</div>
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đúng giờ</div>
                                <div className="bold">
                                    {`${Math.round(this.store.checkincheckoutPassed.length * 100 / (
                                        this.store.checkincheckoutRejected.length + this.store.checkincheckoutPassed.length
                                    ))}%/${RATIO_CHECKIN_CHECKOUT_TEACHING_PASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: (this.store.checkincheckoutPassed.length * 100 / (
                                             this.store.checkincheckoutRejected.length + this.store.checkincheckoutPassed.length))
                                             + '%',
                                         backgroundColor: (this.store.checkincheckoutPassed.length * 100 / (
                                             this.store.checkincheckoutRejected.length + this.store.checkincheckoutPassed.length) >
                                             RATIO_CHECKIN_CHECKOUT_TEACHING_PASS)
                                             ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                                <li className={this.state.tab === 1 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 1})}>
                                        Đúng giờ ({this.store.checkincheckoutPassed.length})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                                <li className={this.state.tab === 2 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 2})}>
                                        Vi phạm ({this.store.checkincheckoutRejected.length})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                            </ul>
                            <div>
                                {this.state.tab == 1 ? this.renderCheckinCheckout(this.store.checkincheckoutPassed) : this.renderCheckinCheckout(this.store.checkincheckoutRejected)}
                            </div>
                        </div>
                    }

                </div>

            </div>

        );
    }

    renderCheckinCheckout(data) {
        data = helper.groupBy(data, classData => classData.class_id, ["class", "lessons"]);
        console.log(data);
        return (
            <div>
                {data.map(function (classData, index) {
                    return (
                        <div key={index}>
                            <div className="flex-row-center" style={{margin: '10px 0'}}>
                                <img
                                    className="image-class-attendance-class-dashboard"
                                    src={classData.lessons[0] ? classData.lessons[0].course_avatar_url : ''}/>
                                <div className="text-h5">
                                    <strong>{classData.lessons[0] ? classData.lessons[0].class_name : ''}</strong>
                                </div>
                            </div>
                            {
                                classData.lessons.map((lesson, index2) => {
                                    return (
                                        <AttendanceTeacher
                                            lesson={lesson}
                                            key={index2}
                                        />)
                                })
                            }
                        </div>
                    );
                })
                }
            </div>
        )
    }
}

CheckinCheckoutContainer.propTypes = {};

export default CheckinCheckoutContainer;

