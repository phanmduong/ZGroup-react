/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import PropTypes from 'prop-types';
import Pagination from "../../../components/common/Pagination";

class LogsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentPage: 1
        };
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }

    componentWillMount() {
        this.loadLogs();
    }

    loadLogs = (page = 1) => {
        this.props.studentActions.loadLogs(this.studentId, page);
        this.setState({currentPage: page});
    };

    render() {
        return (
            <div className="tab-pane active">
                {this.props.isLoading ? <Loading/> :
                    <ul className="timeline timeline-simple">


                        {this.props.logs.map((log, index) => {
                            return (
                                <li className="timeline-inverted" key={index}>
                                    <div className={"timeline-badge "} style={{backgroundColor: log.color}}>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="">
                                            <h4>
                                                <b>{log.name}</b>
                                            </h4>
                                            <div className="timeline-heading">
                                            </div>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;{log.created_at}
                                                </div>
                                        </div>

                                    </div>
                                    </div>
                                </li>
                            );
                        })}

                    </ul>
                }
                <Pagination
                    totalPages={this.props.totalPage}
                    currentPage={this.state.currentPage}
                    loadDataPage={this.loadLogs}
                />
            </div>
        );
    }
}

LogsContainer.propTypes = {
    logs: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPage: PropTypes.number.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        logs: state.infoStudent.log.logs,
        isLoading: state.infoStudent.log.isLoading,
        totalPage: state.infoStudent.log.totalPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
