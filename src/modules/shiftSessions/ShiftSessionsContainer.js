/**
 * Created by phanmduong on 10/13/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shiftSessionActions from './shiftSessionActions';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';
import ListShiftSession from './ListShiftSession';
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import FormInputText from '../../components/common/FormInputText';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';
import TimePicker from "../../components/common/TimePicker";
import Checkbox from '../../components/common/Checkbox';

class ShiftSessionsContainer extends React.Component {
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
        this.props.shiftSessionActions.loadShiftSessions();
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

            this.props.shiftSessionActions.storeShiftSession(this.state.shiftSession, this.closeModalStore);
        }
    }

    deleteShiftSession(shiftSession) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa ca trực này",
            function () {
                this.props.shiftSessionActions.deleteShiftSession(shiftSession.id);
            }.bind(this));

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">


                                <h5 className="card-title">
                                    <strong style={{marginLeft:6}}>Danh sách ca trực</strong>
                                </h5>
                                <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                <button
                                        className="btn btn-white btn-round"
                                        type="button" onClick={() => this.openModalStore()}>
                                        Tạo ca trực
                                    </button>
                                </div>


                        <br/>
                        

                    </div>
                </div>
                {this.props.isLoading ? <Loading/> :
                    <ListShiftSession
                        shiftSessions={this.props.shiftSessions}
                        openModalStore={this.openModalStore}
                        deleteShiftSession={this.deleteShiftSession}
                    />
                }
                <Modal show={this.state.showModalStore} onHide={this.closeModalStore} bsSize="small">
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">{this.state.edit ? "Chỉnh sửa ca trực" : "Tạo ca trực"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-store-shift-session" className="form-grey" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <label>Tên</label>
                            <FormInputText
                                placeholder="Tên"
                                name="name"
                                updateFormData={this.updateFormDataState}
                                value={this.state.shiftSession.name}
                                required={true}
                                type="text"
                            />
                            <label>Thời gian bắt đầu</label>
                            <TimePicker
                                placeholder="Thời gian bắt đầu"
                                value={this.state.shiftSession.start_time}
                                onChange={this.updateFormDataState}
                                name="start_time"
                                id="start_time"
                            />
                            <label>Thời gian kết thúc</label>
                            <TimePicker
                                placeholder="Thời gian kết thúc"
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
                            <div className="flex flex-end">
                            {
                                this.props.isStoring ?
                                    (
                                        <button
                                            className="btn button-green disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>{this.state.edit ? " Đang cập nhật" : " Đang tạo"}
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn button-green"
                                        onClick={this.storeShiftSession}
                                    >
                                        {this.state.edit ? "Cập nhật" : "Tạo"}
                                    </button>
                            }</div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ShiftSessionsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    shiftSessionActions: PropTypes.object.isRequired,
    isStoring: PropTypes.bool.isRequired,
    shiftSessions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.shiftSessions.isLoading,
        shiftSessions: state.shiftSessions.shiftSessions,
        isStoring: state.shiftSessions.isStoring,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        shiftSessionActions: bindActionCreators(shiftSessionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftSessionsContainer);
