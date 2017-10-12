import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListCourse from './ListCourse';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import _ from 'lodash';
class CoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
                isLoading: false,
                error: true,
                courses:[]
        };

    }
    componentWillMount(){
        this.props.coursesActions.loadCourses();
    }
    componentWillReceiveProps(){
        this.setState({courses:this.props.coursesList});
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Quản lý khóa học</h4>
                                    <table className="col-md-12">
                                        <tr>
                                            <td className="col-md-2"><button className="btn btn-fill btn-rose">Thêm môn học</button></td>
                                            <td className="col-md-8"><Search placeholder='Tìm kiếm khóa học' /></td>
                                        </tr>
                                    </table>
                                    {this.props.isLoading ? <Loading/> :
                                        <ListCourse
                                            courses={this.props.coursesList}
                                        />
                                    }

                                    <ul className="pagination pagination-primary">
                                        {_.range(1, 20 + 1).map(page => {

                                            if (1 === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => {
                                                            console.log(page)
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => {
                                                            console.log(page)
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            }
                                        })}

                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );
    }
}

CoursesContainer.propTypes = {
    coursesActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    coursesList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        error: state.courses.error,
        coursesList: state.courses.coursesList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
