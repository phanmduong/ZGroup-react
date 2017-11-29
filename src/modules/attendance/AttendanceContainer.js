import React                        from 'react';
import {connect}                    from 'react-redux';
import PropTypes                    from 'prop-types';
import {bindActionCreators}         from 'redux';
import * as    attendanceActions    from '../attendance/attendanceActions';
import ListClassComponent           from './ListClassComponent';
import Search                       from '../../components/common/Search';
import _                            from 'lodash';
import ListLessonModal              from './ListLessonModal';
import LessonDetailModal              from './LessonDetailModal';

class AttendanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query : "",
            page  :  1,
            showModalLesson: false,
            showModalDetailLesson: false,
            selectedLessonId: 1,
            selectedClass: {
                id : 0,
                course:{
                    icon_url: "",
                },
            },
        };
        this.classesSearchChange        = this.classesSearchChange.bind(this);
        this.loadClasses                = this.loadClasses.bind(this);
        this.closeModalLesson           = this.closeModalLesson.bind(this);
        this.openModalLesson            = this.openModalLesson.bind(this);
        this.openModalDetailLesson      = this.openModalDetailLesson.bind(this);
        this.closeModalDetailLesson     = this.closeModalDetailLesson.bind(this);
        this.takeAttendance             = this.takeAttendance.bind(this);
    }

    componentWillMount(){
        this.props.attendanceActions.loadClasses();
    }

    componentWillReceiveProps(nextProps){
        console.log('AttendanceContainer',nextProps);
    }

    loadClasses(page = 1, query = '', teacherid) {
        this.setState({page});
        this.props.attendanceActions.loadClasses(query, page, teacherid);
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.loadClasses(1, value);
        }.bind(this), 500);
    }

    openModalLesson(index){
        this.setState({
            showModalLesson: true,
            selectedClass:  this.props.data.classes[index]});
        this.props.attendanceActions.loadClassLessonModal(this.props.data.classes[index].id);
    }

    closeModalLesson(){
        this.setState({showModalLesson: false});
    }

    openModalDetailLesson(id){
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.state.selectedClass.id,id);
    }

    closeModalDetailLesson(){
        this.setState({showModalDetailLesson: false});
        this.props.attendanceActions.loadClassLessonModal(this.state.selectedClass.id);
    }

    takeAttendance(classid, lessonid, studentid, index){

        if(!this.props.isTakingAttendance) {
            console.log(classid, lessonid, studentid, index);
            this.props.attendanceActions.takeAttendance(classid, lessonid, studentid, index);
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách lớp</h4>
                            <Search
                                onChange={this.classesSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm lớp"
                            />
                            <ListClassComponent
                                classes={this.props.data.classes}
                                isLoading={this.props.isLoading}
                                searchByTeacher={this.loadClasses}
                                openModalLesson={this.openModalLesson}
                            />
                            <ul className="pagination pagination-primary">
                                { _.range(1, (this.props.data.paginator? this.props.data.paginator.total_pages :0) + 1).map(page => {
                                    if (Number(this.state.page) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadClasses(page, this.state.query)}>
                                                    {page}
                                                </a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadClasses(page, this.state.query)}>
                                                    {page}
                                                </a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </div>
                    </div>
                    <ListLessonModal
                        lessondata={this.props.class ? this.props.class : []}
                        show={this.state.showModalLesson}
                        onHide={this.closeModalLesson}
                        class={this.state.selectedClass}
                        openModalDetailLesson={this.openModalDetailLesson}
                        isLoadingLessonClassModal={this.props.isLoadingLessonClassModal}
                    />
                    <LessonDetailModal
                        show={this.state.showModalDetailLesson}
                        onHide={this.closeModalDetailLesson}
                        class={this.state.selectedClass}
                        list={this.props.lesson}
                        takeAttendance={this.takeAttendance}
                        selectedLessonId={this.state.selectedLessonId}
                    />
                </div>
            </div>

        );
    }

}
/**/

AttendanceContainer.propTypes = {

};

function mapStateToProps(state) {
    return {
        isLoading:                      state.attendance.isLoading,
        isTakingAttendance:             state.attendance.isTakingAttendance,
        isLoadingLessonClassModal:      state.attendance.isLoadingLessonClassModal,
        isLoadingLessonDetailModal:     state.attendance.isLoadingLessonDetailModal,
        data:                           state.attendance.data,
        class:                          state.attendance.class,
        lesson:                         state.attendance.lesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceContainer);
