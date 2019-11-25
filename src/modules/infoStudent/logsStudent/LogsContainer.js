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
        }
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
            <div className="col-md-12">
                {this.props.isLoading ? <Loading/> :
                    <div className="table-responsive">

                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>Thời gian</th>
                                <th>Trang</th>
                                <th>IP</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.logs.map((log, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {log.time}
                                        </td>
                                        <td>
                                            <a href={log.full_link} target="_blank">{log.link}</a>
                                        </td>
                                        <td>{log.ip}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
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
