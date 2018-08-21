/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import PropTypes from 'prop-types';

class HistoryCallContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.studentActions.loadHistoryCalls(this.props.params.studentId);
    }

    render() {
        return (
            <div className="tab-pane active">
                {
                    this.props.isLoadingHistoryCalls ? <Loading/> :
                        <ul className="timeline timeline-simple">
                            {
                                this.props.historyCalls.map(function (history, index) {
                                    let btn = '';
                                    if (history.call_status === 'success') {
                                        btn = ' success';
                                    }
                                    else if (history.call_status === 'failed') {
                                        btn = ' danger';
                                    } else if (history.call_status === 'calling') {
                                        btn = ' info';
                                    }

                                    return (
                                        <li className="timeline-inverted" key={index}>
                                            <div className={"timeline-badge " + btn}>
                                                <i className="material-icons">phone</i>
                                            </div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                                        <span className="label label-default"
                                                                              style={{backgroundColor: '#' + history.caller.color}}>
                                                                            {history.caller.name}</span> <span
                                                    className="label label-default">{history.updated_at}</span>
                                                </div>
                                                <div className="timeline-body">
                                                    {history.note}
                                                </div>
                                                {
                                                    history.appointment_payment &&
                                                    <div className="timeline-body">
                                                        Hẹn nộp tiền: {history.appointment_payment}
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}

HistoryCallContainer.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingHistoryCalls: PropTypes.bool.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCallContainer);
