/**
 * Created by phanmduong on 10/13/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as workShiftSessionActions from './workShiftSessionActions';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';
import ListShiftSession from './ListShiftSession';
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import FormInputText from '../../components/common/FormInputText';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';
import TimePicker from "../../components/common/TimePicker";
import Checkbox from '../../components/common/Checkbox';

class WorkShiftSessionsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalStore: false,
            edit: false,
            shiftSession: {}
        };
        this.closeModalStore = this.closeModalStore.bind(this);
        this.openModalStore = this.openModalStore.bind(this);
        this.updateFormDataState = this.updateFormDataState.bind(this);
        this.storeShiftSession = this.storeShiftSession.bind(this);
        this.deleteShiftSession = this.deleteShiftSession.bind(this);
    }

    componentWillMount() {
        this.props.workShiftSessionActions.loadWorkShiftSessions();
    }

    closeModalStore() {
        this.setState({showModalStore: false});
    }

    openModalStore(shiftSession) {
        if (shiftSession) {
            this.setState(
                {
                    showModalStore: true,
                    edit: true,
                    shiftSession: {
                        ...shiftSession,
                        start_time: helper.formatTime(shiftSession.start_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], TIME_FORMAT_H_M),
                        end_time: helper.formatTime(shiftSession.end_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], TIME_FORMAT_H_M)
                    }
                }
            );
        } else {
            this.setState(
                {
                    showModalStore: true,
                    edit: false,
                    shiftSession: {}
                }
            );
        }
    }

    updateFormDataState(event) {
        const field = event.target.name;
        let shiftSession = {...this.state.shiftSession};
        if (event.target.type === "checkbox") {
            shiftSession[field] = event.target.checked;
        } else {
            shiftSession[field] = event.target.value;
        }
        this.setState({
            shiftSession: shiftSession
        });
    }

    storeShiftSession() {
        helper.setFormValidation("#form-store-shift-session");
        if ($("#form-store-shift-session").valid()) {
            if (helper.isEmptyInput(this.state.shiftSession.start_time)) {
                helper.showTypeNotification("Vui lòng chọn thời gian bắt đầu", 'warning');
                return;
            }
            if (helper.isEmptyInput(this.state.shiftSession.end_time)) {
                helper.showTypeNotification("Vui lòng chọn thời gian kết thúc", 'warning');
                return;
            }

            this.props.workShiftSessionActions.storeWorkShiftSession(this.state.shiftSession, this.closeModalStore);
        }
    }

    deleteShiftSession(shiftSession) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ca làm việc này",
            function () {
                this.props.workShiftSessionActions.deleteWorkShiftSession(shiftSession.id);
            }.bind(this));

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h5 className="card-title">
                                    <strong style={{marginLeft:6}}>Danh sách ca làm việc</strong>
                                </h5>
                                <div>
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button" onClick={() => this.openModalStore()}>
                                        <strong>+</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br/>
                        
                        {this.props.isLoading ? <Loading/> :
                            <ListShiftSession
                                workShiftSessions={this.props.workShiftSessions}
                                openModalStore={this.openModalStore}
                                deleteShiftSession={this.deleteShiftSession}
                            />
                        }
                    </div>
                </div>
                <Modal show={this.state.showModalStore} onHide={this.closeModalStore}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Chỉnh sửa ca làm việc" : "Tạo ca làm việc"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-store-shift-session" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                label="Tên"
                                name="name"
                                updateFormData={this.updateFormDataState}
                                value={this.state.shiftSession.name}
                                required={true}
                                type="text"
                            />
                            <TimePicker
                                label="Thời gian bắt đầu"
                                value={this.state.shiftSession.start_time}
                                onChange={this.updateFormDataState}
                                name="start_time"
                                id="start_time"
                            />
                            <TimePicker
                                label="Thời gian kết thúc"
                                value={this.state.shiftSession.end_time}
                                onChange={this.updateFormDataState}
                                name="end_time"
                                id="end_time"
                            />
                            <div className="form-group label-floating">
                                <Checkbox
                                    label="Kích hoạt    "
                                    name="active"
                                    checked={Boolean(this.state.shiftSession.active)}
                                    onChange={this.updateFormDataState}
                                />
                            </div>
                            {
                                this.props.isStoring ?
                                    (
                                        <button
                                            className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>{this.state.edit ? " Đang cập nhật" : " Đang tạo"}
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn btn-fill btn-rose"
                                        onClick={this.storeShiftSession}
                                    >
                                        {this.state.edit ? "Cập nhật" : "Tạo"}
                                    </button>
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

WorkShiftSessionsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    workShiftSessionActions: PropTypes.object.isRequired,
    isStoring: PropTypes.bool.isRequired,
    workShiftSessions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.workShiftSessions.isLoading,
        workShiftSessions: state.workShiftSessions.workShiftSessions,
        isStoring: state.workShiftSessions.isStoring,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        workShiftSessionActions: bindActionCreators(workShiftSessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkShiftSessionsContainer);
