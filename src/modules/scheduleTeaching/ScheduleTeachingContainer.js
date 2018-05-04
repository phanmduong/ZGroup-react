/**
 * Created by Kiyoshitaro on 04/05/18.
 */

import React, {Component} from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import Loading from "../../components/common/Loading";
// import Select from "../../components/common/Select";
import Calendar from "../../components/common/Calendar";
import store from "./ScheduleTeachingStore";

// import moment from "moment";
// import { DATETIME_FORMAT_SQL, DATETIME_FORMAT, STATUS_REGISTER_ROOM } from "../../constants/constants";
// import {convertTimeToSecond} from "../../helpers/helper";
import PropTypes from 'prop-types';
import ClassContainer from "./ClassContainer";
import Select from "../../components/common/Select";


@observer
class ScheduleClassContainer extends Component {
    constructor(props) {
        super(props);
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        // self = this;
    }

    componentWillMount() {
        store.loadClasses();
        store.loadGens();
        store.loadBases();
    }

    onChangeGen(value) {
        store.genId = value;
        store.loadClasses();
    }

    onChangeBase(value) {
        store.baseId = value;
        store.loadClasses();
    }


    render() {
        let classes = [];
        store.classes && store.classes.map(_class => {
            if(_class.schedule) {
                const  tmp = _class.schedule.study_sessions.map(schedule => {
                    return {
                        title: _class.name,
                        teacher_name: _class.teacher && _class.teacher.name,
                        class_id: _class.id,
                        start: schedule.start_time,
                        end: schedule.end_time,
                        color: "#ff4444",
                        // color: "#" + _class.teacher && _class.teacher.color,
                        overlay: 1,
                    };
                });
                classes = [...classes,...tmp];
            }
        });

        return (
            <div>
                {store.isLoadingClasses || store.isLoadingGens || store.isLoadingBases ? <Loading/>
                    : (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={store.gensData}
                                        value={store.genId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={store.basesData}
                                        value={store.baseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-content">
                                    <Calendar
                                        id={"room-calender"}
                                        calendarEvents={classes}
                                        onClick={(value) => {
                                            // console.log(store.class_id,value.class_id, "schedule");
                                            // store.class_id = value.class_id;
                                            store.isShowClassModal = true;
                                            store.loadClass(value.class_id);
                                        }}
                                        // onClickDay={day => {
                                        //     self.openModalBooking(day, room);
                                        // }}
                                    />
                                </div>
                            </div>
                        </div>
                    )

                }
                <ClassContainer/>
            </div>
        );
    }
}

ScheduleClassContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(ScheduleClassContainer);
