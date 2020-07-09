import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import PropTypes from 'prop-types';
import CallRegisterOverlay from "../overlays/CallRegisterOverlay";
import EmptyData from "../../../components/common/EmptyData";
import StatusesOverlay from "../overlays/StatusesOverlay";
import {STATUS_REFS} from "../../../constants/constants";
import ReactSelect from "react-select";


class HistoryCallContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            note: '',
            appointmentPayment: '',
            dateTest: '',
            teleCallTagStatus: null,
        };
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }


    componentWillMount() {
        this.props.studentActions.loadHistoryCalls(this.studentId);
        // if(!this.props.isLoadedStatuses){
        this.props.studentActions.loadStatuses(STATUS_REFS.tele_calls);
        // }
    }

    changeCallStatusStudent = (callStatus, studentId) => {
        this.props.studentActions.changeCallStatusStudent(callStatus, studentId, this.state.note, this.state.appointmentPayment, this.state.dateTest);
    };

    changeFilterTeleCallTagStatus = (e) => {
        this.setState({
            teleCallTagStatus: e ? e.id : e
        });
    }

    teleCallStatusTagOptions = () => {
        return [
            {
                label: 'Tất cả tag',
                value: null,
                id: null,
            },
            {
                label: 'Không có tag',
                value: -1,
                id: -1,
            },
            ...this.props.statuses[STATUS_REFS.tele_calls].map(itm => {
                return {
                    ...itm,
                    label: itm.name,
                    value: itm.id,
                };
            })
        ];
    }

    render() {
        return (
            <div className="tab-pane active">
                {
                    (this.props.isLoadingHistoryCalls || this.props.isLoadingStatuses || !this.props.statuses[STATUS_REFS.tele_calls]) ?
                        <Loading/> :
                        <ul className="timeline timeline-simple">
                            <li className="timeline-inverted">
                                <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                    <i className="material-icons">add</i>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <div className="flex flex-align-items-center margin-top-5">
                                            <CallRegisterOverlay
                                                className="btn btn-actions"
                                            />
                                        </div>
                                    </div>
                                    <div className="timeline-body margin-vertical-30"/>

                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                    <i className="material-icons">filter_alt</i>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <div className="flex flex-align-items-center margin-top-5">

                                            <ReactSelect
                                                options={this.teleCallStatusTagOptions()}
                                                value={this.teleCallStatusTagOptions().filter(o=>o.id == this.state.teleCallTagStatus)[0]}
                                                defaultMessage="Lọc theo tag"
                                                style={{minWidth: 150}}
                                                onChange={this.changeFilterTeleCallTagStatus}
                                            />
                                        </div>
                                    </div>
                                    <div className="timeline-body margin-vertical-30"/>

                                </div>
                            </li>
                            {
                                (this.props.historyCalls && this.props.historyCalls.length > 0) ? this.props.historyCalls
                                        .map( (history, index) =>{
                                        let btn = '';
                                        if (history.call_status === 'success') {
                                            btn = ' success';
                                        } else if (history.call_status === 'failed') {
                                            btn = ' danger';
                                        } else if (history.call_status === 'calling') {
                                            btn = ' info';
                                        }

                                        let passedFilter = true;
                                            switch (this.state.teleCallTagStatus) {
                                                case -1: passedFilter =  !history.status_id; break;
                                                case null: passedFilter = true; break;
                                                default: passedFilter = this.state.teleCallTagStatus == history.status_id;
                                            }
                                        if(passedFilter)
                                        return (
                                            <li className="timeline-inverted" key={index}>
                                                <div className={"timeline-badge " + btn}>
                                                    <i className="material-icons">phone</i>
                                                </div>
                                                <div className="timeline-panel">
                                                    <div className="timeline-heading">
                                                                        <span className="btn btn-xs"
                                                                              style={{backgroundColor: '#' + history.caller.color}}>
                                                                            {history.caller.name}</span>
                                                        <span
                                                            className="btn btn-xs">{history.updated_at}</span>
                                                        <StatusesOverlay
                                                            data={history.teleCallTagStatus}
                                                            refId={history.id}
                                                            statusRef={STATUS_REFS.tele_calls}
                                                            className="btn status-overlay btn-xs"
                                                            styleOverlay={{
                                                                marginLeft: -220, marginTop: 25
                                                            }}
                                                        />
                                                    </div>
                                                    {
                                                        history.note &&
                                                        <div className="timeline-body">
                                                            Ghi chú: {history.note}
                                                        </div>
                                                    }
                                                    {
                                                        history.appointment_payment &&
                                                        <div className="timeline-body">
                                                            Hẹn nộp tiền: {history.appointment_payment}
                                                        </div>
                                                    }
                                                    {
                                                        history.call_back_time &&
                                                        <div className="timeline-body">
                                                            Hẹn gọi lại: {history.call_back_time}
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
                                    }) :
                                    <EmptyData title={"Không có dữ liệu cuộc gọi"}/>
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
        statuses: state.infoStudent.statuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCallContainer);
