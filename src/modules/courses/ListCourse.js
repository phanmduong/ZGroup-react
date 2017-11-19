import React                            from 'react';
import PropTypes                        from 'prop-types';
import * as helper                      from  "../../helpers/helper";
import ButtonGroupAction                from "../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as coursesActions   from './coursesActions';
import {bindActionCreators}             from 'redux';
import initialState                     from '../../reducers/initialState';


class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state          = {};
        this.editCourse     = this.editCourse.bind(this);
        this.deleteCourse   = this.deleteCourse.bind(this);
    }

    componentWillReceiveProps() {

    }

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
                        <th>Số lớp đã mở</th>
                        <th>Số buổi</th>
                        <th>Giá</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.courses.map((course) => {
                        return (
                            <tr key={course.id}>
                                <td>
                                    <button className   ="btn btn-round btn-fab btn-fab-mini text-white"
                                            data-toggle ="tooltip"
                                            title       =""
                                            type        ="button"
                                            rel         ="tooltip"
                                            data-placement      ="right"
                                            data-original-title ={course.name}>
                                        <img src={course.icon_url} alt=""/>
                                    </button>
                                </td>
                                <td>{course.name}</td>
                                <td>{course.num_classes}</td>
                                <td>{course.duration}</td>

                                <td>
                                    <div style              ={{width: 100}}
                                         className          ="btn btn-xs btn-main"
                                         data-toggle        ="tooltip"
                                         title              =""
                                         type               ="button"
                                         rel                ="tooltip"
                                         data-original-title={helper.convertMoneyToK(course.price)}>
                                        {helper.convertMoneyToK(course.price)}
                                    </div>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl={"/manage/courses/edit/" + course.id + ""}
                                        delete={this.deleteCourse}
                                        object={course}
                                    />
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
    deleteCourse : PropTypes.func
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

