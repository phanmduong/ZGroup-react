import React from 'react';
import {observer} from 'mobx-react';
import filterExamStore from "./filterExamStore";
import DateRangePicker from "../../../../components/common/DateTimePicker";
import ItemReactSelect from "../../../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as baseActions from "../../../../actions/baseActions";
import {connect} from "react-redux";
import moment from "moment";
import Loading from "../../../../components/common/Loading";
import {DATE_FORMAT_SQL} from "../../../../constants/constants";
import * as loginActions from "../../../login/loginActions";

@observer
class FilterExam extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    changeDateRangePicker = (start_time, end_time) => {
        filterExamStore.filter = {...filterExamStore.filter, start_time, end_time, gen_id: 0};
        this.load();
    };

    onChangeGen = (value) => {
        const gen_id = value ? value.value : 0;

        if (value) {
            filterExamStore.filter.start_time = moment(value.start_time);
            filterExamStore.filter.end_time = moment(value.end_time);
        }

        filterExamStore.filter = {...filterExamStore.filter, gen_id};
        this.load();
    };

    onChangeCourse = (value) => {
        console.log('test', value);
        const course_id = value ? value.value : 0;
        filterExamStore.filter = {...filterExamStore.filter, course_id, class_id: ''};
        this.load();
    };

    onChangeClass = (value) => {
        const class_id = value ? value.value : 0;
        filterExamStore.filter = {...filterExamStore.filter, class_id,class: value, course_id: ''};
        this.load();
    };


    load = () => {
        const filter = {...filterExamStore.filter};
        filter.start_time = filterExamStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterExamStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.props.loadData(filter);
    };


    render() {
        let {filter, gensData, isLoading, coursesData} = filterExamStore;
        if (isLoading) return (
            <div className="row gutter-20 margin-top-20">
                <Loading/>
            </div>
        );
        return (
            <div className="row gutter-20 margin-top-20">
                <div className="col-md-3">
                    <DateRangePicker
                        className="background-white padding-vertical-10px cursor-pointer margin-bottom-20"
                        start={filter.start_time} end={filter.end_time}
                        style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                        onChange={this.changeDateRangePicker}
                    />
                </div>
                <div className="col-md-3">
                    <ReactSelect
                        value={filter.gen_id}
                        options={gensData}
                        onChange={this.onChangeGen}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn khóa"
                        clearable={false}
                    />
                </div>


                <div className="col-md-3">
                    <ReactSelect
                        value={filter.course_id}
                        options={coursesData}
                        onChange={this.onChangeCourse}
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn khóa học"
                        clearable={false}
                    />
                </div>


                <div className="col-md-3">
                    <ReactSelect.Async
                        loadOptions={(p1, p2) => filterExamStore.searchClasses(p1, p2)}
                        loadingPlaceholder="Đang tải..."
                        className="react-select-white-light-round cursor-pointer margin-bottom-20"
                        placeholder="Chọn lớp học"
                        searchPromptText="Không có dữ liệu"
                        onChange={this.onChangeClass}
                        value={filter.class}
                        id="select-async-class"
                        optionRenderer={(option) => {
                            return (
                                <ItemReactSelect label={option.label}
                                                 url={option.avatar_url}/>
                            );
                        }}
                        valueRenderer={(option) => {
                            return (
                                <ItemReactSelect label={option.label}
                                                 url={option.avatar_url}/>
                            );
                        }}
                    />
                </div>


            </div>
        );
    }
}

FilterExam.propTypes = {
    selectedBaseId: PropTypes.number,
    baseActions: PropTypes.object,
    loginActions: PropTypes.object,
    loadData: PropTypes.func.render,
    user: PropTypes.object,
};

function

mapStateToProps(state) {
    return {
        selectedBaseId: state.global.selectedBaseId,
        bases: state.global.bases,
        provinces: state.global.provinces,
        user: state.login.user,
    };
}

function

mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterExam);
