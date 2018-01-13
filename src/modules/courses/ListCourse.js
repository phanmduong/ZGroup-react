import React                            from 'react';
import PropTypes                        from 'prop-types';
import * as helper                      from  "../../helpers/helper";
import ButtonGroupAction                from "../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as coursesActions   from './coursesActions';
import {bindActionCreators}             from 'redux';
import initialState                     from '../../reducers/initialState';
import Switch                           from "../../components/common/Switch";
import FormInputSelect from "../../components/common/FormInputSelect";


class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps",nextProps);
    // }

    editCourse(course) {
        this.props.coursesActions.loadCourses(course);
        initialState.coursesForm.data = course;
    }

    deleteCourse(courseId) {
        this.props.deleteCourse(courseId.id);
    }

    render() {
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-striped table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Tên Môn</th>
                        <th>Số lớp</th>
                        <th>Số buổi</th>
                        <th>Giá</th>
                        <th>Hình thức</th>
                        <th>Trạng thái</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.courses.map((course, index) => {
                        return (
                            <tr key={course.id}>
                                <td>
                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                            data-toggle="tooltip"
                                            title=""
                                            type="button"
                                            rel="tooltip"
                                            data-placement="right"
                                            data-original-title={course.name}>
                                        <img src={course.icon_url} alt=""/>
                                    </button>
                                </td>
                                <td>
                                    <div style={{width: "100%", backgroundColor: course.color}}
                                         className="btn btn-xs btn-main"
                                         data-toggle="tooltip"
                                         title=""
                                         type="button"
                                         rel="tooltip"
                                         data-placement="top"
                                         data-original-title={course.name}>
                                        {course.name}
                                    </div>
                                </td>
                                <td>{course.num_classes}</td>
                                <td>{course.duration}</td>
                                <td>{helper.convertMoneyToK(course.price)}</td>
                                <td>{this.props.type || ""}</td>
                                <td><Switch
                                    onChange={() => {
                                        return this.props.changeStatusCourse(index, course);
                                    }}
                                    value={course.status} onText="Hiện" offText="Ẩn"
                                /></td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl={"/teaching/courses/edit/" + course.id + ""}
                                        delete={this.deleteCourse}
                                        object={course}
                                    >
                                        {
                                            !this.props.isDuplicating &&
                                            <a data-toggle="tooltip" title="Duplicate"
                                               type="button"
                                               onClick={() => {return this.props.duplicateCourse(course);}}
                                               rel="tooltip"
                                            >
                                                <i className="material-icons">control_point_duplicate</i>
                                            </a>
                                        }

                                    </ButtonGroupAction>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}


ListCourse.propTypes = {
    courses: PropTypes.array.isRequired,
    coursesActions : PropTypes.object.isRequired,
    deleteCourse : PropTypes.func,
    changeStatusCourse : PropTypes.func,
    duplicateCourse : PropTypes.func,
    isDuplicating : PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        data: state.coursesCreateEdit.data,

    };
}


function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);

