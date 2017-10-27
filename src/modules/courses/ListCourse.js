import React from 'react';
import PropTypes from 'prop-types';
import * as helper from  "../../helpers/helper";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {connect} from 'react-redux';
import  * as coursesFormActions from './coursesForm/CoursesCreateEditActions';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router';
import initialState from '../../reducers/initialState';


class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log('list course',this.props);
        this.state = {

        }
        this.editCourse = this.editCourse.bind(this);
    }

    editCourse(course){
        console.log(this.props);

        this.props.coursesFormActions.loadCoursesForm(course);
        initialState.coursesForm.data = course;
    }

    render(){
        return (
            <div className="material-datatables">
                
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
                {this.props.courses.map((course)=>{
                    return (
                        <tr key={course.id}>
                            <td>
                                <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                        data-placement="right"
                                        data-original-title={course.name}>
                                    <img src={course.icon_url} alt=""/>
                                </button>
                            </td>
                            <td>{course.name}</td>
                            <td>{course.num_classes}</td>
                            <td>{course.duration}</td>

                            <td>
                                <div style={{width : 100}} className="btn btn-xs btn-main" data-toggle="tooltip" title="" type="button" rel="tooltip" data-original-title={helper.convertMoneyToK(course.price)}>
                                    {helper.convertMoneyToK(course.price)}
                                </div>
                            </td>
                            <td>
                            <ButtonGroupAction

                                editUrl={"/manage/courses/"+course.id+"/edit"}

                                delete={()=>{/*delete course*/}}


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
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.coursesCreateEdit.data
    };
}


function mapDispatchToProps(dispatch) {
    return {
        coursesFormActions: bindActionCreators(coursesFormActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);

