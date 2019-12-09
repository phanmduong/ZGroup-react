/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import PropTypes from 'prop-types';
// import FormInputDate from "../../../components/common/FormInputDate";

class HistoryCallContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            note: '',
            appointmentPayment: '',
            dateTest: ''
        };
        this.studentId = this.props.params ? this.studentId : this.props.studentId;

    }


    componentWillMount() {
        this.props.studentActions.loadHistoryCalls(this.studentId);
    }
    changeCallStatusStudent = (callStatus, studentId) => {
        this.props.studentActions.changeCallStatusStudent(callStatus, studentId, this.state.note, this.state.appointmentPayment, this.state.dateTest);
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
                                                {
                                                    history.date_test &&
                                                    <div
                                                        className="timeline-body">
                                                        Hẹn kiểm tra: {history.date_test}
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                }
                {/*<div className="form-group label-floating is-empty">*/}
                {/*    <label className="control-label">Ghi chú</label>*/}
                {/*    <input type="text" className="form-control"*/}
                {/*           value={this.state.note}*/}
                {/*           onChange={(event) => this.setState({note: event.target.value})}/>*/}
                {/*    <span className="material-input"/>*/}
                {/*    <span className="material-input"/></div>*/}
                {/*<FormInputDate*/}
                {/*    label="Hẹn nộp tiền"*/}
                {/*    name="appointmentPayment"*/}
                {/*    updateFormData={(event) => {*/}
                {/*        this.setState({appointmentPayment: event.target.value});*/}
                {/*    }}*/}
                {/*    id="form-appointment_payment"*/}
                {/*    value={this.state.appointmentPayment}*/}
                {/*/>*/}
                {/*<FormInputDate*/}
                {/*    label="Hẹn kiểm tra"*/}
                {/*    name="dateTest"*/}
                {/*    updateFormData={(event) => {*/}
                {/*        this.setState({dateTest: event.target.value});*/}
                {/*    }}*/}
                {/*    id="form-date_test"*/}
                {/*    value={this.state.dateTest}*/}
                {/*/>*/}
                {/*{this.props.isChangingStatusCall ?*/}
                {/*    (*/}
                {/*        <div>*/}
                {/*            <button type="button"*/}
                {/*                    className="btn btn-success btn-round disabled"*/}
                {/*                    data-dismiss="modal"*/}
                {/*            >*/}
                {/*                <i className="fa fa-spinner fa-spin"/>*/}
                {/*                Đang cập nhật*/}
                {/*            </button>*/}
                {/*            <button type="button"*/}
                {/*                    className="btn btn-danger btn-round disabled"*/}
                {/*                    data-dismiss="modal"*/}
                {/*            >*/}
                {/*                <i className="fa fa-spinner fa-spin"/>*/}
                {/*                Đang cập nhật*/}
                {/*            </button>*/}
                {/*        </div>*/}

                {/*    )*/}
                {/*    :*/}
                {/*    (*/}
                {/*        this.props.isLoadingHistoryCalls ?*/}
                {/*            (*/}
                {/*                <div>*/}
                {/*                    <button type="button"*/}
                {/*                            className="btn btn-success btn-round disabled"*/}
                {/*                            data-dismiss="modal"*/}
                {/*                    >*/}
                {/*                        <i className="material-icons">phone</i>*/}
                {/*                        Gọi thành công*/}
                {/*                    </button>*/}
                {/*                    <button type="button"*/}
                {/*                            className="btn btn-danger btn-round disabled"*/}
                {/*                            data-dismiss="modal"*/}
                {/*                    >*/}
                {/*                        <i className="material-icons">phone</i>*/}
                {/*                        Không gọi được*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*            :*/}
                {/*            (*/}
                {/*                <div>*/}
                {/*                    <button type="button"*/}
                {/*                            className="btn btn-success btn-round"*/}

                {/*                            data-dismiss="modal"*/}
                {/*                            onClick={() => {*/}
                {/*                                this.changeCallStatusStudent(1, this.studentId);*/}
                {/*                            }}>*/}
                {/*                        <i className="material-icons">phone</i>*/}
                {/*                        Gọi thành công*/}
                {/*                    </button>*/}
                {/*                    <button type="button"*/}
                {/*                            className="btn btn-danger btn-round"*/}
                {/*                            data-dismiss="modal"*/}
                {/*                            onClick={() => {*/}
                {/*                                this.changeCallStatusStudent(0, this.studentId);*/}
                {/*                            }}>*/}
                {/*                        <i className="material-icons">phone</i>*/}
                {/*                        Không gọi được*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            )*/}


                {/*    )*/}
                {/*}*/}
            </div>
        );
    }
}

HistoryCallContainer.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingHistoryCalls: PropTypes.bool.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
        isChangingStatusCall: state.infoStudent.isChangingStatusCall,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCallContainer);
