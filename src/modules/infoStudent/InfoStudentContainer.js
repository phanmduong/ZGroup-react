/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as studentActions from './studentActions';
import * as helper from '../../helpers/helper';
import {NO_AVATAR} from '../../constants/env';
import Loading from '../../components/common/Loading';

class InfoStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params.studentId;
        this.path = '';
    }

    componentWillMount() {
        this.props.studentActions.loadInfoStudent(this.studentId);
    }

    render() {
        this.path = this.props.location.pathname;
        console.log(this.path);
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-tabs" data-background-color="rose">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className={this.path === `/info-student/${this.studentId}` ? 'active' : ''}>
                                                <IndexLink to={`/info-student/${this.studentId}`}>
                                                    <i className="material-icons">add_box</i> Đăng kí

                                                    <div className="ripple-container"></div>
                                                </IndexLink>
                                            </li>
                                            <li className={this.path === `/info-student/${this.studentId}/history-calls` ? 'active' : ''}>
                                                <Link to={`/info-student/${this.studentId}/history-calls`}>
                                                    <i className="material-icons">smartphone</i> Cuộc gọi
                                                    <div className="ripple-container"></div>
                                                </Link>
                                            </li>
                                            <li className={this.path === `/info-student/${this.studentId}/progress` ? 'active' : ''}>
                                                <Link to={`/info-student/${this.studentId}/progress`}>
                                                    <i className="material-icons">create</i> Học tập
                                                    <div className="ripple-container"></div>
                                                </Link>
                                            </li>
                                            <li className={this.path === `/info-student/${this.studentId}/care` ? 'active' : ''}>
                                                <Link to={`/info-student/${this.studentId}/care`}>
                                                    <i className="material-icons">flag</i> Quan tâm
                                                    <div className="ripple-container"></div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-profile">
                                    <div className="card-avatar">
                                        <a>
                                            <img className="img"
                                                 src={helper.isEmptyInput(this.props.student.avatar_url) ?
                                                     NO_AVATAR : this.props.student.avatar_url
                                                 }/>
                                        </a>
                                    </div>
                                    {this.props.isLoadingStudent ? <Loading/>
                                        :
                                        <div className="card-content">
                                            <h4 className="card-title">{this.props.student.name}</h4>
                                            <h6 className="category text-gray">{this.props.student.email}</h6>
                                            <p className="description">{this.props.student.phone}</p>
                                            <button className="btn btn-rose btn-round">Sửa
                                            </button>
                                        </div>
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

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        isLoadingStudent: state.infoStudent.isLoadingStudent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStudentContainer);
