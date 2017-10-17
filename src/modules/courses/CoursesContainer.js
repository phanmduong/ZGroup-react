import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListCourse from './ListCourse';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";

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
                                    <h4 className="card-title">Course Manager</h4>

                                    {this.props.isLoading ? <Loading/> :
                                        <ListCourse
                                            courses={this.props.coursesList}
                                        />
                                    }

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
